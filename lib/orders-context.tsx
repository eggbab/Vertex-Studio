import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order, RevisionRequest } from './types';
import { supabase } from './supabase';
import { useAuth } from './auth-context';

// ============================================
// 데이터 변환 함수 (DB ↔ App 타입)
// ============================================

// DB Order → App Order
const dbOrderToAppOrder = (dbOrder: any): Order => {
  return {
    id: dbOrder.id,
    quoteId: dbOrder.quote_id,
    userId: dbOrder.user_id,
    customer: {
      businessType: dbOrder.customer.business_type,
      businessName: dbOrder.customer.business_name,
      phone: dbOrder.customer.phone,
      email: dbOrder.customer.email,
    },
    selections: {
      hasDomain: dbOrder.selections.has_domain,
      domainName: dbOrder.selections.domain_name || '',
      autoOrganize: dbOrder.selections.auto_organize,
      extraPageCount: dbOrder.selections.extra_page_count,
      subscription: dbOrder.selections.subscription,
    },
    freeTextRequest: dbOrder.free_text_request || '',
    priceBreakdown: {
      base: dbOrder.price_breakdown.base,
      optAutoOrganize: dbOrder.price_breakdown.opt_auto_organize,
      optExtraPage: dbOrder.price_breakdown.opt_extra_page,
      subscriptionFirstMonth: dbOrder.price_breakdown.subscription_first_month,
    },
    totalPrice: dbOrder.total_price,
    recurringPrice: dbOrder.recurring_price,
    status: dbOrder.status,
    paymentStatus: dbOrder.payment_status,
    createdAt: dbOrder.created_at,
    completedAt: dbOrder.completed_at || undefined,
    subscriptionStartDate: dbOrder.subscription_start_date || undefined,
    nextPaymentDate: dbOrder.next_payment_date || undefined,
  };
};

// App Order → DB Order
const appOrderToDbOrder = (appOrder: Omit<Order, 'id' | 'createdAt' | 'completedAt'> & { id?: string }): any => {
  return {
    id: appOrder.id,
    quote_id: appOrder.quoteId,
    user_id: appOrder.userId,
    customer: {
      business_type: appOrder.customer.businessType,
      business_name: appOrder.customer.businessName,
      phone: appOrder.customer.phone,
      email: appOrder.customer.email,
    },
    selections: {
      has_domain: appOrder.selections.hasDomain,
      domain_name: appOrder.selections.domainName,
      auto_organize: appOrder.selections.autoOrganize,
      extra_page_count: appOrder.selections.extraPageCount,
      subscription: appOrder.selections.subscription,
    },
    free_text_request: appOrder.freeTextRequest,
    uploaded_files: appOrder.uploadedFiles || null,
    price_breakdown: {
      base: appOrder.priceBreakdown.base,
      opt_auto_organize: appOrder.priceBreakdown.optAutoOrganize,
      opt_extra_page: appOrder.priceBreakdown.optExtraPage,
      subscription_first_month: appOrder.priceBreakdown.subscriptionFirstMonth,
    },
    total_price: appOrder.totalPrice,
    recurring_price: appOrder.recurringPrice,
    status: appOrder.status,
    payment_status: appOrder.paymentStatus,
    subscription_start_date: appOrder.subscriptionStartDate || null,
    next_payment_date: appOrder.nextPaymentDate || null,
  };
};

// DB Revision → App Revision
const dbRevisionToAppRevision = (dbRevision: any): RevisionRequest => {
  return {
    id: dbRevision.id,
    orderId: dbRevision.order_id,
    userId: dbRevision.user_id,
    title: dbRevision.title,
    description: dbRevision.description,
    status: dbRevision.status,
    createdAt: dbRevision.created_at,
    updatedAt: dbRevision.updated_at,
    completedAt: dbRevision.completed_at || undefined,
    adminNote: dbRevision.admin_note || undefined,
    rejectionReason: dbRevision.rejection_reason || undefined,
  };
};

// App Revision → DB Revision
const appRevisionToDbRevision = (appRevision: Omit<RevisionRequest, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): any => {
  return {
    id: appRevision.id,
    order_id: appRevision.orderId,
    user_id: appRevision.userId,
    title: appRevision.title,
    description: appRevision.description,
    status: appRevision.status,
    admin_note: appRevision.adminNote || null,
    rejection_reason: appRevision.rejectionReason || null,
  };
};

