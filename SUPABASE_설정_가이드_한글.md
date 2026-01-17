# 🚀 Supabase 설정 완벽 가이드 (한글)

이 가이드는 Vertex Studio 프로젝트에 Supabase를 처음부터 끝까지 설정하는 방법을 단계별로 설명합니다.

---

## 📋 목차
1. [Supabase 계정 만들기](#1-supabase-계정-만들기)
2. [프로젝트 생성하기](#2-프로젝트-생성하기)
3. [API 키 복사하기](#3-api-키-복사하기)
4. [.env 파일에 값 넣기](#4-env-파일에-값-넣기)
5. [데이터베이스 테이블 만들기](#5-데이터베이스-테이블-만들기)
6. [보안 설정하기 (RLS)](#6-보안-설정하기-rls)
7. [관리자 계정 만들기](#7-관리자-계정-만들기)
8. [테스트하기](#8-테스트하기)

---

## 1. Supabase 계정 만들기

### 1-1. Supabase 사이트 접속
1. 브라우저에서 [https://supabase.com](https://supabase.com) 접속
2. 우측 상단의 **"Start your project"** 또는 **"Sign in"** 클릭

### 1-2. GitHub로 가입 (추천)
1. **"Continue with GitHub"** 버튼 클릭
2. GitHub 계정으로 로그인 및 권한 승인
3. 또는 이메일로 가입: **"Sign up with email"** 클릭

---

## 2. 프로젝트 생성하기

### 2-1. 새 프로젝트 시작
1. Supabase 대시보드에서 **"New Project"** 버튼 클릭
   - 또는 좌측 상단의 **"+"** 아이콘 클릭

### 2-2. 프로젝트 정보 입력
다음 정보를 입력하세요:

- **Name (프로젝트 이름)**: `vertex-studio` (원하는 이름으로 변경 가능)
- **Database Password (데이터베이스 비밀번호)**: 
  - ⚠️ **중요**: 이 비밀번호는 나중에 복구할 수 없습니다!
  - 강력한 비밀번호를 입력하고 **반드시 메모해두세요**
  - 예: `MySecurePassword123!@#`
- **Region (리전)**: 
  - 한국 사용자라면 **"Northeast Asia (Seoul)"** 선택 (가장 빠름)
  - 또는 **"Southeast Asia (Singapore)"** 선택

### 2-3. 프로젝트 생성 대기
1. **"Create new project"** 버튼 클릭
2. 프로젝트 생성이 완료될 때까지 **약 2-3분** 대기
   - 화면에 "Setting up your project..." 메시지가 표시됩니다
   - 완료되면 자동으로 프로젝트 대시보드로 이동합니다

---

## 3. API 키 복사하기

### 3-1. Settings 메뉴로 이동
1. 좌측 사이드바에서 **"Settings"** (⚙️ 아이콘) 클릭
2. **"API"** 메뉴 클릭

### 3-2. 필요한 값 복사하기
화면에 여러 정보가 표시됩니다. 다음 두 가지를 복사하세요:

#### 📌 Project URL
- **위치**: "Project URL" 또는 "URL" 섹션
- **형태**: `https://xxxxxxxxxxxxx.supabase.co`
- **복사 방법**: 
  1. URL 옆의 **복사 아이콘** (📋) 클릭
  2. 또는 URL을 드래그해서 선택 후 `Ctrl+C` (Windows) / `Cmd+C` (Mac)

#### 📌 anon public 키
- **위치**: "Project API keys" 섹션의 **"anon"** 또는 **"public"** 키
- **형태**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...` (매우 긴 문자열)
- **복사 방법**: 
  1. 키 옆의 **복사 아이콘** (📋) 클릭
  2. 또는 키를 드래그해서 선택 후 `Ctrl+C` (Windows) / `Cmd+C` (Mac)

⚠️ **주의**: 
- **"service_role"** 키는 절대 복사하지 마세요! (보안상 위험)
- **"anon"** 또는 **"public"** 키만 사용하세요

---

## 4. .env 파일에 값 넣기

### 4-1. .env 파일 위치 확인
`.env` 파일은 프로젝트의 **최상위 폴더**에 있어야 합니다.

```
Vertex-Studio/
  ├── .env          ← 여기에 있어야 함!
  ├── App.tsx
  ├── components/
  ├── lib/
  └── ...
```

### 4-2. .env 파일 열기
1. Visual Studio Code나 메모장으로 `.env` 파일 열기
2. 파일이 비어있거나 다음과 같은 내용이 보일 것입니다:

```env
# Supabase 설정
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

### 4-3. 값 입력하기
복사한 값을 각각 붙여넣으세요:

```env
# Supabase 설정
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...
```

⚠️ **중요 사항**:
- `=` 뒤에 **공백 없이** 바로 붙여넣으세요
- 따옴표(`"` 또는 `'`)를 사용하지 마세요
- 각 줄 끝에 공백이나 특수문자가 없는지 확인하세요

### 4-4. 파일 저장
- `Ctrl+S` (Windows) / `Cmd+S` (Mac)로 저장

---

## 5. 데이터베이스 테이블 만들기

### 5-1. SQL Editor 열기
1. Supabase 대시보드 좌측 사이드바에서 **"SQL Editor"** 클릭
2. **"New query"** 버튼 클릭

### 5-2. users 테이블 생성
다음 SQL 코드를 복사해서 붙여넣고 **"Run"** 버튼 클릭:

```sql
-- 사용자 프로필 테이블
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT DEFAULT NULL,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- updated_at 자동 업데이트 트리거
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

✅ **성공 메시지 확인**: "Success. No rows returned" 또는 비슷한 메시지가 보이면 성공!

### 5-3. orders 테이블 생성
다시 **"New query"** 버튼을 클릭하고 다음 SQL 실행:

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

### 5-4. revision_requests 테이블 생성
다시 **"New query"** 버튼을 클릭하고 다음 SQL 실행:

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

### 5-5. 테이블 확인하기
1. 좌측 사이드바에서 **"Table Editor"** 클릭
2. 다음 테이블들이 보여야 합니다:
   - ✅ `users`
   - ✅ `orders`
   - ✅ `revision_requests`

---

## 6. 보안 설정하기 (RLS)

### 6-1. RLS 활성화
SQL Editor에서 **"New query"**를 클릭하고 다음 SQL 실행:

```sql
-- RLS 활성화
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE revision_requests ENABLE ROW LEVEL SECURITY;
```

### 6-2. users 테이블 정책
**"New query"**를 클릭하고 다음 SQL 실행:

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

### 6-3. orders 테이블 정책
**"New query"**를 클릭하고 다음 SQL 실행:

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

### 6-4. revision_requests 테이블 정책
**"New query"**를 클릭하고 다음 SQL 실행:

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

---

## 7. 관리자 계정 만들기

### 7-1. 방법 1: 웹사이트에서 회원가입 후 SQL로 변경 (추천)

1. **웹사이트에서 회원가입**:
   - Vertex Studio 웹사이트의 `/login` 페이지로 이동
   - "회원가입" 탭에서 이메일과 비밀번호로 계정 생성
   - 예: `admin@vertex.com` / `your-password`

2. **SQL Editor에서 관리자로 변경**:
   ```sql
   UPDATE users
   SET role = 'admin'
   WHERE email = 'admin@vertex.com';
   ```

### 7-2. 방법 2: 직접 SQL로 생성 (고급)

⚠️ 이 방법은 Supabase Auth와 동기화 문제가 있을 수 있으므로 방법 1을 추천합니다.

---

## 8. 테스트하기

### 8-1. 개발 서버 재시작
1. 터미널에서 개발 서버 중지 (`Ctrl+C`)
2. 다시 시작: `npm run dev`

### 8-2. 브라우저 콘솔 확인
1. 브라우저에서 `F12` 또는 `우클릭 > 검사`로 개발자 도구 열기
2. **"Console"** 탭 클릭
3. 다음 경고가 **사라졌는지** 확인:
   - ❌ `⚠️ Supabase 환경 변수가 설정되지 않았습니다.` (이제 안 보여야 함)

### 8-3. 회원가입 테스트
1. 웹사이트의 `/login` 페이지로 이동
2. "회원가입" 탭에서 테스트 계정 생성
3. 성공적으로 가입되면 ✅ 성공!

### 8-4. 데이터베이스 확인
1. Supabase 대시보드의 **"Table Editor"**로 이동
2. `users` 테이블 클릭
3. 방금 만든 계정이 보이는지 확인

---

## ✅ 완료 체크리스트

설정이 완료되었는지 확인하세요:

- [ ] Supabase 프로젝트 생성 완료
- [ ] `.env` 파일에 `VITE_SUPABASE_URL` 입력 완료
- [ ] `.env` 파일에 `VITE_SUPABASE_ANON_KEY` 입력 완료
- [ ] `users` 테이블 생성 완료
- [ ] `orders` 테이블 생성 완료
- [ ] `revision_requests` 테이블 생성 완료
- [ ] RLS 정책 설정 완료
- [ ] 개발 서버 재시작 완료
- [ ] 브라우저 콘솔에 경고 없음 확인
- [ ] 회원가입 테스트 성공

---

## 🆘 문제 해결

### 문제 1: "Supabase 환경 변수가 설정되지 않았습니다" 경고가 계속 나타남
**해결 방법**:
1. `.env` 파일이 프로젝트 루트에 있는지 확인
2. `.env` 파일의 값에 공백이나 따옴표가 없는지 확인
3. 개발 서버를 완전히 종료하고 다시 시작 (`Ctrl+C` 후 `npm run dev`)

### 문제 2: SQL 실행 시 오류 발생
**해결 방법**:
1. SQL 코드를 한 번에 하나씩만 실행
2. 오류 메시지를 자세히 읽고 확인
3. 테이블이 이미 존재하는 경우 `CREATE TABLE IF NOT EXISTS`를 사용했는지 확인

### 문제 3: 회원가입은 되는데 로그인이 안 됨
**해결 방법**:
1. Supabase 대시보드의 **"Authentication" > "Providers"**에서 Email이 활성화되어 있는지 확인
2. 브라우저 콘솔의 오류 메시지 확인

### 문제 4: RLS 정책 오류
**해결 방법**:
1. SQL Editor에서 정책이 올바르게 생성되었는지 확인:
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'users';
   ```
2. 정책을 삭제하고 다시 생성:
   ```sql
   DROP POLICY "Users can view own profile" ON users;
   -- 그 다음 다시 CREATE POLICY 실행
   ```

---

## 📞 추가 도움말

- Supabase 공식 문서: [https://supabase.com/docs](https://supabase.com/docs)
- Supabase Discord 커뮤니티: [https://discord.supabase.com](https://discord.supabase.com)

---

**축하합니다! 🎉 Supabase 설정이 완료되었습니다!**

이제 Vertex Studio 웹사이트에서 실제 데이터베이스를 사용할 수 있습니다.
