import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Home, RefreshCw, Package } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth-context';
import { useOrders } from '../lib/orders-context';

interface PaymentResultProps {
  type: 'success' | 'fail';
}

const PaymentResult: React.FC<PaymentResultProps> = ({ type }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createOrder } = useOrders();
  const [paymentInfo, setPaymentInfo] = useState<{
    orderId: string;
    amount: string;
    paymentKey: string;
  } | null>(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);

  useEffect(() => {
    // URL 파라미터에서 결제 정보 추출
    const orderId = searchParams.get('orderId') || '';
    const amount = searchParams.get('amount') || '';
    const paymentKey = searchParams.get('paymentKey') || '';

    if (type === 'success' && orderId) {
      setPaymentInfo({ orderId, amount, paymentKey });
      
      // 세션 스토리지에서 주문 데이터 가져오기
      const pendingOrderData = sessionStorage.getItem('pending_order');
      
      if (pendingOrderData && user && !orderCreated) {
        // async 함수를 내부에서 정의하고 호출
        const createOrderAsync = async () => {
          setIsCreatingOrder(true);
          
          try {
            const orderData = JSON.parse(pendingOrderData);
            
            // Supabase에 주문 생성
            const order = await createOrder({
              ...orderData,
              userId: user.id,
              status: 'pending',
              paymentStatus: 'paid'
            });

            if (order) {
              setOrderCreated(true);
              // 세션 스토리지에서 주문 데이터 제거
              sessionStorage.removeItem('pending_order');
              console.log('주문이 생성되었습니다:', order);
            } else {
              console.error('주문 생성 실패');
            }
          } catch (error) {
            console.error('주문 생성 중 오류:', error);
          } finally {
            setIsCreatingOrder(false);
          }
        };

        createOrderAsync();
      }
      
      // TODO: 서버에 결제 승인 요청
      // confirmPayment(orderId, amount, paymentKey);
    }
  }, [searchParams, type, user, createOrder, orderCreated]);

  if (type === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50/30 to-teal-50/50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            결제가 완료되었습니다!
          </h1>
          <p className="text-gray-500 mb-8">
            제작이 곧 시작됩니다.<br />
            담당자가 1영업일 내에 연락드릴게요.
          </p>

          {paymentInfo && (
            <div className="bg-gray-50 rounded-xl p-4 mb-8 text-left text-sm">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-500">주문번호</span>
                <span className="font-medium text-gray-900">{paymentInfo.orderId}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">결제금액</span>
                <span className="font-bold text-blue-600">
                  {Number(paymentInfo.amount).toLocaleString()}원
                </span>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={() => navigate('/my-orders')}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"
            >
              <Package className="w-5 h-5" />
              내 주문 확인하기
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="w-full py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              홈으로 돌아가기
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // 실패 페이지
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50/30 to-yellow-50/50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <XCircle className="w-12 h-12 text-red-600" />
        </motion.div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          결제에 실패했습니다
        </h1>
        <p className="text-gray-500 mb-4">
          {searchParams.get('message') || '결제 중 문제가 발생했습니다.'}
        </p>
        
        <div className="bg-gray-50 rounded-xl p-4 mb-8 text-sm text-gray-600">
          <p>• 카드 한도/잔액을 확인해 주세요</p>
          <p>• 다른 결제 수단으로 다시 시도해 주세요</p>
          <p>• 문제가 계속되면 고객센터로 연락해 주세요</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/quote')}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            다시 결제하기
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            홈으로 돌아가기
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentResult;

