"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 transition-colors">
            <Header />
            <main className="flex-grow pt-24 pb-16 px-4 md:px-8 max-w-4xl mx-auto w-full">
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-10 shadow-lg border border-gray-100 dark:border-gray-800">
                    <h1 className="text-3xl font-bold text-center mb-10 text-primary">개인정보 처리방침</h1>

                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-center">
                            <p className="text-lg">
                                <strong>푸른솔 정신건강의학과</strong>(이하 ‘본 병원’)는 개인정보 보호를 중요하게 생각하며,<br className="hidden md:block" />
                                관련 법령을 준수하고 있습니다.
                            </p>
                        </div>

                        <div className="border-t border-gray-100 dark:border-gray-800 my-8"></div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-primary border-b border-gray-200 pb-2">1. 개인정보의 수집 및 이용 목적</h3>
                            <div className="pl-4 space-y-2 text-gray-600 dark:text-gray-300">
                                <p>본 병원은 방문자의 개인정보를 직접 수집하지 않습니다.</p>
                                <p>다만, 홈페이지 이용 과정에서 자동으로 다음과 같은 정보가 수집될 수 있습니다.</p>
                                <ul className="list-disc pl-5 mt-2 space-y-1 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                    <li>IP 주소, 브라우저 정보, 방문 일시</li>
                                    <li>홈페이지 운영 및 서비스 개선 목적</li>
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-primary border-b border-gray-200 pb-2">2. 개인정보의 보관 및 보호</h3>
                            <div className="pl-4 space-y-2 text-gray-600 dark:text-gray-300">
                                <p>본 병원은 방문자의 개인정보를 제3자에게 제공하지 않으며, 법적 요구가 있는 경우에만 제공됩니다.</p>
                                <p>개인정보 보호를 위해 SSL 적용, 방화벽 보안 강화 등의 조치를 취하고 있습니다.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-primary border-b border-gray-200 pb-2">3. 개인정보 보호책임자 및 문의</h3>
                            <div className="pl-4 space-y-2 text-gray-600 dark:text-gray-300">
                                <p>개인정보 보호 관련 문의사항이 있으시면 아래 연락처로 문의해 주세요.</p>
                                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-2">
                                    <p><strong>담당자:</strong> 전한솔 원장</p>
                                    <p><strong>전화:</strong> 02-856-5557</p>
                                    <p><strong>이메일:</strong> purunsolnp@gmail.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-primary border-b border-gray-200 pb-2">4. 개인정보처리방침 변경</h3>
                            <div className="pl-4 space-y-2 text-gray-600 dark:text-gray-300">
                                <p>본 방침은 법령 및 운영 방침 변경에 따라 업데이트될 수 있으며, 변경 사항은 홈페이지를 통해 공지됩니다.</p>
                                <div className="text-sm text-gray-500 mt-4 border-t border-gray-100 pt-4">
                                    <p>최초 시행일: 2022년 10월 12일</p>
                                    <p>최종 수정일: 2025년 3월 26일</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
