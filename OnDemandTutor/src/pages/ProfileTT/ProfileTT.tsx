import { useEffect, useState } from "react"
import http from "../../utils/http";
import { Link } from "react-router-dom";
import Input from "../../components/Input";

export default function ProfileTT(){
    const [user,setUser] = useState({});
    const [isUserUpdate,setIsUserUpdate] = useState(false);
    const [activeTab, setActiveTab] = useState('account');
    useEffect(()=>{
        
        const getProfileData = async () =>{
        try {
            const {data} = await http.get('url',{})
            setUser(data)
            setIsUserUpdate(false)

        } catch (error) {
            console.log('loi me r')
        }
        getProfileData()
    }
    },[isUserUpdate,])

    return(
        <div className="flex justify-center mt-10 ">
            <div className="container grid grid-cols-12 gap-4">
                <div className="col-span-3 ">
                    <div className="rounded-md border-gray-950 border bg-slate-300 hover:bg-slate-400"><Link to={'#'} onClick={()=>{setActiveTab('account')}}
                        className=" w-60 block p-1"
                        >Tài Khoản</Link></div>
                    <div className="mt-2 rounded-md border-gray-950 border bg-slate-300 hover:bg-slate-400"><Link to={'#'} onClick={()=> {setActiveTab('Password')}}
                        className=" w-60 block p-1  "
                        >Cài lại Mật Khẩu</Link></div>
                    <div className="mt-2 rounded-md border-gray-950 border bg-slate-300 hover:bg-slate-400"><Link to={'#'} onClick={()=>{setActiveTab('Email')}}
                        className=" w-60 block p-1"
                        >Email</Link></div>
                </div>
                <div className="right col-span-9">
                    {
                    activeTab === 'account' &&(
                        <div className="border border-slate-400 rounded-lg drop-shadow-lg shadow-md">
                            <div> <img src="" alt="" />Avartar</div>
                            <div>
                                <div>First Name</div>
                                <div>2</div>r
                                <div>3</div>
                                <div>4</div>
                                <div>5</div>
                                <div>6</div>
                            </div>
                            
                        </div>
                    )       
                    }  
                    {
                    activeTab === 'Password' &&(
                        <div className="border border-slate-400 rounded-lg drop-shadow-lg shadow-md">
                            
                            <div>
                                <div>Set Password</div>
                                <div>2</div>
                                <div>4</div>
                                <div>5</div>
                                <div>7</div>
                                <div>9</div>
                                
                            </div>
                            
                        </div>
                    )       
                    }
                    {
                    activeTab === 'Email' &&(
                        <div className="border border-slate-400 rounded-lg drop-shadow-lg shadow-md">
                            <div>
                                <div>Email</div>
                                <div>4</div>
                                <div>5</div>
                                <div>7</div>
                                <div>8</div>
                            </div>
                            
                        </div>
                    )       
                    }
                </div>
            </div>
        </div>
        
    )

}