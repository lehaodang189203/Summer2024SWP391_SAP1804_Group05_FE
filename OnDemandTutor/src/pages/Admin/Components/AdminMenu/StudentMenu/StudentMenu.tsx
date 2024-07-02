import { Link } from "react-router-dom";
import { path } from "../../../../../constant/path";
interface props{
    list:string;
    req:string;
    app:string;
    rej:string;
}

export default function StudentMenu({
    list,
    req,
    app,
    rej
}:props) {
    const ListStyle = list === 'list' ? 'p-5 bg-blue-500' : 'hover:bg-blue-400 p-5';//p-5 hover:bg-blue-500
    const reqStyle = req === 'req' ? 'p-5 bg-blue-500' : 'hover:bg-blue-400 p-5';
    const appStyle = app === 'app' ? 'bg-blue-500 p-5' : 'hover:bg-blue-400 p-5';
    const rejStyle = rej === 'rej' ? 'bg-blue-500 p-5' : 'hover:bg-blue-400 p-5';
    return ( <>
        <div className="flex bg-transparent justify-center  border-2 shadow-black rounded-2xl shadow-sm">
            <Link to={path.Admin.studentlist}><button className={ListStyle}>Danh sách Học sinh</button></Link>     
            <div className="p-5">||</div>
            <Link to={path.Admin.adminStudentReq}><button className={reqStyle}>Danh sách yêu cầu của học sinh</button></Link>
            <div className="p-5">||</div>
            <Link to={path.Admin.adminStudentReqApproved}><button className={appStyle}>Đơn đã chấp nhận</button></Link> 
            <div className="p-5">||</div>
            <Link to={path.Admin.adminStudentReqRejected}><button className={rejStyle}>Đơn đã từ chối</button></Link>
            <div></div>
        </div>
        </>
    )  
}