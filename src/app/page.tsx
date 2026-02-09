import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Hours from "@/components/Hours";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Hours />
        <Services />
        <Contact />
      </main>
      <Footer />

      {/* Floating Call Button */}
      <a
        href="tel:+8228565557"
        className="fixed bottom-8 right-8 z-40 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 hover:bg-primary-hover transition-all"
        aria-label="전화 걸기"
      >
        <span className="material-symbols-outlined">call</span>
      </a>
    </div>
  );
}
