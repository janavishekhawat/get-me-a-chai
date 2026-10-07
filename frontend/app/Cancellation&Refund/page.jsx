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
            <h1 className="text-3xl font-semibold mb-3">
              Cancellation & Refund Policy
            </h1>
            <h2 className="font-bold text-xl mb-3">Last Updated: Nov 2025</h2>
          </section>

          <section className="">
            <h2 className="font-bold text-xl mb-3">Introduction</h2>
            <p>
              At Get Me A Chai, we strive to ensure the satisfaction of all our
              users. However, as a platform facilitating direct support and
              crowdfunding, specific rules apply to cancellations and refunds.
            </p>
          </section>

          <section className="">
            <h2 className="font-bold text-xl mb-3">
              For Contributors & Supporters
            </h2>
            <ul className="pl-6 list-disc list-outside space-y-2">
              <li>
                Voluntary Support: Contributions ("buying a chai") are
                voluntary. These are generally non-refundable once the
                transaction is successfully processed.
              </li>
              <li>
                Refund Eligibility: Refunds are only issued in the following
                specific cases:
                <ul>
                  <li>
                    Technical Error: If you were charged twice or a transaction
                    failed.
                  </li>
                  <li>
                    Fraud: If the transaction was made without your consent
                    (subject to investigation).
                  </li>
                </ul>
              </li>
              <li>
                Time Limit: To claim a refund for a technical error, you must
                contact us within 7 days of the transaction date. Requests made
                after 7 days may not be entertained.
              </li>
            </ul>
          </section>

          <section className="">
            <h2 className="font-bold text-xl mb-3">
              Cancellations (Campaigns & Subscriptions)
            </h2>
            <ul className="pl-6 list-disc list-outside space-y-2">
              <li>
                Campaigns: If a creator cancels a campaign, or if an
                "All-or-Nothing" campaign fails to reach its goal, funds will be
                automatically refunded to supporters.
              </li>
              <li>
                Subscriptions: If you subscribe to a creator, you may cancel
                your membership at any time. Cancellation stops future billing
                immediately, but no refunds will be provided for the current
                billing cycle. You will retain access to content until the cycle
                ends.
              </li>
            </ul>
          </section>

          <section className="">
            <h2 className="font-bold text-xl mb-3">For Creators</h2>
            <ul className="pl-6 list-disc list-outside space-y-2">
              <li>
                Distributed Funds: Funds that have already been settled to your
                bank account are final. Get Me A Chai cannot reverse these
                transfers. If a supporter requests a refund after settlement,
                the creator is solely responsible for handling that dispute.
              </li>
            </ul>
          </section>

          <section className="">
            <h2 className="font-bold text-xl mb-3">
              Refund Processing Timeline If a refund is approved by our team:
            </h2>
            <ul className="pl-6 list-disc list-outside space-y-2">
              <li>
                The amount will be credited back to your original payment method
                (Bank, Card, or UPI).
              </li>
              <li>
                Please allow 5-7 business days for the refund to reflect in your
                bank account, depending on your bank's processing speed.
              </li>
            </ul>
          </section>

          <section className="">
            <p>
              Contact Us For any payment-related issues, please contact us at:
              support@getmeachai.com (Please include your Transaction ID for
              faster resolution)
            </p>
          </section>
        </section>
      </main>
      <footer>
      <Footer />
      </footer>
    </div>
  );
};

export default page;
