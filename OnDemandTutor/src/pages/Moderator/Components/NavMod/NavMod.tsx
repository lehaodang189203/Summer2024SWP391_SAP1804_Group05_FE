import { useState } from "react"
import { Link } from "react-router-dom";
import BUMBUM from '../../../../assets/img/BUMBUM.png'
import { path } from "../../../../constant/path";
export default function NavMod(){
    const option = ['DashBar','StudentList','TutorList', 'SessionList']
    const [active, setAtive] = useState("");
    const handleSetActive = (data:string)=> {
        setAtive(data)
    }
    return(
        <div className=" h-full p-2 grid grid-flow-row grid-rows-12">
            <div className="row-span-1"><img src={BUMBUM} alt='logo' /></div>
            <div className="row-span-2 m-2 pt-10"><div className="border shadow-lg inline p-2 rounded-md cursor-pointer">Trang Kiểm Duyệt Viên</div></div>
            <div className="row-span-8">  
                <Link to={path.Moderator.mod}><button className="text-xs mr-7 mb-4 ml-7 w-5/6 p-3 border border-black bg-white content-center justify-center hover:bg-pink-300 rounded-md"
                    onClick={()=>handleSetActive('student')}>
                        Quản lí Học sinh</button></Link>
                <Link to={path.Moderator.tutorResRegis}><button className="text-xs mr-7 mb-4 ml-7 w-5/6 p-3 border border-black bg-white content-center justify-center hover:bg-pink-300 rounded-md"
                    onClick={()=>handleSetActive('tutor')}>
                        Quản lí Gia Sư</button></Link>
               
            </div>
            

            <div className="row-span-1 text-center">Modirator: Thành Phạm</div>
        </div>
    )
}