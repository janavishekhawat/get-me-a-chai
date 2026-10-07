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
          <section className="text-center">
            <h1 className="text-3xl font-semibold mb-3">Terms & Conditions</h1>
            <h2 className="font-bold text-xl mb-3">Last Updated: Nov 2025</h2>
          </section>

          <section className="">
            <h2 className="font-bold text-xl mb-3">Introduction</h2>
            <p>
              Welcome to Get Me A Chai. By accessing or using our platform, you
              agree to comply with and be bound by the following terms and
              conditions. Please read them carefully.
            </p>
          </section>

          <section className="">
            <h2 className="font-bold text-xl mb-3">
              User Responsibilities & Registration
            </h2>
            <ul className="pl-6 list-disc list-outside space-y-2">
              <li>
                Accuracy: You agree to provide accurate and complete information
                during registration.
              </li>
              <li>
                Eligibility: You must be at least 18 years old or have legal
                parental consent to use this platform.
              </li>
              <li>
                Security: You are responsible for maintaining the security of
                your account credentials.
              </li>
            </ul>
          </section>

          <section className="">
            <h2 className="font-bold text-xl mb-3">
              Payments & Crowdfunding Disclaimer
            </h2>
            <ul className="pl-6 list-disc list-outside space-y-2">
              <li>
                Role of Platform: Get Me A Chai is an intermediary. We do not
                guarantee the success of any crowdfunding campaign or creator
                goal.
              </li>
              <li>
                Risk: Contributions are made at your own risk. You acknowledge
                that you are supporting a creator directly, and Get Me A Chai is
                not responsible for how funds are used.
              </li>
              <li>
                Refunds: Transactions are generally considered non-refundable
                donations unless required by law or in cases of proven fraud.
              </li>
            </ul>
          </section>

          <section className="">
            <h2 className="font-bold text-xl mb-3">Prohibited Activities</h2>
            <h3 className="font-semibold">You agree not to engage in:</h3>
            <ul className="pl-6 list-disc list-outside space-y-2">
              <li>
                Fraudulent activities, impersonation, or money laundering.
              </li>
              <li>
                Posting harmful, illegal, abusive, or pornographic content.
              </li>
              <li>Using the platform to harass or threaten other users.</li>
            </ul>
          </section>

          <section className="">
            <h2 className="font-bold text-xl mb-3">
              Intellectual Property (Important!)
            </h2>
            <ul className="pl-6 list-disc list-outside space-y-2">
              <li>
                Creator Ownership: Creators retain full ownership of the content
                they post on Get Me A Chai.
              </li>
              <li>
                Platform License: By posting, you grant Get Me A Chai a license
                to display and distribute your content solely to operate the
                service.
              </li>
              <li>
                Site Assets: The Get Me A Chai logo, code, and design are the
                property of the platform.
              </li>
            </ul>
          </section>

          <section className="">
            <h2 className="font-bold text-xl mb-3">Limitation of Liability</h2>
            <p>
              Get Me A Chai is provided on an "as is" basis. We are not liable
              for any indirect damages, financial losses, or disputes between
              creators and supporters.
            </p>
          </section>

          <section className="">
            <h2 className="font-bold text-xl mb-3">Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of the
              site after updates constitutes acceptance of the revised terms.
            </p>
          </section>
        </section>
      </main>
      <footer><Footer /></footer>
      
    </div>
  );
};

export default page;
