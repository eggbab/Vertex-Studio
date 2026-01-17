# Supabase 설정 가이드

이 문서는 Vertex Studio 프로젝트에 Supabase를 연결하는 방법을 설명합니다.

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 가입하고 로그인합니다.
2. "New Project"를 클릭하여 새 프로젝트를 생성합니다.
3. 프로젝트 이름, 데이터베이스 비밀번호, 리전을 설정합니다.
4. 프로젝트가 생성될 때까지 기다립니다 (약 2분 소요).

## 2. API 키 확인

1. Supabase 대시보드에서 프로젝트를 선택합니다.
2. 좌측 메뉴에서 **Settings** > **API**로 이동합니다.
3. 다음 정보를 복사합니다:
   - **Project URL** (예: `https://xxxxx.supabase.co`)
   - **anon public** 키 (예: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## 3. 환경 변수 설정

1. 프로젝트 루트에 `.env` 파일을 생성합니다 (`.env.example`을 복사하여 사용 가능).
2. 다음 내용을 입력합니다:

```env
VITE_SUPABASE_URL=여기에_Project_URL_입력
VITE_SUPABASE_ANON_KEY=여기에_anon_public_키_입력
```

⚠️ **중요**: `.env` 파일은 절대 Git에 커밋하지 마세요! `.gitignore`에 포함되어 있는지 확인하세요.

## 4. 데이터베이스 테이블 생성

Supabase 대시보드에서 **SQL Editor**로 이동하여 다음 SQL을 실행합니다:

### 4.1. users 테이블

```sql
-- 사용자 프로필 테이블
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- updated_at 자동 업데이트 트리거
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### 4.2. orders 테이블

```sql
-- 주문 테이블
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id TEXT UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  customer JSONB NOT NULL,
  selections JSONB NOT NULL,
  free_text_request TEXT DEFAULT '',
  uploaded_files JSONB DEFAULT NULL,
  price_breakdown JSONB NOT NULL,
  total_price INTEGER NOT NULL,
  recurring_price INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'review', 'completed', 'cancelled')),
  payment_status TEXT NOT NULL DEFAULT 'paid' CHECK (payment_status IN ('paid', 'refunded')),
  subscription_start_date TIMESTAMPTZ DEFAULT NULL,
  next_payment_date TIMESTAMPTZ DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ DEFAULT NULL
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_quote_id ON orders(quote_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
```

### 4.3. revision_requests 테이블

```sql
-- 수정 요청 테이블
CREATE TABLE IF NOT EXISTS revision_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'rejected')),
  admin_note TEXT DEFAULT NULL,
  rejection_reason TEXT DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ DEFAULT NULL
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_revision_requests_order_id ON revision_requests(order_id);
CREATE INDEX IF NOT EXISTS idx_revision_requests_user_id ON revision_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_revision_requests_status ON revision_requests(status);
CREATE INDEX IF NOT EXISTS idx_revision_requests_created_at ON revision_requests(created_at DESC);

-- updated_at 자동 업데이트 트리거
CREATE TRIGGER update_revision_requests_updated_at
  BEFORE UPDATE ON revision_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## 5. Row Level Security (RLS) 설정

보안을 위해 RLS를 활성화하고 정책을 설정합니다.

### 5.1. RLS 활성화

```sql
-- RLS 활성화
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE revision_requests ENABLE ROW LEVEL SECURITY;
```

### 5.2. users 테이블 정책

```sql
-- 사용자는 자신의 프로필만 조회/수정 가능
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid()::text = id::text);

-- 관리자는 모든 사용자 조회 가능
CREATE POLICY "Admins can view all users"
  ON users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id::text = auth.uid()::text
      AND role = 'admin'
    )
  );
```

### 5.3. orders 테이블 정책

```sql
-- 사용자는 자신의 주문만 조회 가능
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (
    user_id::text = auth.uid()::text
    OR EXISTS (
      SELECT 1 FROM users
      WHERE id::text = auth.uid()::text
      AND role = 'admin'
    )
  );

-- 사용자는 자신의 주문만 생성 가능
CREATE POLICY "Users can insert own orders"
  ON orders FOR INSERT
  WITH CHECK (user_id::text = auth.uid()::text);

-- 관리자는 모든 주문 수정 가능
CREATE POLICY "Admins can update all orders"
  ON orders FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id::text = auth.uid()::text
      AND role = 'admin'
    )
  );
```

### 5.4. revision_requests 테이블 정책

```sql
-- 사용자는 자신의 수정 요청만 조회 가능
CREATE POLICY "Users can view own revision requests"
  ON revision_requests FOR SELECT
  USING (
    user_id::text = auth.uid()::text
    OR EXISTS (
      SELECT 1 FROM users
      WHERE id::text = auth.uid()::text
      AND role = 'admin'
    )
  );

-- 사용자는 자신의 수정 요청만 생성 가능
CREATE POLICY "Users can insert own revision requests"
  ON revision_requests FOR INSERT
  WITH CHECK (user_id::text = auth.uid()::text);

-- 관리자는 모든 수정 요청 수정 가능
CREATE POLICY "Admins can update all revision requests"
  ON revision_requests FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id::text = auth.uid()::text
      AND role = 'admin'
    )
  );
```

## 6. 인증 설정

Supabase는 기본적으로 이메일/비밀번호 인증을 제공합니다.

1. Supabase 대시보드에서 **Authentication** > **Providers**로 이동합니다.
2. **Email**이 활성화되어 있는지 확인합니다.
3. 필요에 따라 **Email Templates**를 커스터마이징할 수 있습니다.

## 7. 테스트

설정이 완료되면 다음을 확인하세요:

1. `.env` 파일이 올바르게 설정되었는지 확인
2. 개발 서버 재시작: `npm run dev`
3. 브라우저 콘솔에서 Supabase 연결 오류가 없는지 확인

## 8. 관리자 계정 생성

첫 관리자 계정을 생성하려면:

1. Supabase 대시보드의 **SQL Editor**에서 다음을 실행:

```sql
-- 먼저 Supabase Auth에 사용자를 생성한 후 (프론트엔드에서 회원가입)
-- users 테이블에 관리자로 업데이트
UPDATE users
SET role = 'admin'
WHERE email = 'admin@vertex.com';
```

또는 직접 SQL로:

```sql
-- 임시 관리자 계정 생성 (실제로는 Auth를 통해 생성해야 함)
INSERT INTO users (id, email, name, role)
VALUES (
  gen_random_uuid(),
  'admin@vertex.com',
  '관리자',
  'admin'
);
```

## 문제 해결

### 환경 변수가 로드되지 않는 경우
- `.env` 파일이 프로젝트 루트에 있는지 확인
- 개발 서버를 재시작 (`npm run dev`)
- Vite는 `.env` 파일 변경 시 자동으로 재시작하지 않을 수 있음

### RLS 정책 오류
- 정책이 올바르게 생성되었는지 확인
- `auth.uid()`가 올바르게 작동하는지 확인 (로그인 상태 확인)

### 타입 오류
- `lib/supabase.ts`의 타입 정의가 데이터베이스 스키마와 일치하는지 확인

## 다음 단계

데이터베이스 설정이 완료되면:
1. `lib/auth-context.tsx`를 Supabase 인증으로 교체
2. `lib/orders-context.tsx`를 Supabase 데이터베이스로 교체
3. 파일 업로드 기능 구현 (Supabase Storage 사용)

