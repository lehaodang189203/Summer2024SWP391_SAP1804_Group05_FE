import { Link, Navigate } from "react-router-dom";
import Input from "../../components/Input";

import { Schema, schema } from "../../utils/rules";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { reqDeposit } from "../../types/user.request.type";
import { useMutation } from "@tanstack/react-query";
import { paymentApi } from "../../api/payment.api";


type FormData = Pick<Schema, 'firstName' | 'lastName'| 'amount'>
const depositSchema = schema.pick(['firstName', 'lastName','amount'])
interface User {
    
}






export default function Deposit(){
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
      } = useForm<FormData>({
        resolver: yupResolver(depositSchema)
      })
    
    const depositMutation = useMutation({
        mutationFn: (body: reqDeposit) => paymentApi.deposit(body)
      })
      const onSubmit = handleSubmit((data)=>{
        console.log(data)
        depositMutation.mutate(data, {
            onSuccess: (data) => {
              console.log(data)
              
              // setIsAuthenticated(true)
              // navigate đươc dùng để điều hướng (in case này là tới thằng /)
      
              // dấu / đại diện trang hiện tại
             
            },
            onError: (error) => {
              console.log(error)
            }
        })
    })
    return(
        <div className="m-10 border-2 rounded-lg border-slate-700 p-4">
            <form onSubmit={onSubmit}>
                <h1 className="mt-4 font-bold">Nạp tiền</h1>
                <div className="m-6">
                    <div className="flex gap-2">
                        <Input
                            name="firstName"
                            type="text"
                            placeholder="Họ"
                            register={register}
                            errorMessage={errors.firstName?.message}
                        />
                        <Input
                            name="lastName"
                            type="text"
                            placeholder="Tên"
                            register={register}
                            errorMessage={errors.lastName?.message}
                        />
                    </div>
                    
                    <Input
                        name="amount"
                        type="text"
                        placeholder="Số tiền cần Nạp"
                        register={register}
                        errorMessage={errors.amount?.message}
                    />
                </div>
                <button 
                type="submit" 
                className="bg-pink-400 p-4 border border-stone-600 rounded-lg hover:bg-pink-600">
                    Xác Nhận
                </button>
            </form>
            
            
        </div>
    )
}