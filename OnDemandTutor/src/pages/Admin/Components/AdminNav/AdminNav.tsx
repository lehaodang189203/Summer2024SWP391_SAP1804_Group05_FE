import { useState } from "react"
import { Link } from "react-router-dom";
import BUMBUM from '../../../../assets/img/BUMBUM.png'
import { path } from "../../../../constant/path";
import { getProfileFromLS } from "../../../../utils/auth";
export default function AdminNav(){
    const option = ['DashBar','StudentList','TutorList', 'SessionList']
    const [active, setAtive] = useState("");
    const handleSetActive = (data:string)=> {
        setAtive(data)
    }
    const user =getProfileFromLS()
    return(
        <div className=" h-full p-2 grid grid-flow-row grid-rows-12">
            <Link to={path.home} className="row-span-2"> <div ><img src={BUMBUM} alt='logo' /></div></Link>
            <div className="row-span-3 m-2"><div className="border border-black inline p-2 rounded-md cursor-pointer">Trang quản trị</div></div>
            <div className="row-span-6">  
                <Link to={path.Admin.admin}><button className="text-xs mr-7 mb-4 ml-7 w-5/6 p-3 border border-black bg-white content-center justify-center hover:bg-pink-300 rounded-md"
                    onClick={()=>handleSetActive('DashBar')}>
                        Quản lí Doanh thu</button></Link>
                <Link to={path.Admin.studentlist}><button className="text-xs mr-7 mb-4 ml-7 w-5/6 p-3 border border-black bg-white content-center justify-center hover:bg-pink-300 rounded-md"
                    onClick={()=>handleSetActive('StudentList')}>
                        Danh sách học sinh</button></Link>
                <Link to={path.Admin.tutorList}><button className="text-xs mr-7 mb-4 ml-7 w-5/6 p-3 border border-black bg-white content-center justify-center hover:bg-pink-300 rounded-md"
                    onClick={()=>handleSetActive('TutorList')}>
                        Danh sách giảng viên</button>  </Link>
                <Link to={path.Admin.sessionList}><button className="text-xs mr-7 mb-4 ml-7 w-5/6 p-3 border border-black bg-white content-center justify-center hover:bg-pink-300 rounded-md"
                    onClick={()=>handleSetActive('SessionList')}>
                        Danh sách phiên học</button></Link>
            </div>
            

            <div className="row-span-1 text-center">Admin: {user.fullname}</div>
        </div>
    )
}
