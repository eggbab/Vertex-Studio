import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ChevronRight,
  LogOut,
  User,
  ArrowLeft,
  FileText,
  CreditCard
} from 'lucide-react';
import { useAuth } from '../lib/auth-context';
import { useOrders } from '../lib/orders-context';

const MyOrders: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, isLoading } = useAuth();
  const { getOrdersByUser, getRevisionsByUser } = useOrders();

  // 관리자는 대시보드로 리다이렉트
  useEffect(() => {
    if (!isLoading && user?.role === 'admin') {
      navigate('/admin');
    }
  }, [user, isLoading, navigate]);

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

  // 관리자는 리다이렉트 중
  if (user.role === 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  const orders = getOrdersByUser(user.id);
  const revisions = getRevisionsByUser(user.id);

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
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
        {style.label}
      </span>
    );
  };

  const formatPrice = (price: number) => price.toLocaleString('ko-KR');
  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('ko-KR');

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
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 타이틀 */}
        <div className="mb-8">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-4 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            홈으로
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">내 주문 내역</h1>
          <p className="text-gray-500 mt-1">주문 상태 확인 및 수정 요청을 할 수 있습니다.</p>
        </div>

        {/* 주문 목록 */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">주문 내역이 없습니다</h3>
            <p className="text-gray-500 mb-6">첫 번째 랜딩페이지를 주문해 보세요!</p>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-500 transition-colors"
            >
              견적 확인하기
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-gray-900">{order.customer.businessName}</h3>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-sm text-gray-500">
                      주문번호: {order.quoteId} · {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{formatPrice(order.totalPrice)}원</p>
                    {order.selections.subscription && (
                      <p className="text-xs text-blue-600">+ 월 {formatPrice(order.recurringPrice)}원</p>
                    )}
                  </div>
                </div>

                {/* 주문 내용 요약 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">기본 패키지</span>
                  {order.selections.autoOrganize && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">문의 자동정리</span>
                  )}
                  {order.selections.extraPageCount > 0 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      추가 페이지 {order.selections.extraPageCount}개
                    </span>
                  )}
                  {order.selections.subscription && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">월 구독</span>
                  )}
                </div>

                {/* 구독 정보 */}
                {order.selections.subscription && order.nextPaymentDate && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">다음 결제일</span>
                      <span className="font-medium text-blue-600">{formatDate(order.nextPaymentDate)}</span>
                    </div>
                  </div>
                )}

                {/* 액션 버튼 */}
                <div className="flex gap-3">
                  <Link
                    to={`/order/${order.id}`}
                    className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium text-sm text-center transition-colors flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    상세보기
                  </Link>
                  {order.status !== 'cancelled' && order.selections.subscription && (
                    <Link
                      to={`/order/${order.id}?tab=revision`}
                      className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium text-sm text-center transition-colors flex items-center justify-center gap-2"
                    >
                      수정 요청하기
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* 수정 요청 현황 */}
        {revisions.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-bold text-gray-900 mb-4">수정 요청 현황</h2>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              {revisions.map((revision, idx) => (
                <div 
                  key={revision.id}
                  className={`p-4 flex items-center justify-between ${idx > 0 ? 'border-t border-gray-100' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    {revision.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : revision.status === 'in_progress' ? (
                      <Clock className="w-5 h-5 text-blue-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-500" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{revision.title}</p>
                      <p className="text-xs text-gray-500">{formatDate(revision.createdAt)}</p>
                    </div>
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
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyOrders;

