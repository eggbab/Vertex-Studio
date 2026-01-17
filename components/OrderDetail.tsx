import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams, useSearchParams, Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  User,
  LogOut,
  FileText,
  Globe,
  CreditCard,
  Calendar,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../lib/auth-context';
import { useOrders } from '../lib/orders-context';

const OrderDetail: React.FC = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();
  const { user, logout, isLoading } = useAuth();
  const { getOrderById, getRevisionsByOrder, createRevision } = useOrders();
  
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'detail');
  const [revisionForm, setRevisionForm] = useState({
    title: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // 로딩 중
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  // 로그인 체크
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">로그인이 필요합니다</h2>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-500 transition-colors"
          >
            로그인하기
          </button>
        </div>
      </div>
    );
  }

  const order = getOrderById(orderId || '');
  const revisions = getRevisionsByOrder(orderId || '');

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">주문을 찾을 수 없습니다</h2>
          <button
            onClick={() => navigate('/my-orders')}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-500 transition-colors"
          >
            주문 내역으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => price.toLocaleString('ko-KR');
  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('ko-KR');

  const handleSubmitRevision = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionForm.title || !revisionForm.description) return;

    setIsSubmitting(true);
    
    // 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 500));
    
    createRevision({
      orderId: order.id,
      userId: user.id,
      title: revisionForm.title,
      description: revisionForm.description
    });

    setRevisionForm({ title: '', description: '' });
    setIsSubmitting(false);
    setShowSuccess(true);
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; text: string; label: string }> = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: '대기중' },
      in_progress: { bg: 'bg-blue-100', text: 'text-blue-700', label: '제작중' },
      review: { bg: 'bg-purple-100', text: 'text-purple-700', label: '검수중' },
      completed: { bg: 'bg-green-100', text: 'text-green-700', label: '완료' },
      cancelled: { bg: 'bg-gray-100', text: 'text-gray-700', label: '취소됨' }
    };
    const style = styles[status] || styles.pending;
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${style.bg} ${style.text}`}>
        {style.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            to="/"
            className="font-display font-bold text-xl tracking-tighter text-gray-900"
          >
            VERTEX STUDIO
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              {user.name}
            </div>
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 뒤로가기 */}
        <Link 
          to="/my-orders"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          주문 내역으로
        </Link>

        {/* 주문 헤더 */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-xl font-bold text-gray-900">{order.customer.businessName}</h1>
                {getStatusBadge(order.status)}
              </div>
              <p className="text-sm text-gray-500">
                주문번호: {order.quoteId} · 주문일: {formatDate(order.createdAt)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{formatPrice(order.totalPrice)}원</p>
              {order.selections.subscription && (
                <p className="text-sm text-blue-600">+ 월 {formatPrice(order.recurringPrice)}원</p>
              )}
            </div>
          </div>
        </div>

        {/* 탭 */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('detail')}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'detail' 
                ? 'bg-gray-900 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            주문 상세
          </button>
          {order.selections.subscription && (
            <button
              onClick={() => setActiveTab('revision')}
              className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                activeTab === 'revision' 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              수정 요청
            </button>
          )}
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'history' 
                ? 'bg-gray-900 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            요청 내역 ({revisions.length})
          </button>
        </div>

        {/* 탭 컨텐츠 */}
        <AnimatePresence mode="wait">
          {activeTab === 'detail' && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {/* 기본 정보 */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  주문 정보
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">업종</span>
                    <p className="font-medium text-gray-900">{order.customer.businessType}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">상호</span>
                    <p className="font-medium text-gray-900">{order.customer.businessName}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">연락처</span>
                    <p className="font-medium text-gray-900">{order.customer.phone}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">이메일</span>
                    <p className="font-medium text-gray-900">{order.customer.email}</p>
                  </div>
                </div>
              </div>

              {/* 도메인 */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  도메인
                </h3>
                <p className="text-sm">
                  {order.selections.hasDomain ? (
                    <span className="font-medium text-gray-900">{order.selections.domainName}</span>
                  ) : (
                    <span className="text-gray-500">도메인 미보유 (구매 안내 예정)</span>
                  )}
                </p>
              </div>

              {/* 결제 내역 */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  결제 내역
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">기본 패키지</span>
                    <span className="font-medium">{formatPrice(order.priceBreakdown.base)}원</span>
                  </div>
                  {order.priceBreakdown.optAutoOrganize > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">문의 자동정리</span>
                      <span className="font-medium">+{formatPrice(order.priceBreakdown.optAutoOrganize)}원</span>
                    </div>
                  )}
                  {order.priceBreakdown.optExtraPage > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">추가 페이지 {order.selections.extraPageCount}개</span>
                      <span className="font-medium">+{formatPrice(order.priceBreakdown.optExtraPage)}원</span>
                    </div>
                  )}
                  {order.priceBreakdown.subscriptionFirstMonth > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">월 구독 (첫 달)</span>
                      <span className="font-medium text-blue-600">+{formatPrice(order.priceBreakdown.subscriptionFirstMonth)}원</span>
                    </div>
                  )}
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-bold text-gray-900">총 결제 금액</span>
                    <span className="font-bold text-gray-900">{formatPrice(order.totalPrice)}원</span>
                  </div>
                </div>
              </div>

              {/* 구독 정보 */}
              {order.selections.subscription && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    월 구독 정보
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-white rounded-xl p-4 border border-blue-100">
                      <span className="text-gray-500 text-xs">구독 시작일</span>
                      <p className="font-medium text-gray-900 mt-1">
                        {order.subscriptionStartDate 
                          ? formatDate(order.subscriptionStartDate)
                          : '제작 완료 후 시작'}
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-blue-100">
                      <span className="text-gray-500 text-xs">다음 결제일</span>
                      <p className="font-medium text-blue-600 mt-1">
                        {order.nextPaymentDate 
                          ? formatDate(order.nextPaymentDate)
                          : '제작 완료 후 안내'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-white rounded-xl border border-blue-100">
                    <p className="text-xs text-gray-600">
                      <span className="font-medium text-blue-600">월 {formatPrice(order.recurringPrice)}원</span>이 
                      매월 자동 결제됩니다. 구독 해지는 결제일 3일 전까지 요청해 주세요.
                    </p>
                  </div>
                </div>
              )}

              {/* 요청사항 */}
              {order.freeTextRequest && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">요청사항</h3>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{order.freeTextRequest}</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'revision' && (
            <motion.div
              key="revision"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* 성공 메시지 */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-700 font-medium">수정 요청이 등록되었습니다!</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-2">수정 요청하기</h3>
                <p className="text-sm text-gray-500 mb-6">
                  변경이 필요한 내용을 작성해 주세요. 48시간 내에 처리됩니다.
                </p>

                <form onSubmit={handleSubmitRevision} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      제목 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="예: 메인 배너 이미지 변경"
                      value={revisionForm.title}
                      onChange={(e) => setRevisionForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      상세 내용 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      placeholder="변경이 필요한 내용을 구체적으로 작성해 주세요."
                      value={revisionForm.description}
                      onChange={(e) => setRevisionForm(prev => ({ ...prev, description: e.target.value }))}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !revisionForm.title || !revisionForm.description}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        수정 요청 보내기
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 p-4 bg-gray-50 rounded-xl text-xs text-gray-500">
                  <p className="font-medium text-gray-700 mb-2">수정 가능 범위</p>
                  <p>✓ 문구, 가격, 연락처 변경</p>
                  <p>✓ 사진, 이미지 교체</p>
                  <p>✓ 후기, FAQ 업데이트</p>
                  <p>✓ 링크, 버튼 수정</p>
                  <p className="mt-2 text-orange-600">※ 구조 변경, 새 페이지 추가는 별도 작업입니다.</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {revisions.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                  <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">수정 요청 내역이 없습니다</h3>
                  <p className="text-gray-500">수정이 필요하시면 요청을 보내주세요.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {revisions.map((revision) => (
                    <div 
                      key={revision.id}
                      className="bg-white rounded-2xl border border-gray-200 p-6"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {revision.status === 'completed' ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : revision.status === 'in_progress' ? (
                            <Clock className="w-5 h-5 text-blue-500" />
                          ) : revision.status === 'rejected' ? (
                            <AlertCircle className="w-5 h-5 text-red-500" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-yellow-500" />
                          )}
                          <h4 className="font-bold text-gray-900">{revision.title}</h4>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          revision.status === 'completed' ? 'bg-green-100 text-green-700' :
                          revision.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                          revision.status === 'rejected' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {revision.status === 'completed' ? '완료' :
                           revision.status === 'in_progress' ? '진행중' :
                           revision.status === 'rejected' ? '반려' : '대기중'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{revision.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>요청일: {formatDate(revision.createdAt)}</span>
                        {revision.completedAt && (
                          <span>완료일: {formatDate(revision.completedAt)}</span>
                        )}
                      </div>
                      {revision.adminNote && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
                          <span className="font-medium">담당자 메모:</span> {revision.adminNote}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default OrderDetail;

