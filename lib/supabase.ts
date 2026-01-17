import { createClient } from '@supabase/supabase-js';

// Supabase URL과 Anon Key는 환경 변수에서 가져옵니다
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// 경고 메시지는 한 번만 표시 (모듈 레벨에서 관리)
const hasWarned = { value: false };

// Supabase 클라이언트 생성 (싱글톤 패턴)
// 환경 변수가 없으면 더미 클라이언트를 생성하여 오류 방지
let supabaseClient: ReturnType<typeof createClient> | null = null;

function getSupabaseClient() {
  // 이미 생성된 클라이언트가 있으면 반환
  if (supabaseClient) {
    return supabaseClient;
  }

  // 환경 변수 확인 및 경고 (한 번만)
  if (!supabaseUrl || !supabaseAnonKey) {
    if (!hasWarned.value) {
      console.warn('⚠️ Supabase 환경 변수가 설정되지 않았습니다. .env 파일을 확인해주세요.');
      console.warn('⚠️ 개발 모드에서는 Mock 데이터를 사용합니다.');
      hasWarned.value = true;
    }
  }

  // 클라이언트 생성
  if (supabaseUrl && supabaseAnonKey) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
  } else {
    // 개발 모드: 더미 클라이언트 생성 (실제 사용 시 오류 발생)
    // 더미 클라이언트는 여러 번 생성되어도 같은 storage key를 사용하므로 경고가 발생할 수 있음
    supabaseClient = createClient('https://placeholder.supabase.co', 'placeholder-key', {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
        storageKey: `sb-placeholder-auth-token-${Date.now()}` // 고유한 키로 중복 방지
      }
    });
  }

  return supabaseClient;
}

// 모듈 로드 시 즉시 클라이언트 생성 (싱글톤 보장)
export const supabase = getSupabaseClient();

// 데이터베이스 타입 정의 (나중에 Supabase에서 자동 생성 가능)
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: 'customer' | 'admin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          role?: 'customer' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          role?: 'customer' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          quote_id: string;
          user_id: string;
          customer: {
            business_type: string;
            business_name: string;
            phone: string;
            email: string;
          };
          selections: {
            has_domain: boolean;
            domain_name: string;
            auto_organize: boolean;
            extra_page_count: number;
            subscription: boolean;
          };
          free_text_request: string;
          uploaded_files: Array<{
            name: string;
            size: number;
            type: string;
            last_modified: number;
          }> | null;
          price_breakdown: {
            base: number;
            opt_auto_organize: number;
            opt_extra_page: number;
            subscription_first_month: number;
          };
          total_price: number;
          recurring_price: number;
          status: 'pending' | 'in_progress' | 'review' | 'completed' | 'cancelled';
          payment_status: 'paid' | 'refunded';
          subscription_start_date: string | null;
          next_payment_date: string | null;
          created_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          quote_id: string;
          user_id: string;
          customer: {
            business_type: string;
            business_name: string;
            phone: string;
            email: string;
          };
          selections: {
            has_domain: boolean;
            domain_name: string;
            auto_organize: boolean;
            extra_page_count: number;
            subscription: boolean;
          };
          free_text_request: string;
          uploaded_files?: Array<{
            name: string;
            size: number;
            type: string;
            last_modified: number;
          }> | null;
          price_breakdown: {
            base: number;
            opt_auto_organize: number;
            opt_extra_page: number;
            subscription_first_month: number;
          };
          total_price: number;
          recurring_price: number;
          status?: 'pending' | 'in_progress' | 'review' | 'completed' | 'cancelled';
          payment_status?: 'paid' | 'refunded';
          subscription_start_date?: string | null;
          next_payment_date?: string | null;
          created_at?: string;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          quote_id?: string;
          user_id?: string;
          customer?: {
            business_type: string;
            business_name: string;
            phone: string;
            email: string;
          };
          selections?: {
            has_domain: boolean;
            domain_name: string;
            auto_organize: boolean;
            extra_page_count: number;
            subscription: boolean;
          };
          free_text_request?: string;
          uploaded_files?: Array<{
            name: string;
            size: number;
            type: string;
            last_modified: number;
          }> | null;
          price_breakdown?: {
            base: number;
            opt_auto_organize: number;
            opt_extra_page: number;
            subscription_first_month: number;
          };
          total_price?: number;
          recurring_price?: number;
          status?: 'pending' | 'in_progress' | 'review' | 'completed' | 'cancelled';
          payment_status?: 'paid' | 'refunded';
          subscription_start_date?: string | null;
          next_payment_date?: string | null;
          created_at?: string;
          completed_at?: string | null;
        };
      };
      revision_requests: {
        Row: {
          id: string;
          order_id: string;
          user_id: string;
          title: string;
          description: string;
          status: 'pending' | 'in_progress' | 'completed' | 'rejected';
          admin_note: string | null;
          rejection_reason: string | null;
          created_at: string;
          updated_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          order_id: string;
          user_id: string;
          title: string;
          description: string;
          status?: 'pending' | 'in_progress' | 'completed' | 'rejected';
          admin_note?: string | null;
          rejection_reason?: string | null;
          created_at?: string;
          updated_at?: string;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          order_id?: string;
          user_id?: string;
          title?: string;
          description?: string;
          status?: 'pending' | 'in_progress' | 'completed' | 'rejected';
          admin_note?: string | null;
          rejection_reason?: string | null;
          created_at?: string;
          updated_at?: string;
          completed_at?: string | null;
        };
      };
    };
  };
};

