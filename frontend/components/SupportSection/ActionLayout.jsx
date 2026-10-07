import { useEffect, useState } from "react";
import { apiConnector } from "@/services/apiconnector";
import { paymentEndpoints } from "@/services/api";
import { toast } from "react-hot-toast";
import ProfileImage from "../ProfileImage/ProfileImage";
import { HiOutlineDotsVertical } from "react-icons/hi";
import TotalAmountcheck from "./TotalAmountcheck";

const ActionLayout = (creator) => {
  const [chaiQuantity, setChaiQuantity] = useState(1);
  const [Usermessage, setUsermessage] = useState("");
  const [supporters, setSupporters] = useState([]);
  const [TotalAmountList, setTotalAmountList] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const CreatorID = creator.creatorId;

  const {
    CREATE_ORDER_API,
    VERIFY_PAYMENT_API,
    GET_SUPPORTERS_API,
    RESET_TOTALAMOUNT_API,
  } = paymentEndpoints;

  useEffect(() => {
    fetchSupporter();
  }, []);

  const fetchSupporter = async () => {
    try {
      const res = await apiConnector(
        "GET",
        `${GET_SUPPORTERS_API}/${CreatorID}`,
      );
      setSupporters(res.data.supporterData);
    } catch (err) {
      console.log("the error is : ", err);
    }
  };

  const handleSupportClick = async (amount) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await apiConnector(
        "POST",
        CREATE_ORDER_API,
        { amount },
        {
          Authorization: `Bearer ${token}`,
        },
      );

      const order = response.data.order;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,

        amount: order.amount,

        currency: order.currency,

        name: "Get Me A Chai",

        description: "Support Creator",

        order_id: order.id,

        handler: async function (response) {
          try {
            const verifyRes = await apiConnector(
              "POST",
              VERIFY_PAYMENT_API,
              {
                ...response,
                amount,
                Usermessage,
                CreatorID,
              },
              {
                Authorization: `Bearer ${token}`,
              },
            );

            if (verifyRes.data.success) {
              toast.success("Payment Successful 🎉");
              creator.refreshCreator();
              fetchSupporter();
            } else {
              toast.error("Payment Verification Failed");
            }
          } catch (error) {
            console.log("the error is :- ", error);
            toast.error("Something went wrong");
          }
        },

        theme: {
          color: "#ea580c",
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.open();
    } catch (error) {
      console.log("the error is : ", error);
    }
  };

  const profile = creator.profile || {};
  const progressPercentage =
    profile.goalAmount > 0
      ? Math.min((profile.totalReceived / profile.goalAmount) * 100, 100)
      : 100;

  const ResetTotalAmount = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await apiConnector(
        "PUT",
        RESET_TOTALAMOUNT_API,
        {},
        {
          Authorization: `Bearer ${token}`,
        },
      );
      if (res?.data?.success) {
        profile.totalReceived = 0;
        creator.refreshCreator();
      }
      setActiveModal(null);
    } catch (error) {
      console.log("the error is : ", error);
    }
  };

  const isOwner = (() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser || !CreatorID) return false;
      const user = JSON.parse(storedUser);
      return String(user._id) === String(CreatorID);
    } catch {
      return false;
    }
  })();

  return (
    <div>
      {/* Action Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
        {/* High-End Support Section */}
        <section className="bg-[#141414] border border-white/5 p-7 rounded-[2rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-orange-500/10 transition-colors"></div>

          <h2 className="text-lg font-bold mb-6 flex items-center gap-3 text-white">
            <span className="text-xl">☕</span>
            Support
          </h2>

          <div className="space-y-5">
            <div className="flex items-center justify-between bg-black/40 p-4 rounded-2xl border border-white/5">
              <span className="text-xl grayscale-[0.3]">☕</span>
              <div className="flex gap-1.5">
                {[1, 3, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => setChaiQuantity(num)}
                    className={`w-9 h-9 rounded-xl text-xs font-black transition-all duration-300 ${
                      chaiQuantity === num
                        ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20 scale-105"
                        : "bg-white/5 text-gray-500 hover:bg-white/10 hover:text-gray-300"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={chaiQuantity}
                onChange={(e) => setChaiQuantity(parseInt(e.target.value) || 1)}
                className="w-10 bg-transparent border-b border-white/10 text-center text-lg font-bold focus:outline-none focus:border-orange-500 text-white"
              />
            </div>

            <textarea
              id="supporterMessageInput"
              placeholder="Say something nice..."
              value={Usermessage}
              className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-sm text-white h-24 focus:outline-none focus:border-orange-500/50 resize-none transition-all placeholder:text-gray-700"
              onChange={(e) => setUsermessage(e.target.value)}
            ></textarea>

            <button
              onClick={() =>
                handleSupportClick(
                  chaiQuantity * Number(profile.chaiPrice || 0),
                )
              }
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black py-4 rounded-2xl shadow-xl transition-all active:scale-[0.98] uppercase tracking-widest text-xs"
            >
              Pay ₹{chaiQuantity * Number(profile.chaiPrice || 0)}
            </button>
          </div>
        </section>

        {/* Goal & Info Section */}
        <aside className="flex flex-col gap-6">
          <div className="relative bg-[#141414] border border-white/5 p-7 rounded-[2rem] shadow-xl">
            <div className="flex justify-between">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-6">
                Current Goal
              </h3>
              {isOwner && (
                <span
                onClick={() => setTotalAmountList(!TotalAmountList)}
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 hover:bg-white/10 cursor-pointer"
              >
                <HiOutlineDotsVertical className="text-gray-400" />
              </span>
              )}
            </div>
            {TotalAmountList && (
              <TotalAmountcheck
                onResetClick={() => setActiveModal("reset")}
                onEarningClick={() => setActiveModal("earning")}
              />
            )}
            <div className="flex justify-between items-end mb-3">
              <span className="text-3xl font-black text-white italic tracking-tighter">
                ₹{(profile.totalReceived || 0).toLocaleString()}
              </span>
              <span className="text-gray-500 text-[10px] font-bold mb-1">
                TARGET: ₹{(profile.goalAmount || 0).toLocaleString()}
              </span>
            </div>

            <div className="w-full bg-black/50 rounded-full h-2.5 mb-3 overflow-hidden border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-orange-600 to-orange-400 transition-all duration-1000 shadow-[0_0_15px_rgba(234,88,12,0.3)]"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-widest">
              <span>Progress</span>
              <span className="text-orange-500">
                {Math.round(progressPercentage)}%
              </span>
            </div>
          </div>

          <div className="bg-[#141414] border border-white/5 p-7 rounded-[2rem] shadow-2xl relative overflow-hidden">
            {/* Section Title */}
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500 mb-6">
              Supporters
            </h3>

            {/* Relative wrapper for Gradient Overlays */}
            {supporters.length > 0 && (
              <div className="relative">
                {/* Top Fade (Visible when scrolling down) */}
                <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-[#141414] to-transparent z-10 pointer-events-none" />

                {/* Fixed Height Scroll Container (Exactly 3 Users Visible) */}
                <div className="flex flex-col gap-3 h-[180px] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-2">
                  {supporters.map((s) => (
                    <div
                      key={s._id}
                      className="flex items-center justify-between gap-4 h-[52px] shrink-0 px-3 rounded-2xl bg-white/[0.01] border border-white/[0.02] hover:bg-white/[0.03] transition-all duration-250"
                    >
                      {/* Left: Avatar & Info */}
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative shrink-0">
                          <ProfileImage
                            src={s.sender?.profileImage}
                            alt={s.supporterName}
                            className="w-9 h-9 rounded-full object-cover bg-zinc-800 border border-white/10"
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-zinc-200 truncate">
                            {s.supporterName}
                          </p>
                          {s.Usermessage ? (
                            <p className="text-[11px] text-zinc-500 truncate max-w-[160px]">
                              {s.Usermessage}
                            </p>
                          ) : (
                            <p className="text-[11px] text-zinc-600 italic">
                              Supported
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Right: Amount */}
                      <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20 shrink-0 tracking-wide">
                        +${s.amount}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Fade (Indicates more content below) */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#141414] to-transparent z-10 pointer-events-none" />
              </div>
            )}
          </div>

          <div className="bg-orange-600/5 border border-orange-500/10 p-5 rounded-2xl border-dashed">
            <p className="text-[11px] text-orange-200/50 leading-relaxed italic text-center">
              "Supporting this creator helps them continue creating the content
              you love. 100% of your contribution goes directly to them."
            </p>
          </div>
        </aside>
      </div>
      {activeModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#141414] p-6 shadow-2xl">
            {/* Reset Modal */}
            {activeModal === "reset" && (
              <>
                <h2 className="text-xl font-bold text-white mb-3">
                  Reset Total Amount
                </h2>

                <p className="text-gray-400 mb-6">
                  Are you sure you want to reset the total amount?
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="rounded-xl border border-white/10 px-4 py-2 text-gray-300 hover:bg-white/5"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={ResetTotalAmount}
                    className="rounded-xl bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  >
                    Confirm
                  </button>
                </div>
              </>
            )}

            {/* Total Earnings Modal */}
            {activeModal === "earning" && (
              <>
                <h2 className="text-xl font-bold text-white mb-5">
                  Total Earnings
                </h2>

                <div className="rounded-2xl bg-white/5 p-5 border border-white/10">
                  <p className="text-sm text-gray-400 mb-2">Total Earnings</p>

                  <h3 className="text-3xl font-black text-white">
                    ₹{(profile.totalEarning || 0).toLocaleString()}
                  </h3>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="rounded-xl bg-white/10 px-4 py-2 text-white hover:bg-white/20"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionLayout;
