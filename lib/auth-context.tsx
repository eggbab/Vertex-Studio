import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType, RegisterData } from './types';
import { supabase } from './supabase';
import type { Session, AuthError } from '@supabase/supabase-js';

// ============================================
// Context 생성
// ============================================
const AuthContext = createContext<AuthContextType | null>(null);

// ============================================
// Provider 컴포넌트
// ============================================
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Supabase 세션에서 사용자 정보 가져오기
  const fetchUserProfile = async (session: Session | null): Promise<User | null> => {
    if (!session?.user) return null;

    try {
      // users 테이블에서 프로필 정보 가져오기
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error('프로필 조회 오류:', error);
        // 프로필이 없으면 기본 정보로 생성
        if (error.code === 'PGRST116') {
          const newProfile: User = {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.email?.split('@')[0] || '사용자',
            phone: '',
            role: 'customer',
            createdAt: new Date().toISOString()
          };

          // 프로필 생성
          const { error: insertError } = await supabase
            .from('users')
            .insert({
              id: session.user.id,
              email: session.user.email || '',
              name: newProfile.name,
              role: 'customer'
            });

          if (insertError) {
            console.error('프로필 생성 오류:', insertError);
            return null;
          }

          return newProfile;
        }
        return null;
      }

      if (data) {
        return {
          id: data.id,
          email: data.email,
          name: data.name,
          phone: '', // users 테이블에 phone이 없으면 빈 문자열
          role: data.role as 'customer' | 'admin',
          createdAt: data.created_at
        };
      }

      return null;
    } catch (error) {
      console.error('프로필 조회 중 오류:', error);
      return null;
    }
  };

  // 초기 세션 확인 및 사용자 정보 로드
  useEffect(() => {
    let mounted = true;

    // 현재 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;

      if (session) {
        fetchUserProfile(session).then((profile) => {
          if (mounted) {
            setUser(profile);
            setIsLoading(false);
          }
        });
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    // 인증 상태 변경 리스너
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (session) {
        const profile = await fetchUserProfile(session);
        if (mounted) {
          setUser(profile);
        }
      } else {
        if (mounted) {
          setUser(null);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // 로그인
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('로그인 오류:', error);
        setIsLoading(false);
        return false;
      }

      if (data.session) {
        const profile = await fetchUserProfile(data.session);
        setUser(profile);
        setIsLoading(false);
        return true;
      }

      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('로그인 중 오류:', error);
      setIsLoading(false);
      return false;
    }
  };

  // 로그아웃
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('로그아웃 오류:', error);
    }
  };

  // 회원가입
  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);

      // 1. Supabase Auth에 사용자 생성
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            phone: data.phone,
          },
        },
      });

      if (authError) {
        console.error('회원가입 오류:', authError);
        setIsLoading(false);
        
        // 이메일 중복 오류 처리
        if (authError.message.includes('already registered') || authError.message.includes('already exists') || authError.code === '23505') {
          return { success: false, error: '이미 가입된 이메일입니다.' };
        }
        
        return { success: false, error: authError.message || '회원가입에 실패했습니다.' };
      }

      if (authData.user) {
        // 2. users 테이블에 프로필 정보 저장
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: data.email,
            name: data.name,
            phone: data.phone || null,
            role: 'customer',
          });

        if (profileError) {
          console.error('프로필 생성 오류:', profileError);
          setIsLoading(false);
          
          // 이메일 중복 오류 처리
          if (profileError.code === '23505' || profileError.message.includes('duplicate')) {
            return { success: false, error: '이미 가입된 이메일입니다.' };
          }
          
          return { success: false, error: '프로필 생성에 실패했습니다.' };
        }

        // 3. 세션에서 사용자 정보 가져오기
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const profile = await fetchUserProfile(session);
          setUser(profile);
        }

        setIsLoading(false);
        return { success: true };
      }

      setIsLoading(false);
      return { success: false, error: '회원가입에 실패했습니다.' };
    } catch (error) {
      console.error('회원가입 중 오류:', error);
      setIsLoading(false);
      return { success: false, error: '회원가입 중 오류가 발생했습니다.' };
    }
  };

  // 소셜 로그인 (구글, 네이버, 카카오 지원)
  const signInWithProvider = async (provider: 'google' | 'naver' | 'kakao'): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Supabase 소셜 로그인
      // 카카오는 공식 지원, 네이버는 'naver'로 시도 (Supabase 설정 필요)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider === 'naver' ? 'naver' : provider === 'kakao' ? 'kakao' : 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          // 네이버/카카오의 경우 추가 옵션 필요할 수 있음
        },
      });

      if (error) {
        console.error(`${provider} 로그인 오류:`, error);
        setIsLoading(false);
        
        // 사용자 친화적인 오류 메시지
        if (error.message?.includes('not enabled') || error.message?.includes('disabled')) {
          throw new Error(`${provider === 'google' ? '구글' : provider === 'naver' ? '네이버' : '카카오'} 로그인이 설정되지 않았습니다. Supabase 대시보드에서 활성화해주세요.`);
        }
        
        throw error;
      }
      
      // 리다이렉트되므로 여기서는 로딩 상태 유지
    } catch (error) {
      console.error('소셜 로그인 중 오류:', error);
      setIsLoading(false);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register, signInWithProvider }}>
      {children}
    </AuthContext.Provider>
  );
};

// ============================================
// Hook
// ============================================
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
