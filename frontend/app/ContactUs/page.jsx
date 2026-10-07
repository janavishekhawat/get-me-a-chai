import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const page = () => {
  return (
    <div className="bg-chai-body overflow-hidden">
      <header>
        <Navbar />
      </header>

      <main className="bg-[#3B2A1B] w-full min-h-screen flex items-center justify-center sm:p-16 p-2 pt-8">
        <section className="flex flex-col gap-y-12 ">
          <div className="text-center w-full">
            <h1 className="text-2xl md:text-5xl font-bold mb-3">Let's Chat!</h1>
            <h2 className="">
              Whether you have a question about features, pricing, or just want
              to say hi,
            </h2>
            <h2>our team is ready to answer all your questions.</h2>
          </div>

          <section className="flex flex-col md:flex-row justify-around gap-20 md:gap-36">
            <div className="flex flex-col flex-wrap justify-around w-full md:w-1/2 gap-6 items-center">
              <article className="flex flex-col items-center">
                <img
                  src="/assets/Envelope_icon.png"
                  alt="Envelope_icon"
                  className="h-10 md:h-16"
                />
                <h2 className="font-bold">Support</h2>
                <p className="text-sm">We are here to help.</p>
                <p className="text-sm">Support@getmeachai.com</p>
              </article>

              <article className="flex flex-col items-center">
                <img
                  src="/assets/Community_icon.png"
                  alt="Envelope_icon"
                  className="h-10 md:h-16"
                />
                <h2 className="font-bold">Community</h2>
                <p className="text-sm">Join the conversation</p>
                <p className="text-sm">Twiter / Discord</p>
              </article>
            </div>

            <aside className="bg-[#2b1a0c] p-5 border-2 border-[#5e4a37] rounded-2xl">
              <form className="flex flex-col gap-8">
                <h2 className="font-bold">Send a Message</h2>
                <div className="flex flex-col md:flex-row justify-around gap-3">
                  <div className="flex flex-col text-sm">
                    <label htmlFor="firstName">First Name :</label>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="mt-1 border border-amber-100 rounded-md p-1 px-2 text-sm"
                    />
                  </div>
                  <div className="flex flex-col text-sm">
                    <label htmlFor="lastName">Last Name :</label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="mt-1 border border-amber-100 rounded-md p-1 px-2 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="">Email :</label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="mt-1 border border-amber-100 rounded-md p-1 px-2 text-sm w-full"
                  />
                </div>
                <div>
                  <label htmlFor="message">Message :</label>
                  <textarea
                    rows="4"
                    placeholder="Leave us a message..."
                    className="mt-1 border border-amber-100 rounded-md p-1 px-2 text-sm w-full"
                  ></textarea>
                </div>
                <button className="bg-amber-600 hover:bg-amber-700 w-full p-2 text-sm rounded-md transition-all duration-200">
                  Send Message
                </button>
              </form>
            </aside>
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
