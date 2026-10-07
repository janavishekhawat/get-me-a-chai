import Footer from "@/components/Footer";
import Manager from "@/components/Home/Manager";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="bg-[#FFF8F2] overflow-hidden">
        <Manager />
        <Footer />
      </div>
    </>
  );
}
