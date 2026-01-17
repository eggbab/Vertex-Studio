import React from 'react';
import { motion } from 'framer-motion';
import { Link, ArrowLeft, Shield, FileText, Lock, UserCheck, Eye, AlertCircle, Target, Clock, Users, Settings, Trash2 } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  const sections = [
    {
      id: '1',
      title: '1. 개인정보의 처리 목적',
      icon: Target,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Vertex Studio (이하 "회사")는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
          </p>
          <div className="space-y-3">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
              <h4 className="font-bold text-gray-900 mb-2">가. 홈페이지 회원 가입 및 관리</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-2">
                <li>회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증</li>
                <li>회원자격 유지·관리, 서비스 부정이용 방지</li>
                <li>각종 고지·통지, 고충처리 목적</li>
              </ul>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
              <h4 className="font-bold text-gray-900 mb-2">나. 랜딩페이지 제작 견적 및 주문 처리</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-2">
                <li>견적서 작성 및 제공</li>
                <li>주문 접수 및 확인</li>
                <li>서비스 제공 및 제작 진행 관리</li>
                <li>계약서·청약철회 등에 관한 기록 보존</li>
              </ul>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
              <h4 className="font-bold text-gray-900 mb-2">다. 재화 또는 서비스 제공</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-2">
                <li>서비스 제공, 콘텐츠 제공, 맞춤 서비스 제공</li>
                <li>본인인증, 요금결제·정산</li>
                <li>주문 내역 및 수정 요청 관리</li>
              </ul>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
              <h4 className="font-bold text-gray-900 mb-2">라. 마케팅 및 광고에의 활용</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-2">
                <li>신규 서비스 개발 및 맞춤 서비스 제공</li>
                <li>이벤트 및 광고성 정보 제공 및 참여기회 제공</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: '2',
      title: '2. 개인정보의 처리 및 보유기간',
      icon: Clock,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
          </p>
          <div className="space-y-3">
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">가. 회원 정보</h4>
              <p className="text-gray-700 text-sm">보유기간: 회원 탈퇴 시까지 (단, 관계 법령 위반에 따른 수사·조사 등이 진행중인 경우에는 해당 수사·조사 종료 시까지)</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">나. 주문 정보</h4>
              <p className="text-gray-700 text-sm">보유기간: 전자상거래법에 따라 5년 (계약 또는 청약철회 등에 관한 기록)</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">다. 결제 및 대금결제 기록</h4>
              <p className="text-gray-700 text-sm">보유기간: 전자상거래법에 따라 5년</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">라. 계약 또는 청약철회 등에 관한 기록</h4>
              <p className="text-gray-700 text-sm">보유기간: 전자상거래법에 따라 5년</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">마. 소비자의 불만 또는 분쟁처리에 관한 기록</h4>
              <p className="text-gray-700 text-sm">보유기간: 전자상거래법에 따라 3년</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: '3',
      title: '3. 처리하는 개인정보의 항목',
      icon: FileText,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            회사는 다음의 개인정보 항목을 처리하고 있습니다.
          </p>
          <div className="space-y-3">
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">가. 회원 가입 시</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-2">
                <li>필수항목: 이메일, 비밀번호, 이름, 전화번호</li>
                <li>선택항목: 없음</li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">나. 랜딩페이지 견적 및 주문 시</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-2">
                <li>필수항목: 업종, 회사명(또는 사업자명), 연락처, 이메일</li>
                <li>선택항목: 도메인 정보, 추가 요청사항, 참고 자료(이미지/PDF 파일)</li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">다. 서비스 이용 과정에서 자동 수집되는 정보</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-2">
                <li>IP주소, 쿠키, MAC주소, 서비스 이용 기록, 방문 기록, 불량 이용 기록 등</li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">라. 결제 서비스 이용 시</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-2">
                <li>결제기관(Toss Payments)을 통한 결제 정보 처리</li>
                <li>카드사명, 카드번호(일부), 거래금액, 거래일시 등 (결제기관이 직접 처리)</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: '4',
      title: '4. 개인정보의 제3자 제공',
      icon: Users,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r">
            <p className="text-gray-700 text-sm">
              회사는 원칙적으로 정보주체의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다.
            </p>
          </div>
          <div className="space-y-3">
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">가. 결제 서비스 제공</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-2">
                <li>제공받는 자: (주)토스페이먼츠</li>
                <li>제공하는 항목: 결제 정보(거래금액, 주문번호 등)</li>
                <li>제공받는 자의 이용목적: 전자결제 대행 서비스 제공</li>
                <li>보유 및 이용기간: 결제 서비스 제공 완료 후 5년</li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">나. 법령에 의한 요구</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-2">
                <li>법령, 법원의 판결, 수사기관의 수사 목적 등 법령에 특별한 규정이 있는 경우</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: '5',
      title: '5. 개인정보처리의 위탁',
      icon: Settings,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
          </p>
          <div className="space-y-3">
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">가. 데이터베이스 및 클라우드 서비스</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-2">
                <li>위탁받는 자(수탁자): Supabase Inc.</li>
                <li>위탁하는 업무의 내용: 회원 정보 및 주문 정보 관리, 데이터베이스 서버 운영</li>
                <li>위탁기간: 회원 탈퇴 또는 위탁 계약 종료 시까지</li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">나. 결제 서비스</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-2">
                <li>위탁받는 자(수탁자): (주)토스페이먼츠</li>
                <li>위탁하는 업무의 내용: 전자결제 대행 서비스, 결제 정보 처리</li>
                <li>위탁기간: 결제 서비스 제공 완료 후 5년</li>
              </ul>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              회사는 위탁계약 체결 시 개인정보보호법 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
            </p>
          </div>
        </div>
      )
    },
    {
      id: '6',
      title: '6. 정보주체의 권리·의무 및 행사방법',
      icon: UserCheck,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            정보주체는 다음과 같은 권리를 행사할 수 있습니다.
          </p>
          <div className="space-y-3">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r">
              <h4 className="font-bold text-gray-900 mb-2">가. 정보주체의 권리</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-2">
                <li>개인정보 열람 요구</li>
                <li>개인정보 정정·삭제 요구</li>
                <li>개인정보 처리정지 요구</li>
                <li>개인정보 수집·이용·제공에 대한 동의 철회</li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">나. 권리 행사 방법</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-2">
                <li>온라인: 홈페이지 내 "내 주문" 페이지에서 직접 조회·수정 가능</li>
                <li>이메일: contact@vertexstudio.kr</li>
                <li>전화: 02-1234-5678</li>
                <li>우편: 인천 연수구 옥련동 청룡로 50번길 2</li>
              </ul>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 회사는 지체 없이 그 오류를 정정하거나 삭제합니다. 이 경우 회사는 정정 또는 삭제 완료 시까지 당해 개인정보를 이용하거나 제공하지 않습니다.
            </p>
          </div>
        </div>
      )
    },
    {
      id: '7',
      title: '7. 개인정보의 파기',
      icon: Trash2,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.
          </p>
          <div className="space-y-3">
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">가. 파기 절차</h4>
              <p className="text-gray-700 text-sm">정보주체가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류) 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다.</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">나. 파기 방법</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-2">
                <li>전자적 파일 형태: 복구 및 재생되지 않도록 안전하게 삭제</li>
                <li>기록물, 인쇄물, 서면 등: 분쇄하거나 소각</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: '8',
      title: '8. 개인정보 보호책임자',
      icon: Shield,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
            <div className="space-y-2">
              <div>
                <span className="font-bold text-gray-900">개인정보 보호책임자</span>
                <ul className="list-none space-y-1 text-gray-700 text-sm mt-2">
                  <li>• 성명: 김우진</li>
                  <li>• 직책: 대표</li>
                  <li>• 연락처: 02-1234-5678</li>
                  <li>• 이메일: contact@vertexstudio.kr</li>
                </ul>
              </div>
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-gray-700 text-sm">
                  정보주체께서는 회사의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자에게 문의하실 수 있습니다. 회사는 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: '9',
      title: '9. 개인정보의 안전성 확보조치',
      icon: Lock,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
          </p>
          <div className="space-y-3">
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">가. 관리적 조치</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-2">
                <li>내부관리계획 수립·시행, 정기적 직원 교육</li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">나. 기술적 조치</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-2">
                <li>개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치</li>
                <li>고유식별정보 등의 암호화</li>
                <li>보안프로그램 설치</li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">다. 물리적 조치</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-2">
                <li>전산실, 자료보관실 등의 접근통제</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: '10',
      title: '10. 개인정보 처리방침 변경',
      icon: AlertCircle,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            이 개인정보처리방침은 2025년 1월 16일부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
          </p>
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
            <p className="text-gray-700 text-sm">
              <strong className="font-bold">이전 개인정보처리방침:</strong> 최초 시행일자 2025년 1월 16일
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            홈으로 돌아가기
          </Link>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
              <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tighter text-gray-900">
                개인정보처리방침
              </h1>
            </div>
            <p className="text-gray-500 text-sm">
              시행일자: 2025년 1월 16일 | Vertex Studio (버텍스 스튜디오)
            </p>
          </div>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8"
        >
          <p className="text-gray-700 leading-relaxed">
            Vertex Studio (이하 "회사")는 개인정보보호법 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보처리방침을 수립·공개합니다.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 2) }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <section.icon className="w-6 h-6 text-blue-600 shrink-0" />
                <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tighter text-gray-900">
                  {section.title}
                </h2>
              </div>
              <div className="prose prose-sm max-w-none">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * (sections.length + 2) }}
          className="bg-blue-50 border-l-4 border-blue-500 rounded-r p-6 mt-8"
        >
          <h3 className="font-bold text-gray-900 mb-3">문의처</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>이메일: <a href="mailto:contact@vertexstudio.kr" className="text-blue-600 hover:underline">contact@vertexstudio.kr</a></p>
            <p>전화: 02-1234-5678</p>
            <p>주소: 인천 연수구 옥련동 청룡로 50번길 2</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};


export default PrivacyPolicy;
