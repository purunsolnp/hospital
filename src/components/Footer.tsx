import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-12 px-6 border-t border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-gray-500">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <span className="font-bold text-primary text-lg">푸른솔정신건강의학과 의원</span>
                    <span className="hidden md:block w-1 h-1 rounded-full bg-gray-300"></span>
                    <div className="text-center md:text-left">
                        <p>대표 원장 : 전한솔 | 사업자 등록번호 : 615-92-01674</p>
                        <p className="text-xs mt-1">© 2024 푸른솔 정신건강의학과. All rights reserved.</p>
                    </div>
                </div>
                <div className="flex gap-6 font-medium text-xs">
                    <Link href="/privacy" className="hover:text-primary transition-colors">
                        개인정보처리방침
                    </Link>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-6 text-xs text-gray-400 text-center md:text-left">
                본 홈페이지는 의료법을 준수하여 운영되며, 의료 광고 심의를 받지 않은 의료광고를 포함하지 않습니다.
            </div>
        </footer>
    );
}
