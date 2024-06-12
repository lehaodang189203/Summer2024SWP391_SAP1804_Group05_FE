import { Link } from "react-router-dom";
import Input from "../../components/Input";
import { SchemaResAT, schemaResAT } from "../../utils/rulesFIle";
import { Schema, schema } from "../../utils/rules";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


type FormData = Pick<Schema, 'firstname' | 'lastname' |'number'>
const depositSchema = schema.pick(['firstname', 'lastname','number'])



export default function Deposit(){
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
      } = useForm<FormData>({
        resolver: yupResolver(depositSchema)
      })
    const onSubmit = handleSubmit((data)=>{
        console.log(data)
    })
    return(
        <div className="m-10 border-2 rounded-lg border-slate-700 p-4">
            <form onSubmit={onSubmit}>
                <h1 className="mt-4 font-bold">Nạp tiền</h1>
                <div className="m-6">
                    <div className="flex gap-2">
                        <Input
                            name="firstname"
                            type="text"
                            placeholder="Họ"
                            register={register}
                            errorMessage={errors.firstname?.message}
                        />
                        <Input
                            name="lastname"
                            type="text"
                            placeholder="Tên"
                            register={register}
                            errorMessage={errors.lastname?.message}
                        />
                    </div>
                    
                    <Input
                        name="number"
                        type="text"
                        placeholder="Số tiền cần Nạp"
                        register={register}
                        errorMessage={errors.number?.message}
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