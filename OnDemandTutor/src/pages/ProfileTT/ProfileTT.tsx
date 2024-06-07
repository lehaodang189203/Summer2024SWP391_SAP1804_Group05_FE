import { useEffect, useState } from "react"
import http from "../../utils/http";

export default function ProfileTT(){
    const [user,setUser] = useState({});
    const [isUserUpdate,setIsUserUpdate] = useState(false);
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
        <div className="">
        </div>
    )

}