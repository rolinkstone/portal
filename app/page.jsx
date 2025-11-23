import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ReformasiBanner from "@/components/ReformasiBanner";
import Features from "@/components/Features";
import Internal from "@/components/Internal";
import BeritaList from "@/components/BeritaList";
import VisitorTracker from "@/components/VisitorTracker"; // <-- baru
import StatistikPengunjung  from "@/components/StatistikPengunjung";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <>
     <VisitorTracker /> {/* POST visitor saat page dibuka */}
    <Navbar />
    <Hero />
    <ReformasiBanner />
    <Features />
    <Internal />
    <BeritaList />
   <StatistikPengunjung />
      <Footer />
    </>
  );
}
