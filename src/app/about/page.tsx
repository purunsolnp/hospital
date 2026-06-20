import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutTabs from "@/components/AboutTabs";
import Link from "next/link";

export const metadata = {
    title: "의료진 소개 | 푸른솔 정신건강의학과",
    description: "푸른솔 정신건강의학과 의료진 소개",
};

export default function AboutPage() {
    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden">
            <Header />
            <main className="flex-1 pt-20">
                <div className="max-w-[1024px] mx-auto px-6 py-8">
                    <div className="flex items-center gap-2 mb-8 text-sm font-medium text-gray-500">
                        <Link href="/" className="hover:text-primary transition-colors">
                            홈
                        </Link>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <span className="text-primary font-bold">의료진 소개</span>
                    </div>

                    <AboutTabs />
                </div>
            </main>
            <Footer />
        </div>
    );
}
