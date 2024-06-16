import { Link } from "react-router-dom";
import path from "../../../../constant/path";
interface props{
    list:string;
    rej:string;
}
function ModMenu({
    list,
    rej
}:props) {
    const ListStyle = list === 'list' ? 'p-5 bg-blue-500' : 'hover:bg-blue-400 p-5';//p-5 hover:bg-blue-500
    
    const rejStyle = rej === 'rej' ? 'bg-blue-500 p-5' : 'hover:bg-blue-400 p-5';
    return ( <>
        <div className="flex border border-black rounded-lg justify-center">
            <Link to={path.Moderator.mod}><button className={ListStyle}>Danh sách sinh viên yêu cầu</button></Link>     
            <div className="p-5">||</div>
            <Link to={path.Admin.rejectProfileRegisterTT}><button className={rejStyle}>Đơn đã từ chối</button></Link> 
            <div></div>
        </div>
        
    </> );
}
export default ModMenu ;