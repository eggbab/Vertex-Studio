import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../lib/auth-context';
import { useOrders } from '../lib/orders-context';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  X, 
  Sparkles, 
  FileText, 
  Phone, 
  Globe,
  CreditCard,
  ChevronRight,
  ChevronDown,
  Info,
  Building2,
  AtSign,
  FileQuestion,
  Shield,
  HelpCircle,
  Calendar,
  Zap,
  CheckCircle2,
  AlertCircle,
  Plus,
  Minus,
  MessageSquare,
  Upload,
  Image as ImageIcon,
  FileText as FileTextIcon,
  Trash2
} from 'lucide-react';

// ============================================
// 가격 상수
// ============================================
const PRICE = {
  BASE: 1_990_000,
  OPT_AUTO_ORGANIZE: 390_000,
  OPT_EXTRA_PAGE: 690_000,
  SUBSCRIPTION: 290_000
} as const;

// ============================================
// 타입 정의
// ============================================
interface CustomerInfo {
  businessType: string;
  businessName: string;
  phone: string;
  email: string;
}

interface Selections {
  hasDomain: boolean | null;
  domainName: string;
  autoOrganize: boolean;
  extraPageCount: number;
  subscription: boolean;
}

interface PriceBreakdown {
  base: number;
  optAutoOrganize: number;
  optExtraPage: number;
  subscriptionFirstMonth: number;
}

interface UploadedFileInfo {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

interface QuoteData {
  quoteId: string;
  customer: CustomerInfo;
  selections: Selections;
  freeTextRequest: string;
  uploadedFiles?: UploadedFileInfo[];
  priceBreakdown: PriceBreakdown;
  totalPrice: number;
  recurringPrice: number;
  timestamp: string;
  status: 'pending_payment' | 'paid' | 'cancelled';
}

// ============================================
// 포함/미포함 데이터
// ============================================
const includedItems = [
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

// ============================================
// 업종 예시 데이터
// ============================================
const businessTypeExamples = [
  '인테리어', '병원/의원', '치과', '학원/교육', '법률사무소', 
  '세무/회계', '부동산', '음식점/카페', '미용/뷰티', '헬스/PT',
  '쇼핑몰', '제조업', '컨설팅', 'IT/소프트웨어', '기타'
];

// ============================================
// FAQ 데이터
// ============================================
const faqItems = [
  {
    q: '제작 기간은 얼마나 걸리나요?',
    a: '결제 완료 후 영업일 기준 7~10일 내 런칭됩니다. 자료 전달이 빠르면 더 빨리 완료될 수 있어요.'
  },
  {
    q: '수정은 몇 번까지 가능한가요?',
    a: '런칭 후 7일간 텍스트(문구, 가격, 연락처 등) 수정은 무제한입니다. 구조 변경은 별도 작업입니다.'
  },
  {
    q: '도메인이 없어도 되나요?',
    a: '네, 없으셔도 됩니다. 도메인 구매 방법을 안내해 드리고, 연결까지 도와드려요.'
  },
  {
    q: '월 구독은 언제든 해지 가능한가요?',
    a: '네, 언제든 해지 가능합니다. 다음 결제일 전까지 말씀해 주시면 됩니다.'
  }
];

// ============================================
// 제작 프로세스 데이터
// ============================================
const processSteps = [
  { icon: CreditCard, title: '결제', desc: '견적 확인 후 결제' },
  { icon: MessageSquare, title: '상담', desc: '담당자 배정 & 상담' },
  { icon: FileText, title: '제작', desc: '디자인 & 개발 진행' },
  { icon: Zap, title: '런칭', desc: '검수 후 오픈' },
];

// ============================================
// 컴포넌트
// ============================================
const PricingQuote: React.FC = () => {
  const { user } = useAuth();
  const { createOrder } = useOrders();
  const navigate = useNavigate();

  // 폼 상태
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    businessType: '',
    businessName: '',
    phone: '',
    email: ''
  });

