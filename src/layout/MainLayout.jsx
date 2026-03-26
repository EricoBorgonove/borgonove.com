import CookieBanner from "../components/CookieBanner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="app-shell bg-slate-950 text-white overflow-x-hidden glow min-h-screen">
      <Navbar />
      <main className="pt-28">{children}</main>
      <CookieBanner />
      <Footer />
    </div>
  );
}
