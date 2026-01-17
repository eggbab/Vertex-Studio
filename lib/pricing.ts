// ============================================
// 가격 상수
// ============================================
export const PRICE = {
  BASE: 1_990_000,
  OPT_AUTO_ORGANIZE: 390_000,
  OPT_EXTRA_PAGE: 690_000,
  SUBSCRIPTION: 290_000
} as const;

// ============================================
// 타입 정의
// ============================================
export interface CustomerInfo {
  businessType: string;
  businessName: string;
  phone: string;
  email: string;
}

export interface Selections {
  hasDomain: boolean | null;
  inquiryMethod: 'kakao_phone' | 'form';
  autoOrganize: boolean;
  extraPage: boolean;
  subscription: boolean;
}

export interface PriceBreakdown {
  base: number;
  optAutoOrganize: number;
  optExtraPage: number;
  subscriptionFirstMonth: number;
}

export interface QuoteData {
  quoteId: string;
  customer: CustomerInfo;
  selections: Selections;
  freeTextRequest: string;
  priceBreakdown: PriceBreakdown;
  totalPrice: number;
  recurringPrice: number;
  timestamp: string;
  status: 'pending_payment' | 'paid' | 'cancelled';
}

// ============================================
// 견적 계산 함수
// ============================================
export function calculateQuote(selections: Selections) {
  const breakdown: PriceBreakdown = {
    base: PRICE.BASE,
    optAutoOrganize: selections.autoOrganize ? PRICE.OPT_AUTO_ORGANIZE : 0,
    optExtraPage: selections.extraPage ? PRICE.OPT_EXTRA_PAGE : 0,
    subscriptionFirstMonth: selections.subscription ? PRICE.SUBSCRIPTION : 0
  };

  const total = breakdown.base + breakdown.optAutoOrganize + breakdown.optExtraPage + breakdown.subscriptionFirstMonth;
  const recurring = selections.subscription ? PRICE.SUBSCRIPTION : 0;

  return { breakdown, total, recurring };
}

// ============================================
// 유틸리티 함수
// ============================================
export function formatPrice(price: number): string {
  return price.toLocaleString('ko-KR');
}

export function generateOrderName(selections: Selections): string {
  const parts = ['랜딩 제작'];
  if (selections.autoOrganize) parts.push('문의 자동정리');
  if (selections.extraPage) parts.push('추가 페이지');
  if (selections.subscription) parts.push('구독(첫달)');
  return parts.join(' + ');
}

export function generateQuoteId(): string {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `QT-${dateStr}-${random}`;
}

// ============================================
// 서버 저장용 JSON 구조 생성
// ============================================
export function createQuoteData(
  customer: CustomerInfo,
  selections: Selections,
  freeTextRequest: string
): QuoteData {
  const quote = calculateQuote(selections);
  
  return {
    quoteId: generateQuoteId(),
    customer,
    selections,
    freeTextRequest,
    priceBreakdown: quote.breakdown,
    totalPrice: quote.total,
    recurringPrice: quote.recurring,
    timestamp: new Date().toISOString(),
    status: 'pending_payment'
  };
}

// ============================================
// 포함/미포함 데이터
// ============================================
export const includedItems = [
  { text: '커스텀 원페이지 랜딩 제작', included: true },
  { text: '문의 수집 방식 1개 (카톡/전화 또는 문의폼)', included: true },
  { text: '문의폼 고도화 (파일첨부·추가질문 등)', included: true },
  { text: '채널톡/카카오채널 설치 (택1)', included: true },
  { text: 'GA4 + 이벤트 세팅', included: true },
  { text: '도메인 연결 1회', included: true },
  { text: '7일 텍스트 수정 무제한', included: true, highlight: true },
  { text: '구조 변경·섹션 추가', included: false },
  { text: '새 페이지 추가', included: false },
  { text: '대규모 리디자인', included: false },
  { text: '복잡한 외부 연동 (CRM 등)', included: false },
  { text: '호스팅·배포·운영', included: false, note: '월 구독 시 포함' },
];

