import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";

function Payment() {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: paymentId = {}, isLoading } = useQuery({
    queryKey: ["loan-data", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`loan/${id}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    try {
      const loanInfo = {
        cost: 10,
        loanID: id,
        userEmail: paymentId.userEmail,
      };
      const res = await axiosInstance.post(
        "/create-checkout-session",
        loanInfo
      );
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error("Payment failed", err);
    }
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Application Fee</h2>
        <p className="text-sm text-gray-500">Loan ID: {id}</p>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <span className="text-gray-600">Property Address:</span>
          <span className="font-medium text-gray-900">{paymentId.address}</span>
        </div>
        <div className="flex justify-between mb-6">
          <span className="text-gray-600">Amount to Pay:</span>
          <span className="text-2xl font-bold text-green-600">$10.00</span>
        </div>
        <button 
            onClick={handlePayment}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition shadow-md"
          >
            Pay Application Fee
          </button>
      </div>
      
    </div>
  );
}

export default Payment;