  const [selections, setSelections] = useState<Selections>({
    hasDomain: null,
    domainName: '',
    autoOrganize: false,
    extraPageCount: 0,
    subscription: false
  });

  const [freeTextRequest, setFreeTextRequest] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPriceTable, setShowPriceTable] = useState(false);
  const [showBusinessDropdown, setShowBusinessDropdown] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [emailError, setEmailError] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // 전화번호 자동 포맷팅
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setCustomerInfo(prev => ({ ...prev, phone: formatted }));
  };

  // 이메일 유효성 검사
  const validateEmail = (email: string) => {
    if (!email) {
      setEmailError('');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('올바른 이메일 형식을 입력해 주세요');
    } else {
      setEmailError('');
    }
  };

  useEffect(() => {
    validateEmail(customerInfo.email);
  }, [customerInfo.email]);

  // 실시간 견적 계산
  const quote = useMemo(() => {
    const breakdown: PriceBreakdown = {
      base: PRICE.BASE,
      optAutoOrganize: selections.autoOrganize ? PRICE.OPT_AUTO_ORGANIZE : 0,
      optExtraPage: selections.extraPageCount * PRICE.OPT_EXTRA_PAGE,
      subscriptionFirstMonth: selections.subscription ? PRICE.SUBSCRIPTION : 0
    };

    const total = breakdown.base + breakdown.optAutoOrganize + breakdown.optExtraPage + breakdown.subscriptionFirstMonth;
    const recurring = selections.subscription ? PRICE.SUBSCRIPTION : 0;

    return { breakdown, total, recurring };
  }, [selections]);

  // 예상 제작 기간 계산
  const estimatedDays = useMemo(() => {
    let days = 7; // 기본
    days += selections.extraPageCount * 3;
    if (selections.autoOrganize) days += 1;
    return days;
  }, [selections]);

  // 폼 완성도 계산
  const formProgress = useMemo(() => {
    let completed = 0;
    const total = 4;
    
    if (customerInfo.businessType && customerInfo.businessName) completed++;
    if (customerInfo.phone && customerInfo.email && !emailError) completed++;
    if (selections.hasDomain !== null && (selections.hasDomain === false || selections.domainName)) completed++;
    completed++; // 옵션은 선택 안해도 완료로 처리
    
    return { completed, total, percent: Math.round((completed / total) * 100) };
  }, [customerInfo, selections, emailError]);

  // 폼 유효성 검사
  const isFormValid = useMemo(() => {
    const domainValid = selections.hasDomain === false || (selections.hasDomain === true && selections.domainName.trim() !== '');
    return (
      customerInfo.businessType.trim() !== '' &&
      customerInfo.businessName.trim() !== '' &&
      customerInfo.phone.trim() !== '' &&
      customerInfo.email.trim() !== '' &&
      !emailError &&
      selections.hasDomain !== null &&
      domainValid
    );
  }, [customerInfo, selections, emailError]);

  // 추가 페이지 수량 조절
  const handleExtraPageChange = (delta: number) => {
    setSelections(prev => ({
      ...prev,
      extraPageCount: Math.max(0, Math.min(10, prev.extraPageCount + delta))
    }));
  };

  // 파일 업로드 관련 함수들
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const validateFile = (file: File): string | null => {
    if (!allowedFileTypes.includes(file.type)) {
      return '이미지(JPG, PNG, GIF, WEBP) 또는 PDF 파일만 업로드 가능합니다.';
    }
    if (file.size > maxFileSize) {
      return '파일 크기는 10MB 이하여야 합니다.';
    }
    if (uploadedFiles.length >= 10) {
      return '최대 10개까지 업로드 가능합니다.';
    }
    return null;
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    
    Array.from(files).forEach(file => {
      const error = validateFile(file);
      if (error) {
        alert(error);
        return;
      }
      
      // 중복 체크
      if (uploadedFiles.some(f => f.name === file.name && f.size === file.size)) {
        alert('이미 업로드된 파일입니다.');
        return;
      }
      
      setUploadedFiles(prev => [...prev, file]);
    });
  };

  const handleFileDelete = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <ImageIcon className="w-5 h-5" />;
    }
    return <FileTextIcon className="w-5 h-5" />;
  };

  // 결제 요청 핸들러
  const handleSubmit = async () => {
    if (!isFormValid) return;
    
    setIsSubmitting(true);

    const quoteData: QuoteData = {
      quoteId: `QT-${Date.now()}`,
      customer: customerInfo,
      selections,
      freeTextRequest,
      uploadedFiles: uploadedFiles.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
      })),
      priceBreakdown: quote.breakdown,
      totalPrice: quote.total,
      recurringPrice: quote.recurring,
      timestamp: new Date().toISOString(),
      status: 'pending_payment'
    };

    console.log('견적 데이터:', quoteData);

    try {
      // @ts-ignore
      if (typeof window !== 'undefined' && (window as any).TossPayments) {
        const tossPayments = (window as any).TossPayments(import.meta.env.VITE_TOSS_CLIENT_KEY || 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq');
        
        // 결제 성공 시 주문 데이터를 URL에 포함
        const orderData = {
          quoteId: quoteData.quoteId,
          customer: customerInfo,
          selections,
          freeTextRequest,
          uploadedFiles: uploadedFiles.map(file => ({
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified
          })),
          priceBreakdown: quote.breakdown,
          totalPrice: quote.total,
          recurringPrice: quote.recurring
        };

        // 주문 데이터를 세션 스토리지에 임시 저장 (결제 성공 후 사용)
        sessionStorage.setItem('pending_order', JSON.stringify(orderData));
        
        await tossPayments.requestPayment('카드', {
          amount: quote.total,
          orderId: quoteData.quoteId,
          orderName: generateOrderName(selections),
          customerName: customerInfo.businessName,
          customerEmail: customerInfo.email,
          successUrl: `${window.location.origin}/quote/success?orderId=${quoteData.quoteId}`,
          failUrl: `${window.location.origin}/quote/fail`,
        });
      } else {
        // 개발 모드: 로그인 상태 확인 후 주문 생성
        if (user) {
          const order = await createOrder({
            quoteId: quoteData.quoteId,
            userId: user.id,
            customer: customerInfo,
            selections,
            freeTextRequest,
            uploadedFiles: uploadedFiles.map(file => ({
              name: file.name,
              size: file.size,
              type: file.type,
              lastModified: file.lastModified
            })),
            priceBreakdown: quote.breakdown,
            totalPrice: quote.total,
            recurringPrice: quote.recurring,
            status: 'pending',
            paymentStatus: 'paid'
          });

          if (order) {
            alert(`결제 완료!\n주문번호: ${order.quoteId}\n\n제작이 시작됩니다.`);
            navigate('/my-orders');
          } else {
            alert('주문 생성에 실패했습니다. 다시 시도해 주세요.');
          }
        } else {
          alert(`결제 금액: ${formatPrice(quote.total)}원\n\n로그인 후 결제를 진행해 주세요.`);
        }
      }
    } catch (error) {
      console.error('결제 오류:', error);
      alert('결제 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a 
            href="/"
            className="font-display font-bold text-xl tracking-tighter text-gray-900 cursor-pointer select-none shrink-0 whitespace-nowrap"
          >
            VERTEX STUDIO
          </a>
          <button 
            onClick={() => setShowPriceTable(!showPriceTable)}
            className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors"
          >
            <Info className="w-4 h-4" />
            <span className="hidden sm:inline">포함 내역</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* 타이틀 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-blue-600 bg-blue-50 rounded-full border border-blue-100 uppercase">
            <Sparkles className="w-3 h-3" /> 정찰가 견적
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            내 랜딩페이지 <span className="text-blue-600">견적</span> 확인하기
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            옵션을 선택하면 실시간으로 견적이 계산됩니다.<br />
            결제 후 바로 제작이 시작됩니다.
          </p>
        </motion.div>

        {/* 제작 프로세스 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-500 mb-4 text-center">제작 프로세스</h3>
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {processSteps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                      <step.icon className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                    </div>
                    <span className="text-xs md:text-sm font-bold text-gray-900">{step.title}</span>
                    <span className="text-[10px] md:text-xs text-gray-400 hidden sm:block">{step.desc}</span>
                  </div>
                  {idx < processSteps.length - 1 && (
                    <div className="flex-1 h-0.5 bg-gray-200 mx-2 md:mx-4 relative top-[-12px]">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-200 rounded-full" style={{ width: '100%' }} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 진행 상태 바 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">입력 진행률</span>
              <span className="text-sm font-bold text-blue-600">{formProgress.completed}/{formProgress.total} 완료</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${formProgress.percent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* 포함 내역 테이블 (토글) */}
        <AnimatePresence>
          {showPriceTable && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  기본 패키지 포함 내역
                </h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {includedItems.map((item, idx) => (
                    <div 
                      key={idx}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        item.included ? 'bg-green-50' : 'bg-gray-50'
                      }`}
                    >
                      {item.included ? (
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center shrink-0">
                          <X className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <span className={`text-sm ${item.highlight ? 'font-bold text-green-700' : item.included ? 'text-gray-700' : 'text-gray-400'}`}>
                        {item.text}
                        {item.note && <span className="text-xs text-blue-500 ml-1">({item.note})</span>}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* 왼쪽: 입력 폼 */}
          <div className="lg:col-span-3 space-y-6">
            {/* 기본 정보 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  기본 정보
                </h2>
                {customerInfo.businessType && customerInfo.businessName && (
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> 입력 완료
                  </span>
                )}
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {/* 업종 선택 (드롭다운) */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    업종 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="업종을 선택하거나 입력하세요"
                      value={customerInfo.businessType}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, businessType: e.target.value }))}
                      onFocus={() => setShowBusinessDropdown(true)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowBusinessDropdown(!showBusinessDropdown)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <ChevronDown className={`w-5 h-5 transition-transform ${showBusinessDropdown ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  
                  <AnimatePresence>
                    {showBusinessDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto"
                      >
                        {businessTypeExamples.map((type, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setCustomerInfo(prev => ({ ...prev, businessType: type }));
                              setShowBusinessDropdown(false);
                            }}
                            className="w-full text-left px-4 py-2.5 hover:bg-blue-50 text-sm text-gray-700 hover:text-blue-600 transition-colors first:rounded-t-xl last:rounded-b-xl"
                          >
                            {type}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    상호(업체명) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="예: 행복한집 인테리어"
                    value={customerInfo.businessName}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, businessName: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="010-1234-5678"
                    value={customerInfo.phone}
                    onChange={handlePhoneChange}
                    maxLength={13}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  />
                  <p className="text-xs text-gray-400 mt-1">자동으로 하이픈(-)이 입력됩니다</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <AtSign className="w-4 h-4 inline mr-1" />
                    이메일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                      emailError 
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                        : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                    }`}
                  />
                  {emailError && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {emailError}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* 도메인 보유 여부 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  도메인 보유 여부 <span className="text-red-500 text-sm">*</span>
                </h2>
                {selections.hasDomain !== null && (selections.hasDomain === false || selections.domainName) && (
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> 선택 완료
                  </span>
                )}
              </div>
              
              <div className="bg-blue-50 rounded-xl p-4 mb-4">
                <p className="text-sm text-blue-700">
                  <HelpCircle className="w-4 h-4 inline mr-1" />
                  <strong>도메인이란?</strong> 홈페이지 주소입니다. 예: <code className="bg-blue-100 px-1 rounded">myshop.co.kr</code>
                </p>
              </div>
              
              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => setSelections(prev => ({ ...prev, hasDomain: true }))}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                    selections.hasDomain === true
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium flex items-center justify-center gap-2">
                    {selections.hasDomain === true && <Check className="w-4 h-4" />}
                    있음
                  </div>
                  <div className="text-xs text-gray-500 mt-1">보유한 도메인 연결</div>
                </button>
                <button
                  onClick={() => setSelections(prev => ({ ...prev, hasDomain: false, domainName: '' }))}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                    selections.hasDomain === false
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium flex items-center justify-center gap-2">
                    {selections.hasDomain === false && <Check className="w-4 h-4" />}
                    없음
                  </div>
                  <div className="text-xs text-gray-500 mt-1">구매 방법 안내해 드려요</div>
                </button>
              </div>

              {/* 도메인 입력 필드 (있음 선택 시) */}
              <AnimatePresence>
                {selections.hasDomain === true && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        보유하신 도메인 주소 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="예: myshop.co.kr (https:// 제외하고 입력)"
                        value={selections.domainName}
                        onChange={(e) => setSelections(prev => ({ ...prev, domainName: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                      />
                      <p className="text-xs text-gray-400 mt-1">도메인만 입력해 주세요. 예: example.com, myshop.co.kr</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* 추가 옵션 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
            >
              <h2 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                추가 옵션
              </h2>
              <p className="text-sm text-gray-400 mb-5">필요한 것만 선택하세요. 선택 안 해도 됩니다.</p>
              
              <div className="space-y-3">
                {/* 옵션 1: 문의 자동정리 */}
                <button
                  onClick={() => setSelections(prev => ({ ...prev, autoOrganize: !prev.autoOrganize }))}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selections.autoOrganize
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all mt-0.5 shrink-0 ${
                        selections.autoOrganize ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                      }`}>
                        {selections.autoOrganize && <Check className="w-4 h-4 text-white" />}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">문의 자동정리</div>
                        <div className="text-xs text-gray-500 mt-1">
                          문의가 들어오면 <strong>구글시트에 자동 저장</strong>되고,<br />
                          <strong>이메일로 바로 알림</strong>을 받을 수 있어요.
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded">인기</span>
                          <span className="text-xs text-gray-400">문의 놓치지 않고 관리</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-blue-600 font-bold whitespace-nowrap">+390,000원</div>
                  </div>
                </button>

                {/* 옵션 2: 추가 페이지 (수량 조절) */}
                <div className={`p-4 rounded-xl border-2 transition-all ${
                  selections.extraPageCount > 0
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all mt-0.5 shrink-0 ${
                        selections.extraPageCount > 0 ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                      }`}>
                        {selections.extraPageCount > 0 && <Check className="w-4 h-4 text-white" />}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">추가 페이지</div>
                        <div className="text-xs text-gray-500 mt-1">
                          <strong>이벤트/프로모션용 별도 페이지</strong>를 함께 제작해 드려요.<br />
                          시즌 행사, 특별 할인 안내 페이지 등에 활용하세요.
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-blue-600 font-bold whitespace-nowrap mb-2">개당 +690,000원</div>
                      
                      {/* 수량 조절 UI */}
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          type="button"
                          onClick={() => handleExtraPageChange(-1)}
                          disabled={selections.extraPageCount === 0}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                            selections.extraPageCount === 0 
                              ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-bold text-lg text-gray-900">
                          {selections.extraPageCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleExtraPageChange(1)}
                          disabled={selections.extraPageCount >= 10}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                            selections.extraPageCount >= 10
                              ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
                              : 'bg-blue-500 text-white hover:bg-blue-600'
                          }`}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      {selections.extraPageCount > 0 && (
                        <p className="text-xs text-blue-600 mt-1">
                          소계: {formatPrice(selections.extraPageCount * PRICE.OPT_EXTRA_PAGE)}원
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 월 운영 구독 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`rounded-2xl border-2 p-6 shadow-sm transition-all ${
                selections.subscription 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  월 운영 구독
                  <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded">추천</span>
                </h2>
                
                {/* 심플한 토글 스위치 */}
                <button
                  onClick={() => setSelections(prev => ({ ...prev, subscription: !prev.subscription }))}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    selections.subscription ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${
                    selections.subscription ? 'right-0.5' : 'left-0.5'
                  }`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">호스팅 + 수정 무제한 서비스</p>
                <div className="text-xl font-bold text-blue-600">
                  290,000원<span className="text-sm font-normal text-gray-400">/월</span>
                </div>
              </div>

              <div className="bg-white/60 rounded-xl p-4 mb-4">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    '호스팅/배포/점검',
                    '문구·가격 수정',
                    '사진·이미지 교체',
                    '후기/FAQ 업데이트',
                    '48시간 내 처리',
                    '언제든 해지 가능'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 shrink-0 text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {!selections.subscription && (
                <p className="text-xs text-orange-600 bg-orange-50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4 inline mr-1" />
                  구독 미선택 시 런칭 후 호스팅/수정 서비스가 제공되지 않습니다.
                </p>
              )}
            </motion.div>

            {/* 요청사항 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
            >
              <h2 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <FileQuestion className="w-5 h-5 text-blue-600" />
                요청사항
                <span className="text-xs font-normal text-gray-400 ml-2">선택</span>
              </h2>
              <p className="text-sm text-gray-400 mb-4">작성하시면 제작에 참고됩니다. 나중에 상담 시 말씀해 주셔도 돼요.</p>
              
              <textarea
                placeholder="예시:&#10;• 깔끔하고 신뢰감 있는 느낌으로 해주세요&#10;• 참고 사이트: https://example.com&#10;• 시공사례 갤러리를 강조해주세요&#10;• 로고/이미지 파일은 이메일로 보내드릴게요"
                value={freeTextRequest}
                onChange={(e) => setFreeTextRequest(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
              />
              <p className="text-xs text-gray-400 mt-2">
                {freeTextRequest.length}/500자
              </p>
            </motion.div>

            {/* 파일 업로드 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
            >
              <h2 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-600" />
                참고 자료 업로드
                <span className="text-xs font-normal text-gray-400 ml-2">선택</span>
              </h2>
              <p className="text-sm text-gray-400 mb-4">
                로고, 이미지, 브랜드 가이드라인, 참고 자료 등을 업로드해 주세요. (이미지: JPG, PNG, GIF, WEBP / PDF)
              </p>
              
              {/* 드래그 앤 드롭 영역 */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  handleFileSelect(e.dataTransfer.files);
                }}
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                  isDragging
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                }`}
              >
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,application/pdf"
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center gap-3"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isDragging ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <Upload className={`w-6 h-6 ${isDragging ? 'text-blue-600' : 'text-gray-400'}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      파일을 드래그하거나 <span className="text-blue-600 underline">클릭하여 선택</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      최대 10개, 파일당 10MB 이하
                    </p>
                  </div>
                </label>
              </div>

              {/* 업로드된 파일 목록 */}
              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                        {getFileIcon(file)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                      {file.type.startsWith('image/') && (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-12 h-12 object-cover rounded border border-gray-200"
                        />
                      )}
                      <button
                        onClick={() => handleFileDelete(index)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}

              {uploadedFiles.length > 0 && (
                <p className="text-xs text-gray-400 mt-3">
                  {uploadedFiles.length}/10개 파일 업로드됨
                </p>
              )}
            </motion.div>

            {/* FAQ */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
            >
              <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                자주 묻는 질문
              </h2>
              
              <div className="space-y-2">
                {faqItems.map((faq, idx) => (
                  <div key={idx} className="border border-gray-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900 text-sm">{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openFaqIndex === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="px-4 pb-4 text-sm text-gray-600 bg-gray-50">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* 오른쪽: 견적서 (Sticky) */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-24 space-y-4"
            >
              {/* 견적서 */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-2xl">
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  내 견적서
                </h3>

                <div className="space-y-4 mb-6">
                  {/* 기본 패키지 */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">기본 패키지</span>
                    <span className="font-medium">{formatPrice(PRICE.BASE)}원</span>
                  </div>

                  <div className="h-px bg-white/10" />

                  {/* 옵션들 */}
                  <div className="flex items-center justify-between">
                    <span className={selections.autoOrganize ? 'text-white' : 'text-gray-500'}>
                      {selections.autoOrganize ? '✓' : '○'} 문의 자동정리
                    </span>
                    <span className={selections.autoOrganize ? 'font-medium' : 'text-gray-500'}>
                      {selections.autoOrganize ? `+${formatPrice(PRICE.OPT_AUTO_ORGANIZE)}원` : '-'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={selections.extraPageCount > 0 ? 'text-white' : 'text-gray-500'}>
                      {selections.extraPageCount > 0 ? '✓' : '○'} 추가 페이지 {selections.extraPageCount > 0 && `(${selections.extraPageCount}개)`}
                    </span>
                    <span className={selections.extraPageCount > 0 ? 'font-medium' : 'text-gray-500'}>
                      {selections.extraPageCount > 0 ? `+${formatPrice(selections.extraPageCount * PRICE.OPT_EXTRA_PAGE)}원` : '-'}
                    </span>
                  </div>

                  <div className="h-px bg-white/10" />

                  {/* 구독 */}
                  <div className="flex items-center justify-between">
                    <span className={selections.subscription ? 'text-blue-400' : 'text-gray-500'}>
                      {selections.subscription ? '✓' : '○'} 월 운영 구독 (첫 달)
                    </span>
                    <span className={selections.subscription ? 'font-medium text-blue-400' : 'text-gray-500'}>
                      {selections.subscription ? `+${formatPrice(PRICE.SUBSCRIPTION)}원` : '-'}
                    </span>
                  </div>
                </div>

                {/* 총액 */}
                <div className="bg-white/10 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-300">총 결제 금액</span>
                    <span className="text-2xl font-bold">{formatPrice(quote.total)}원</span>
                  </div>
                  <p className="text-xs text-gray-400">VAT 별도</p>
                  {selections.subscription && (
                    <p className="text-xs text-blue-400 mt-2">
                      * 구독은 첫 달 포함, 이후 월 {formatPrice(PRICE.SUBSCRIPTION)}원 자동결제
                    </p>
                  )}
                </div>

                {/* 예상 제작 기간 */}
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg mb-6">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-sm font-medium">예상 제작 기간</p>
                    <p className="text-xs text-gray-400">영업일 기준 {estimatedDays}~{estimatedDays + 3}일</p>
                  </div>
                </div>

                {/* 결제 버튼 */}
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                    isFormValid && !isSubmitting
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      처리 중...
                    </>
                  ) : (
                    <>
                      결제하고 제작 시작하기
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {!isFormValid && (
                  <p className="text-xs text-yellow-400 mt-3 text-center">
                    * 필수 항목을 모두 입력해 주세요
                  </p>
                )}
              </div>

              {/* 신뢰 요소 */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900 text-sm">안전한 결제</span>
                </div>
                <div className="space-y-2 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-green-500" />
                    <span>토스페이먼츠 공식 결제 시스템</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-green-500" />
                    <span>카드 정보 암호화 처리</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-green-500" />
                    <span>작업 시작 전 전액 환불 가능</span>
                  </div>
                </div>
              </div>

              {/* 문의 안내 */}
              <div className="p-4 bg-gray-50 rounded-xl text-xs text-gray-500 space-y-2">
                <p><strong>결제 후 취소:</strong> 작업 시작 전 전액 환불</p>
                <p><strong>구독 해지:</strong> 언제든 해지 가능 (다음 결제일 전)</p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

// ============================================
// 유틸리티 함수
// ============================================
function formatPrice(price: number): string {
  return price.toLocaleString('ko-KR');
}

function generateOrderName(selections: Selections): string {
  const parts = ['랜딩 제작'];
  if (selections.autoOrganize) parts.push('문의 자동정리');
  if (selections.extraPageCount > 0) parts.push(`추가 페이지 ${selections.extraPageCount}개`);
  if (selections.subscription) parts.push('구독(첫달)');
  return parts.join(' + ');
}

export default PricingQuote;