// ============================================
// Context 타입
// ============================================
interface OrdersContextType {
  orders: Order[];
  revisions: RevisionRequest[];
  isLoading: boolean;
  getOrdersByUser: (userId: string) => Order[];
  getOrderById: (orderId: string) => Order | undefined;
  getRevisionsByOrder: (orderId: string) => RevisionRequest[];
  getRevisionsByUser: (userId: string) => RevisionRequest[];
  getAllRevisions: () => RevisionRequest[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'completedAt'>) => Promise<Order | null>;
  createRevision: (data: Omit<RevisionRequest, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => Promise<RevisionRequest | null>;
  updateRevisionStatus: (revisionId: string, status: RevisionRequest['status'], adminNote?: string, rejectionReason?: string) => Promise<void>;
  sendStatusEmail: (revision: RevisionRequest, status: string) => Promise<void>;
  refreshOrders: () => Promise<void>;
  refreshRevisions: () => Promise<void>;
}

// ============================================
// Context 생성
// ============================================
const OrdersContext = createContext<OrdersContextType | null>(null);

// ============================================
// Provider 컴포넌트
// ============================================
export const OrdersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [revisions, setRevisions] = useState<RevisionRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // 주문 목록 로드
  const loadOrders = async () => {
    try {
      setIsLoading(true);
      
      // 관리자는 모든 주문, 일반 사용자는 자신의 주문만
      let query = supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (user?.role !== 'admin') {
        query = query.eq('user_id', user?.id || '');
      }

      const { data, error } = await query;

      if (error) {
        console.error('주문 로드 오류:', error);
        return;
      }

      if (data) {
        setOrders(data.map(dbOrderToAppOrder));
      }
    } catch (error) {
      console.error('주문 로드 중 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 수정 요청 목록 로드
  const loadRevisions = async () => {
    try {
      // 관리자는 모든 수정 요청, 일반 사용자는 자신의 수정 요청만
      let query = supabase
        .from('revision_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (user?.role !== 'admin') {
        query = query.eq('user_id', user?.id || '');
      }

      const { data, error } = await query;

      if (error) {
        console.error('수정 요청 로드 오류:', error);
        return;
      }

      if (data) {
        setRevisions(data.map(dbRevisionToAppRevision));
      }
    } catch (error) {
      console.error('수정 요청 로드 중 오류:', error);
    }
  };

  // 초기 로드
  useEffect(() => {
    if (user) {
      loadOrders();
      loadRevisions();
    } else {
      setOrders([]);
      setRevisions([]);
      setIsLoading(false);
    }
  }, [user]);

  const getOrdersByUser = (userId: string) => {
    return orders.filter(o => o.userId === userId);
  };

  const getOrderById = (orderId: string) => {
    return orders.find(o => o.id === orderId);
  };

  const getRevisionsByOrder = (orderId: string) => {
    return revisions.filter(r => r.orderId === orderId);
  };

  const getRevisionsByUser = (userId: string) => {
    return revisions.filter(r => r.userId === userId);
  };

  const getAllRevisions = () => {
    return revisions;
  };

  // 주문 생성
  const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'completedAt'>): Promise<Order | null> => {
    try {
      const dbOrder = appOrderToDbOrder(orderData);
      
      const { data, error } = await supabase
        .from('orders')
        .insert(dbOrder)
        .select()
        .single();

      if (error) {
        console.error('주문 생성 오류:', error);
        return null;
      }

      if (data) {
        const newOrder = dbOrderToAppOrder(data);
        setOrders(prev => [newOrder, ...prev]);
        return newOrder;
      }

      return null;
    } catch (error) {
      console.error('주문 생성 중 오류:', error);
      return null;
    }
  };

  // 수정 요청 생성
  const createRevision = async (data: Omit<RevisionRequest, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<RevisionRequest | null> => {
    try {
      const dbRevision = appRevisionToDbRevision({
        ...data,
        status: 'pending',
      });

      const { data: insertedData, error } = await supabase
        .from('revision_requests')
        .insert(dbRevision)
        .select()
        .single();

      if (error) {
        console.error('수정 요청 생성 오류:', error);
        return null;
      }

      if (insertedData) {
        const newRevision = dbRevisionToAppRevision(insertedData);
        setRevisions(prev => [newRevision, ...prev]);
        return newRevision;
      }

      return null;
    } catch (error) {
      console.error('수정 요청 생성 중 오류:', error);
      return null;
    }
  };

  // 수정 요청 상태 업데이트
  const updateRevisionStatus = async (
    revisionId: string,
    status: RevisionRequest['status'],
    adminNote?: string,
    rejectionReason?: string
  ): Promise<void> => {
    try {
      const updateData: any = {
        status,
        updated_at: new Date().toISOString(),
      };

      if (status === 'completed') {
        updateData.completed_at = new Date().toISOString();
      }

      if (adminNote) {
        updateData.admin_note = adminNote;
      }

      if (rejectionReason) {
        updateData.rejection_reason = rejectionReason;
      }

      const { data, error } = await supabase
        .from('revision_requests')
        .update(updateData)
        .eq('id', revisionId)
        .select()
        .single();

      if (error) {
        console.error('수정 요청 업데이트 오류:', error);
        return;
      }

      if (data) {
        const updatedRevision = dbRevisionToAppRevision(data);
        setRevisions(prev => prev.map(r => r.id === revisionId ? updatedRevision : r));

        // 상태 변경 시 이메일 발송
        if (status === 'completed' || status === 'in_progress' || status === 'rejected') {
          sendStatusEmail(updatedRevision, status);
        }
      }
    } catch (error) {
      console.error('수정 요청 업데이트 중 오류:', error);
    }
  };

  // 이메일 발송 (시뮬레이션)
  const sendStatusEmail = async (revision: RevisionRequest, status: string) => {
    const order = getOrderById(revision.orderId);
    if (!order) return;

    const statusMessages: Record<string, { subject: string; emoji: string; message: string }> = {
      in_progress: {
        subject: '수정 작업이 시작되었습니다',
        emoji: '🔧',
        message: '요청하신 수정 작업이 시작되었습니다. 48시간 내에 완료될 예정입니다.'
      },
      completed: {
        subject: '수정 요청이 완료되었습니다',
        emoji: '✅',
        message: '요청하신 수정 작업이 완료되었습니다. 홈페이지에서 확인해 주세요!'
      },
      rejected: {
        subject: '수정 요청이 반려되었습니다',
        emoji: '❌',
        message: '요청하신 수정 작업이 반려되었습니다.'
      }
    };

    const statusInfo = statusMessages[status];
    if (!statusInfo) return;

    console.log('📧 이메일 발송:', {
      to: order.customer.email,
      subject: `[Vertex Studio] ${statusInfo.subject} - ${revision.title}`,
      body: `
        안녕하세요, ${order.customer.businessName} 대표님.
        
        ${statusInfo.message}
        
        ${statusInfo.emoji} 수정 내용: ${revision.title}
        📅 처리 시간: ${new Date().toLocaleString('ko-KR')}
        ${revision.adminNote ? `📝 담당자 메모: ${revision.adminNote}` : ''}
        ${revision.rejectionReason ? `\n⚠️ 반려 사유: ${revision.rejectionReason}` : ''}
        
        문의사항이 있으시면 언제든 연락 주세요.
        
        감사합니다.
        Vertex Studio 드림
      `
    });

    // 실제로는 Supabase Edge Function이나 외부 이메일 서비스 사용
    const statusLabel = status === 'in_progress' ? '진행중' : status === 'completed' ? '완료' : '반려';
    alert(`이메일 발송 완료!\n받는 사람: ${order.customer.email}\n상태: ${statusLabel}`);
  };

  const refreshOrders = async () => {
    await loadOrders();
  };

  const refreshRevisions = async () => {
    await loadRevisions();
  };

  return (
    <OrdersContext.Provider value={{
      orders,
      revisions,
      isLoading,
      getOrdersByUser,
      getOrderById,
      getRevisionsByOrder,
      getRevisionsByUser,
      getAllRevisions,
      createOrder,
      createRevision,
      updateRevisionStatus,
      sendStatusEmail,
      refreshOrders,
      refreshRevisions
    }}>
      {children}
    </OrdersContext.Provider>
  );
};

// ============================================
// Hook
// ============================================
export const useOrders = (): OrdersContextType => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};
