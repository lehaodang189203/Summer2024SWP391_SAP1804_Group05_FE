import React, { useState } from "react";
import { reqDeposit } from "../../types/user.request.type";
import { paymentApi } from "../../api/payment.api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProfileFromLS } from "../../utils/auth";
const User = getProfileFromLS()
export default function Deposit() {
    const [fullName, setFullName] = useState<string>("");
    const [amount, setAmount] = useState<number>(10000);
    const navigate = useNavigate();
    const depositMutation = useMutation({
        mutationFn: (body: reqDeposit) => paymentApi.deposit(body)
      })
    // const depositMutation = useMutation({
    //     mutationFn: (body: reqDeposit) => paymentApi.deposit(body),
    //     onSuccess: (data:any) => {
    //         console.log('data trả về ',data)
    //         if (data.success) {
    //             window.location.href = data.data;
    //         } else {
    //             alert(data.message || "Có lỗi xảy ra, vui lòng thử lại.");
    //         }
    //     },
    //     onError: (error:any) => {
    //         console.log(error);
    //         alert("Có lỗi xảy ra, vui lòng thử lại.");
    //     }
    // });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const data: reqDeposit = {
            id : User.id,
            amount: amount
        };
        console.log('data gửi vào ', data)
        depositMutation.mutate(data,{
            onSuccess: data => {
                console.log('onsuccess')
                console.log('data res',data)
                toast.success("Đang chuyển trang")
                // làm sao chuyển trang trực tiếp qua data.data
                window.location.href = data.data
              
            // Sử dụng navigate để chuyển đến URL tương đối
            
            },
            onError: error => {
                console.log(error)
                alert("Có lỗi xảy ra, vui lòng thử lại.");
            }
        });
        console.log(data)
    };

    return (
        <div className="max-w-md mx-auto my-4 bg-white p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Nạp Tiền</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Tên đầy đủ:
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
            required
          />
        </div> */}

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Mệnh giá:
          </label>
          <select
            id="amount"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
            required
          >
            <option value={10000}>10,000 VND</option>
            <option value={20000}>20,000 VND</option>
            <option value={50000}>50,000 VND</option>
            <option value={100000}>100,000 VND</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
          >
            Nạp Tiền
          </button>
        </div>
      </form>
    </div>
    );
}