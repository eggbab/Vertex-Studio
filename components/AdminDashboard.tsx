import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  LogOut,
  Mail,
  ChevronDown,
  ChevronUp,
  X,
  TrendingUp,
  DollarSign,
  Calendar,
  BarChart3,
  Users
} from 'lucide-react';
import { useAuth } from '../lib/auth-context';
import { useOrders } from '../lib/orders-context';
import { RevisionRequest } from '../lib/types';

type SalesPeriod = 'day' | 'week' | 'month' | 'year';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, isLoading } = useAuth();
  const { orders, getAllRevisions, getOrderById, updateRevisionStatus } = useOrders();
  
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');
  const [expandedRevision, setExpandedRevision] = useState<string | null>(null);
  const [adminNote, setAdminNote] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [showRejectModal, setShowRejectModal] = useState<string | null>(null);
  const [salesPeriod, setSalesPeriod] = useState<SalesPeriod>('month');
  const [activeTab, setActiveTab] = useState<'revisions' | 'sales'>('sales');

  // 비관리자는 내 주문 페이지로 리다이렉트
  useEffect(() => {
    if (!isLoading && user && user.role !== 'admin') {
      navigate('/my-orders');
    }
  }, [user, isLoading, navigate]);

  // 매출 데이터 계산
  const salesData = useMemo(() => {
    const now = new Date();
    const getDateRange = (period: SalesPeriod) => {
      const start = new Date(now);
      switch (period) {
        case 'day':
          start.setHours(0, 0, 0, 0);
          break;
        case 'week':
          start.setDate(now.getDate() - 7);
          break;
        case 'month':
          start.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          start.setFullYear(now.getFullYear() - 1);
          break;
      }
      return start;
    };

    const startDate = getDateRange(salesPeriod);
    const filteredOrders = orders.filter(o => 
      o.paymentStatus === 'paid' && new Date(o.createdAt) >= startDate
    );

    const totalSales = filteredOrders.reduce((sum, o) => sum + o.totalPrice, 0);
    const subscriptionRevenue = filteredOrders
      .filter(o => o.selections.subscription)
      .reduce((sum, o) => sum + o.recurringPrice, 0);
    const orderCount = filteredOrders.length;
    const avgOrderValue = orderCount > 0 ? totalSales / orderCount : 0;

    // 차트 데이터 생성
    const chartData: { label: string; value: number }[] = [];
    
    if (salesPeriod === 'day') {
      // 시간별
      for (let i = 0; i < 24; i++) {
        const hour = i.toString().padStart(2, '0') + ':00';
        const hourOrders = filteredOrders.filter(o => {
          const orderDate = new Date(o.createdAt);
          return orderDate.getHours() === i;
        });
        chartData.push({
          label: hour,
          value: hourOrders.reduce((sum, o) => sum + o.totalPrice, 0)
        });
      }
    } else if (salesPeriod === 'week') {
      // 일별 (7일)
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        const dayStr = `${date.getMonth() + 1}/${date.getDate()}`;
        const dayOrders = filteredOrders.filter(o => {
          const orderDate = new Date(o.createdAt);
          return orderDate.toDateString() === date.toDateString();
        });
        chartData.push({
          label: dayStr,
          value: dayOrders.reduce((sum, o) => sum + o.totalPrice, 0)
        });
      }
    } else if (salesPeriod === 'month') {
      // 주별 (4주)
      for (let i = 3; i >= 0; i--) {
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - (i + 1) * 7);
        const weekEnd = new Date(now);
        weekEnd.setDate(now.getDate() - i * 7);
        const weekLabel = `${i + 1}주 전`;
        const weekOrders = filteredOrders.filter(o => {
          const orderDate = new Date(o.createdAt);
          return orderDate >= weekStart && orderDate < weekEnd;
        });
        chartData.push({
          label: i === 0 ? '이번 주' : weekLabel,
          value: weekOrders.reduce((sum, o) => sum + o.totalPrice, 0)
        });
      }
    } else {
      // 월별 (12개월)
      for (let i = 11; i >= 0; i--) {
        const month = new Date(now);
        month.setMonth(now.getMonth() - i);
        const monthStr = `${month.getMonth() + 1}월`;
        const monthOrders = filteredOrders.filter(o => {
          const orderDate = new Date(o.createdAt);
          return orderDate.getMonth() === month.getMonth() && 
                 orderDate.getFullYear() === month.getFullYear();
        });
        chartData.push({
          label: monthStr,
          value: monthOrders.reduce((sum, o) => sum + o.totalPrice, 0)
        });
      }
    }

    return { totalSales, subscriptionRevenue, orderCount, avgOrderValue, chartData };
  }, [orders, salesPeriod]);

  // 로딩 중
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  // 로그인 체크
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-4">로그인이 필요합니다</h2>
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

  // 비관리자는 리다이렉트 중
  if (user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  const allRevisions = getAllRevisions();
  
  const filteredRevisions = allRevisions.filter(r => {
    if (filter === 'all') return true;
    return r.status === filter;
  });

  const revisionStats = {
    total: allRevisions.length,
    pending: allRevisions.filter(r => r.status === 'pending').length,
    inProgress: allRevisions.filter(r => r.status === 'in_progress').length,
    completed: allRevisions.filter(r => r.status === 'completed').length
  };

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleString('ko-KR');
  const formatPrice = (price: number) => price.toLocaleString('ko-KR');

  const handleStatusChange = async (revision: RevisionRequest, newStatus: RevisionRequest['status']) => {
    setProcessingId(revision.id);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (newStatus === 'rejected') {
      updateRevisionStatus(revision.id, newStatus, adminNote || undefined, rejectionReason || undefined);
      setRejectionReason('');
      setShowRejectModal(null);
    } else {
      updateRevisionStatus(revision.id, newStatus, adminNote || undefined);
    }
    
    setAdminNote('');
    setExpandedRevision(null);
    setProcessingId(null);
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; text: string; label: string }> = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: '대기중' },
      in_progress: { bg: 'bg-blue-100', text: 'text-blue-700', label: '진행중' },
      completed: { bg: 'bg-green-100', text: 'text-green-700', label: '완료' },
      rejected: { bg: 'bg-red-100', text: 'text-red-700', label: '반려' }
    };
    const style = styles[status] || styles.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
        {style.label}
      </span>
    );
  };

  const maxChartValue = Math.max(...salesData.chartData.map(d => d.value), 1);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              to="/"
              className="font-display font-bold text-xl tracking-tighter text-white"
            >
              VERTEX STUDIO
            </Link>
            <span className="px-2 py-1 bg-purple-600 text-white text-xs font-medium rounded">
              관리자
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <User className="w-4 h-4" />
              {user.name}
            </div>
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 탭 전환 */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('sales')}
            className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
              activeTab === 'sales' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            매출 현황
          </button>
          <button
            onClick={() => setActiveTab('revisions')}
            className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
              activeTab === 'revisions' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <Clock className="w-5 h-5" />
            수정 요청
            {revisionStats.pending > 0 && (
              <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                {revisionStats.pending}
              </span>
            )}
          </button>
        </div>

        {/* 매출 현황 탭 */}
        {activeTab === 'sales' && (
          <div className="space-y-6">
            {/* 기간 선택 */}
            <div className="flex gap-2">
              {(['day', 'week', 'month', 'year'] as SalesPeriod[]).map((period) => (
                <button
                  key={period}
                  onClick={() => setSalesPeriod(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    salesPeriod === period 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {period === 'day' ? '오늘' : period === 'week' ? '이번 주' : period === 'month' ? '이번 달' : '올해'}
                </button>
              ))}
            </div>

            {/* 매출 통계 카드 */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-blue-100 text-sm">총 매출</span>
                </div>
                <p className="text-3xl font-bold text-white">{formatPrice(salesData.totalSales)}원</p>
              </div>
              
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-gray-400 text-sm">구독 매출</span>
                </div>
                <p className="text-2xl font-bold text-white">{formatPrice(salesData.subscriptionRevenue)}원/월</p>
              </div>
              
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <Package className="w-5 h-5 text-green-400" />
                  </div>
                  <span className="text-gray-400 text-sm">주문 수</span>
                </div>
                <p className="text-2xl font-bold text-white">{salesData.orderCount}건</p>
              </div>
              
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-yellow-400" />
                  </div>
                  <span className="text-gray-400 text-sm">평균 주문액</span>
                </div>
                <p className="text-2xl font-bold text-white">{formatPrice(Math.round(salesData.avgOrderValue))}원</p>
              </div>
            </div>

            {/* 매출 그래프 */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-6">매출 추이</h3>
              <div className="h-64 flex items-end gap-2">
                {salesData.chartData.map((data, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full relative flex-1 flex items-end">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(data.value / maxChartValue) * 100}%` }}
                        transition={{ delay: idx * 0.05, duration: 0.5 }}
                        className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg min-h-[4px]"
                        title={`${formatPrice(data.value)}원`}
                      />
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{data.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 전체 주문 목록 */}
            <div>
              <h2 className="text-lg font-bold text-white mb-4">전체 주문 ({orders.length})</h2>
              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-900">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">주문번호</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">고객</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">금액</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">구독</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">상태</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">주문일</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-750">
                        <td className="px-4 py-3 text-sm text-white">{order.quoteId}</td>
                        <td className="px-4 py-3 text-sm text-white">{order.customer.businessName}</td>
                        <td className="px-4 py-3 text-sm text-white">{formatPrice(order.totalPrice)}원</td>
                        <td className="px-4 py-3">
                          {order.selections.subscription ? (
                            <span className="px-2 py-1 bg-blue-900/50 text-blue-400 rounded text-xs">구독중</span>
                          ) : (
                            <span className="text-gray-500 text-xs">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3">{getStatusBadge(order.status)}</td>
                        <td className="px-4 py-3 text-sm text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString('ko-KR')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 수정 요청 탭 */}
        {activeTab === 'revisions' && (
          <div className="space-y-6">
            {/* 통계 카드 */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                <p className="text-gray-400 text-sm">전체</p>
                <p className="text-2xl font-bold text-white">{revisionStats.total}</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-4 border border-yellow-900/50">
                <p className="text-yellow-400 text-sm">대기중</p>
                <p className="text-2xl font-bold text-yellow-400">{revisionStats.pending}</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-4 border border-blue-900/50">
                <p className="text-blue-400 text-sm">진행중</p>
                <p className="text-2xl font-bold text-blue-400">{revisionStats.inProgress}</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-4 border border-green-900/50">
                <p className="text-green-400 text-sm">완료</p>
                <p className="text-2xl font-bold text-green-400">{revisionStats.completed}</p>
              </div>
            </div>

            {/* 필터 */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === 'all' ? 'bg-white text-gray-900' : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                대기중 ({revisionStats.pending})
              </button>
              <button
                onClick={() => setFilter('in_progress')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === 'in_progress' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                진행중 ({revisionStats.inProgress})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                완료 ({revisionStats.completed})
              </button>
            </div>

            {/* 수정 요청 목록 */}
            {filteredRevisions.length === 0 ? (
              <div className="bg-gray-800 rounded-2xl border border-gray-700 p-12 text-center">
                <Clock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">수정 요청이 없습니다</h3>
                <p className="text-gray-400">새로운 요청이 들어오면 여기에 표시됩니다.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRevisions.map((revision) => {
                  const order = getOrderById(revision.orderId);
                  const isExpanded = expandedRevision === revision.id;
                  
                  return (
                    <motion.div
                      key={revision.id}
                      layout
                      className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
                    >
                      {/* 헤더 */}
                      <button
                        onClick={() => setExpandedRevision(isExpanded ? null : revision.id)}
                        className="w-full p-4 flex items-center justify-between hover:bg-gray-750 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          {revision.status === 'completed' ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : revision.status === 'in_progress' ? (
                            <Clock className="w-5 h-5 text-blue-500" />
                          ) : revision.status === 'rejected' ? (
                            <X className="w-5 h-5 text-red-500" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-yellow-500" />
                          )}
                          <div className="text-left">
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-white">{revision.title}</h4>
                              {getStatusBadge(revision.status)}
                            </div>
                            <p className="text-sm text-gray-400">
                              {order?.customer.businessName} · {formatDate(revision.createdAt)}
                            </p>
                          </div>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </button>

                      {/* 상세 내용 */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-gray-700"
                          >
                            <div className="p-4 space-y-4">
                              {/* 고객 정보 */}
                              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-900 rounded-lg">
                                <div>
                                  <span className="text-gray-500 text-xs">고객</span>
                                  <p className="text-white">{order?.customer.businessName}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500 text-xs">이메일</span>
                                  <p className="text-white">{order?.customer.email}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500 text-xs">연락처</span>
                                  <p className="text-white">{order?.customer.phone}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500 text-xs">도메인</span>
                                  <p className="text-white">{order?.selections.domainName || '-'}</p>
                                </div>
                              </div>

                              {/* 요청 내용 */}
                              <div>
                                <span className="text-gray-500 text-xs">요청 내용</span>
                                <p className="text-white mt-1 whitespace-pre-wrap">{revision.description}</p>
                              </div>

                              {/* 관리자 메모 입력 */}
                              {revision.status !== 'completed' && revision.status !== 'rejected' && (
                                <div>
                                  <label className="text-gray-500 text-xs block mb-2">
                                    담당자 메모 (선택, 상태 변경 시 고객에게 전달됨)
                                  </label>
                                  <textarea
                                    value={adminNote}
                                    onChange={(e) => setAdminNote(e.target.value)}
                                    placeholder="예: 메인 배너 이미지를 요청하신 이미지로 교체 완료했습니다."
                                    rows={2}
                                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none resize-none"
                                  />
                                </div>
                              )}

                              {/* 액션 버튼 */}
                              <div className="flex gap-2">
                                {revision.status === 'pending' && (
                                  <>
                                    <button
                                      onClick={() => handleStatusChange(revision, 'in_progress')}
                                      disabled={processingId === revision.id}
                                      className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                      {processingId === revision.id ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                      ) : (
                                        <>
                                          <Clock className="w-4 h-4" />
                                          작업 시작 (이메일 발송)
                                        </>
                                      )}
                                    </button>
                                    <button
                                      onClick={() => setShowRejectModal(revision.id)}
                                      disabled={processingId === revision.id}
                                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium text-sm transition-colors flex items-center gap-2 disabled:opacity-50"
                                    >
                                      <X className="w-4 h-4" />
                                      반려
                                    </button>
                                  </>
                                )}
                                {revision.status === 'in_progress' && (
                                  <button
                                    onClick={() => handleStatusChange(revision, 'completed')}
                                    disabled={processingId === revision.id}
                                    className="flex-1 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                  >
                                    {processingId === revision.id ? (
                                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                      <>
                                        <CheckCircle className="w-4 h-4" />
                                        완료 처리 (이메일 발송)
                                      </>
                                    )}
                                  </button>
                                )}
                                {revision.status === 'completed' && (
                                  <div className="flex-1 py-3 bg-green-900/30 text-green-400 rounded-lg font-medium text-sm text-center flex items-center justify-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    완료 알림 발송됨
                                  </div>
                                )}
                                {revision.status === 'rejected' && (
                                  <div className="flex-1 py-3 bg-red-900/30 text-red-400 rounded-lg font-medium text-sm text-center flex items-center justify-center gap-2">
                                    <X className="w-4 h-4" />
                                    반려됨
                                  </div>
                                )}
                              </div>

                              {/* 기존 메모 표시 */}
                              {revision.adminNote && (
                                <div className="p-3 bg-blue-900/30 rounded-lg text-sm text-blue-300">
                                  <span className="font-medium">담당자 메모:</span> {revision.adminNote}
                                </div>
                              )}

                              {/* 반려 사유 표시 */}
                              {revision.rejectionReason && (
                                <div className="p-3 bg-red-900/30 rounded-lg text-sm text-red-300">
                                  <span className="font-medium">반려 사유:</span> {revision.rejectionReason}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* 반려 모달 */}
      <AnimatePresence>
        {showRejectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowRejectModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-2xl p-6 max-w-md w-full border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold text-white mb-4">반려 사유 작성</h3>
              <p className="text-gray-400 text-sm mb-4">
                반려 사유를 작성해 주세요. 고객에게 이메일로 전달됩니다.
              </p>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="예: 요청하신 내용은 구독 범위를 벗어나는 작업입니다. 별도 견적이 필요합니다."
                rows={4}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white text-sm focus:border-red-500 outline-none resize-none mb-4"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowRejectModal(null)}
                  className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    const revision = allRevisions.find(r => r.id === showRejectModal);
                    if (revision) {
                      handleStatusChange(revision, 'rejected');
                    }
                  }}
                  disabled={!rejectionReason.trim() || processingId === showRejectModal}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {processingId === showRejectModal ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <X className="w-4 h-4" />
                      반려하기
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
