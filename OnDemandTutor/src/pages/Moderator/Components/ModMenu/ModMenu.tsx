import { Link } from "react-router-dom";
import { path } from "../../../../constant/path";
interface props{
    kind:string;
    style:string;
}
function ModMenu({
    kind,
    style
}:props) {
     const ListStyle = kind //=== 'list' ? 'p-5 bg-blue-500' : 'hover:bg-blue-400 p-5';//p-5 hover:bg-blue-500
    
    const Style = style //=== 'rej' ? 'bg-blue-500 p-5' : 'hover:bg-blue-400 p-5';
    if (ListStyle==='student') {// chỉ cần đọc 1 lệnh if này , else đều trả về 1 form
        if(style === 'Option1'){
            return ( <>
                <div className="flex bg-transparent justify-center  border-2 shadow-black rounded-2xl shadow-sm">
                    <Link to={path.Moderator.mod}><button className="p-5 bg-blue-500 border-2 border-black rounded-sm">Danh sách học sinh yêu cầu</button></Link>     
                    <div className="p-5">||</div>
                    <Link to={''}><button className="hover:bg-blue-400 p-5">Đơn đã từ chối</button></Link> 
                    <div></div>
                </div>
                
            </> );
        }else {
            return ( <>
                <div className="flex bg-transparent justify-center  border-2 shadow-black rounded-2xl shadow-sm">
                    <Link to={path.Moderator.mod}><button className="hover:bg-blue-400 p-5">Danh sách h yêu cầu</button></Link>     
                    <div className="p-5">||</div>
                    <Link to={path.Admin.rejectProfileRegisterTT}><button className="p-5 bg-blue-500 border-2 border-black rounded-sm">Đơn đã từ chối</button></Link> 
                    <div></div>
                </div>
                
            </> );
        }
    } else if(ListStyle==='tutor'){
        if(style === 'Option1'){
            return ( <>
                <div className="flex bg-transparent justify-center  border-2 shadow-black   rounded-2xl shadow-sm  ">
                    <Link to={path.Moderator.tutorResRegis}><button className="p-5 bg-blue-500 border-2 border-black">Danh sách yêu cầu trở thành giáo viên</button></Link>     
                    <div className="p-5">||</div>
                    <Link to={''}><button className="hover:bg-blue-400 p-5">Đơn đã từ chối</button></Link> 
                    <div></div>
                </div>
                
            </> );
        }else {
            return ( <>
                <div className="flex border border-black rounded-lg justify-center">
                    <Link to={path.Moderator.tutorResRegis}><button className={Style}>Danh sách h yêu cầu</button></Link>     
                    <div className="p-5">||</div>
                    <Link to={path.Admin.rejectProfileRegisterTT}><button className={Style}>Đơn đã từ chối</button></Link> 
                    <div></div>
                </div>
                
            </> );
        }
    }
    
}
export default ModMenu ;