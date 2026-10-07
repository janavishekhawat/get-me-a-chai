"use client"; // for client-side rendering

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ENDPOINTS } from "@/services/api";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(ENDPOINTS.GET_USER_PAYMENTS, {
          headers: { Authorization: `Bearer ${token}` },
        }); // backend endpoint
        console.log("This is the fetch payment api response : ", res)
        setPayments(res.data.payments); // assume backend returns { payments: [...] }
        console.log("This is the payment response ",res.data.payments);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);
  

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="bg-[#3B2A1B] p-10 px-20">
      <div className="bg-chai-body h-[80vh] rounded-2xl p-5 overflow-y-auto">
        <h3 className="text-2xl mb-6 text-[#3B2A1B] text-center font-bold">
          Your Payment History
        </h3>

        {payments.length === 0 ? (
          <p className="text-center text-[#3B2A1B]">
            You haven't supported anyone yet.
          </p>
        ) : (
          payments
          ?.slice()
          .sort((a, b) => new Date(b.date) - new Date(a.date)).map((payment, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-[#3B2A1B] text-white px-5 py-3 rounded-xl mb-3"
            >
              {/* Creator Name */}
              <span className="font-semibold">{payment.creatorName}</span>

              {/* Amount */}
              <span className="font-bold">₹{payment.amount}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
