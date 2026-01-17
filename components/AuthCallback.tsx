import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth-context';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // URL에서 해시 파라미터 확인 (Supabase OAuth 콜백)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const error = hashParams.get('error');
        const errorDescription = hashParams.get('error_description');

        if (error) {
          setStatus('error');
          setErrorMessage(errorDescription || '로그인에 실패했습니다.');
          setTimeout(() => navigate('/login'), 3000);
          return;
        }

        if (accessToken) {
          // 세션이 이미 설정되어 있으므로 잠시 대기
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // 세션 확인
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session) {
            setStatus('success');
            // 사용자 프로필이 users 테이블에 없으면 생성
            const { data: profileData, error: profileError } = await supabase
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profileError && profileError.code === 'PGRST116') {
              // 프로필이 없으면 생성
              const { error: insertError } = await supabase
                .from('users')
                .insert({
                  id: session.user.id,
                  email: session.user.email || '',
                  name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || '사용자',
                  phone: session.user.user_metadata?.phone || null,
                  role: 'customer',
                });

              if (insertError) {
                console.error('프로필 생성 오류:', insertError);
              }
            }

            setTimeout(() => navigate('/my-orders'), 1500);
          } else {
            setStatus('error');
            setErrorMessage('세션을 가져올 수 없습니다.');
            setTimeout(() => navigate('/login'), 3000);
          }
        } else {
          // 일반 페이지 접근 시
          if (user) {
            navigate('/my-orders');
          } else {
            navigate('/login');
          }
        }
      } catch (error: any) {
        console.error('인증 콜백 처리 오류:', error);
        setStatus('error');
        setErrorMessage(error.message || '로그인 처리 중 오류가 발생했습니다.');
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    handleAuthCallback();
  }, [navigate, user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
      >
        {status === 'loading' && (
          <>
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">로그인 처리 중...</h2>
            <p className="text-gray-500 text-sm">잠시만 기다려주세요</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">로그인 성공!</h2>
            <p className="text-gray-500 text-sm">잠시 후 이동합니다...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">로그인 실패</h2>
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            <p className="text-gray-500 text-xs">잠시 후 로그인 페이지로 이동합니다...</p>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default AuthCallback;
