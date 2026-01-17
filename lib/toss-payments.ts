// ============================================
// 토스페이먼츠 타입 정의
// ============================================

export interface TossPaymentRequest {
  amount: number;
  orderId: string;
  orderName: string;
  customerName?: string;
  customerEmail?: string;
  successUrl: string;
  failUrl: string;
}

export interface TossPaymentSuccessResponse {
  paymentKey: string;
  orderId: string;
  amount: number;
}

export interface TossPaymentFailResponse {
  code: string;
  message: string;
  orderId?: string;
}

export interface TossPaymentsInstance {
  requestPayment: (method: string, options: TossPaymentRequest) => Promise<void>;
}

// ============================================
// 토스페이먼츠 SDK 초기화
// ============================================
export function initTossPayments(clientKey: string): TossPaymentsInstance | null {
  if (typeof window !== 'undefined' && (window as any).TossPayments) {
    return (window as any).TossPayments(clientKey);
  }
  return null;
}

// ============================================
// 결제 요청 함수
// ============================================
export async function requestPayment(
  clientKey: string,
  options: TossPaymentRequest
): Promise<void> {
  const tossPayments = initTossPayments(clientKey);
  
  if (!tossPayments) {
    throw new Error('토스페이먼츠 SDK가 로드되지 않았습니다.');
  }
  
  await tossPayments.requestPayment('카드', options);
}

// ============================================
// 결제 승인 API 호출 (서버사이드에서 사용)
// ============================================
export interface PaymentConfirmRequest {
  paymentKey: string;
  orderId: string;
  amount: number;
}

export async function confirmPayment(
  secretKey: string,
  data: PaymentConfirmRequest
): Promise<any> {
  const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${btoa(secretKey + ':')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || '결제 승인에 실패했습니다.');
  }
  
  return response.json();
}

// ============================================
// 빌링키 발급 (정기결제용)
// ============================================
export interface BillingKeyRequest {
  customerKey: string;
  authKey: string;
}

export async function issueBillingKey(
  secretKey: string,
  data: BillingKeyRequest
): Promise<any> {
  const response = await fetch('https://api.tosspayments.com/v1/billing/authorizations/issue', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${btoa(secretKey + ':')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || '빌링키 발급에 실패했습니다.');
  }
  
  return response.json();
}

// ============================================
// 정기결제 실행
// ============================================
export interface RecurringPaymentRequest {
  billingKey: string;
  customerKey: string;
  amount: number;
  orderId: string;
  orderName: string;
  customerEmail?: string;
  customerName?: string;
}

export async function executeRecurringPayment(
  secretKey: string,
  data: RecurringPaymentRequest
): Promise<any> {
  const response = await fetch(`https://api.tosspayments.com/v1/billing/${data.billingKey}`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${btoa(secretKey + ':')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customerKey: data.customerKey,
      amount: data.amount,
      orderId: data.orderId,
      orderName: data.orderName,
      customerEmail: data.customerEmail,
      customerName: data.customerName,
    }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || '정기결제 실행에 실패했습니다.');
  }
  
  return response.json();
}

// ============================================
// 환경 변수에서 키 가져오기
// ============================================
export function getTossClientKey(): string {
  return import.meta.env.VITE_TOSS_CLIENT_KEY || 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';
}

export function getTossSecretKey(): string {
  // 주의: 시크릿 키는 절대 클라이언트에 노출하면 안 됩니다!
  // 서버사이드에서만 사용해야 합니다.
  return import.meta.env.VITE_TOSS_SECRET_KEY || '';
}

