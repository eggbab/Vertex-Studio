// ============================================
// 사용자 관련 타입
// ============================================
export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

// ============================================
// 주문 관련 타입
// ============================================
export interface Order {
  id: string;
  quoteId: string;
  userId: string;
  customer: {
    businessType: string;
    businessName: string;
    phone: string;
    email: string;
  };
  selections: {
    hasDomain: boolean;
    domainName: string;
    autoOrganize: boolean;
    extraPageCount: number;
    subscription: boolean;
  };
  freeTextRequest: string;
  uploadedFiles?: Array<{
    name: string;
    size: number;
    type: string;
    lastModified: number;
  }>;
  priceBreakdown: {
    base: number;
    optAutoOrganize: number;
    optExtraPage: number;
    subscriptionFirstMonth: number;
  };
  totalPrice: number;
  recurringPrice: number;
  status: 'pending' | 'in_progress' | 'review' | 'completed' | 'cancelled';
  paymentStatus: 'paid' | 'refunded';
  createdAt: string;
  completedAt?: string;
  subscriptionStartDate?: string;
  nextPaymentDate?: string;
}

// ============================================
// 수정 요청 관련 타입
// ============================================
export interface RevisionRequest {
  id: string;
  orderId: string;
  userId: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  adminNote?: string;
  rejectionReason?: string;
}

// ============================================
// 인증 컨텍스트 타입
// ============================================
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  signInWithProvider: (provider: 'google' | 'naver' | 'kakao') => Promise<void>;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone: string;
}

// ============================================
// 이메일 알림 타입
// ============================================
export interface EmailNotification {
  to: string;
  subject: string;
  template: 'revision_completed' | 'order_status_update' | 'welcome';
  data: Record<string, any>;
}

