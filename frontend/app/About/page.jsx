import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import {
  Aperture,
  Globe,
  Heart,
  Clock,
  Users,
  Coffee,
  DollarSign,
  Zap,
} from "lucide-react";

const page = () => {
  return (
    <>
      <div className="w-full bg-chai-body overflow-hidden">
        <header>
          <Navbar />
        </header>
        <main>
          <header className="relative">
            <img
              src="/assets/TEA_image.png"
              alt="Tea_Cup"
              className="w-full h-[90vh] object-cover"
            />
            <div className="absolute h-full top-0 bg-black/80 w-full"></div>

            <div className="absolute flex flex-col gap-3 justify-center items-center top-0 h-full w-full text-center">
              <Coffee className="w-12 h-12 opacity-0 animate-thetext" />
              <h1 className="text-5xl font-bold w-2/3 opacity-0 animate-thetext">
                Fueling the Next Wave of Creation
              </h1>
              <p className="text-2xl opacity-0 animate-thetext">
                We connect developers, artists, and influencers directly with
                the supporters who believe in their vision.
              </p>
            </div>
          </header>

          <section className="bg-[#3B2A1B] p-5 pt-24 pb-24 flex flex-col gap-7 md:flex-row md:gap-0 justify-around items-center">
            <article className="flex flex-col w-1/2 gap-7">
              <h1 className="text-amber-600">OUR MISSION</h1>
              <h2 className="text-3xl font-bold">
                Empowering the Global Creator Economy
              </h2>
              <p>
                Founded by creators who intimately understood the challenges of
                building a sustainable income, Get Me A Chai was created on the
                belief that talent deserves direct, fair, and consistent
                compensation. We know that behind every post, video, or artwork
                is a story of dedication, creativity, and persistence—and
                creators should be able to thrive while doing what they love.
              </p>

              <p>
                Our platform simplifies financial support, making it accessible,
                secure, and meaningful. Patrons can directly contribute to the
                creators they admire, helping fuel innovation and growth without
                the distractions of complex systems or unnecessary overhead.
              </p>

              <p>
                By connecting creators with a community that believes in their
                work, we aim to turn dreams into reality. Our mission is to
                nurture a global culture of creativity, collaboration, and
                innovation, where ideas are celebrated, talent is recognized,
                and creators are empowered to shape the future of the digital
                world.
              </p>

              <p>
                At Get Me A Chai, we're not just building a platform—we're
                building a movement that values creativity, supports creators,
                and rewards passion.
              </p>

              <button className="bg-amber-600 rounded-4xl p-3 hover:bg-amber-800 cursor-pointer transition-all duration-300">
                Start Funding a Creator
              </button>
            </article>
            <img
              src="/assets/support-chai.png"
              alt="tea_cup"
              className="h-80 rounded-4xl"
            />
          </section>

          <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 sm:p-0 p-4 mt-24 mb-24 text-center justify-items-center">
            <FeatureCard
              icon={DollarSign}
              title1="Empower"
              title2="Creators"
              description="Support the people who inspire you. A small cup of chai can fuel
                      their creativity and keep their passion alive."
            />
            <FeatureCard
              icon={Zap}
              title1="Support in"
              title2="One Click"
              description="Send a chai instantly with fast, secure payments — no sign-up
                      required."
            />

            <FeatureCard
              icon={Coffee}
              title1="Become a"
              title2="Creator"
              description="Create your own page, share your passion, and start receiving
                      support from your community — all with one simple link.."
            />
          </section>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default page;
