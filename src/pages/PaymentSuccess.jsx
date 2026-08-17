import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#f4f4f4]">
      <div className="text-center p-[30px] max-w-[400px] rounded-[10px] shadow-[0_4px_10px_rgba(0,0,0,0.1)] bg-white mx-4">
        <FaCheckCircle className="text-[60px] text-[#52c41a] mb-[20px] mx-auto" />
        <h2 className="font-bold text-[16px] mb-[5px] text-[#333]">
          Payment Successful!
        </h2>
        <p className="text-[16px] mb-[20px] block text-gray-600">
          Thank you for your payment. Your transaction has been completed.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
