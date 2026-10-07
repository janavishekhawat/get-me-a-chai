import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const page = () => {
  return (
    <div className="w-full bg-chai-body overflow-hidden">
      <header>
        <Navbar />
      </header>
      <main className="bg-[#3B2A1B] w-full px-9 py-16 lg:px-72 flex items-center">
        <section className="flex flex-col gap-y-12">
          <div className="text-center">
            <h1 className="text-3xl font-semibold mb-3">Privacy Policy</h1>
            <h2 className="font-bold text-xl mb-3">Last Updated: Nov 2025</h2>
          </div>
          <section className="">
            <p>
              At Get Me A Chai, we are committed to protecting your privacy and
              ensuring a safe and transparent experience for every creator and
              supporter who uses our platform. This Privacy Policy explains how
              we collect, use, disclose, and safeguard your information.
            </p>
          </section>
          <section className="">
            <h2 className="font-bold text-xl mb-3">Information We Collect</h2>
            <ul className="pl-6 list-disc list-outside space-y-2">
              <li>
                Personal Information : Details you provide when using our
                platform, such as your name, email address, profile details, and
                contact information.
              </li>
              <li>
                Payment Information : Payment details processed securely through
                trusted third-party gateways such as Razorpay. (We do not store
                your full card or banking information.)
              </li>
              <li>
                Usage & Technical Data : Information about how you interact with
                our platform, including pages visited, device type, and browser
                data — collected to improve performance and user experience.
              </li>
            </ul>
          </section>
          <section className="">
            <h2 className="font-bold text-xl mb-3">
              How We Use Your Information
            </h2>
            <h3 className="font-semibold">We use the collected data to:</h3>
            <ul className="pl-6 list-disc list-outside space-y-2">
              <li>Provide, operate, and maintain the platform</li>
              <li>Process secure transactions and support creator payments</li>
              <li>
                Notify you of important updates, changes, or announcements
              </li>
              <li>Offer customer assistance and resolve issues</li>
              <li>
                Analyze and enhance platform performance and user experience
              </li>
            </ul>
          </section>
          <section className="">
            <h2 className="font-bold text-xl mb-3">
              Data Protection & Security
            </h2>
            <p>
              We implement industry-standard encryption and security protocols
              to protect your personal and financial data. While no digital
              system can guarantee absolute security, we continuously update our
              safeguards to keep your information safe.
            </p>
          </section>
          <section className="">
            <h2 className="font-bold text-xl mb-3">Your Rights</h2>
            <h3>
              You have full control over your personal information. You may:
            </h3>
            <ul className="pl-6 list-disc list-outside space-y-2">
              <li>Access the information we hold about you</li>
              <li>Request updates or corrections</li>
              <li>Request deletion of your data, where legally applicable</li>
            </ul>
          </section>
          <section className="">
            <h2 className="font-bold text-xl mb-3">
              Acceptance of This Policy
            </h2>
            <p>
              By using Get Me A Chai, you consent to this Privacy Policy and
              agree to its terms. Continued use of the platform after updates
              signifies acceptance.
            </p>
          </section>
          <section className="">
            <h2 className="font-bold text-xl mb-3">Questions?</h2>
            <p>
              If you have any concerns or need clarification, feel free to reach
              out:
            </p>
          </section>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default page;
