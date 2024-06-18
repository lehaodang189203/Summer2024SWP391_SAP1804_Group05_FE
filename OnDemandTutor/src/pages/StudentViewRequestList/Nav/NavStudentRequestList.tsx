import { Link } from "react-router-dom";
import { path } from "../../../constant/path";

function 

NavStudentRequestList() {
    return (<>
        <div className="flex justify-between p-5 border-2 shadow-xl mb-5">
                <Link to={path.studentViewRequestList}><div className="text-base font-bold cursor-pointer hover:text-pink-600 py-1 relative after:absolute after:bottom-0 after:left-0
                                    after:bg-pink-600 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:ease-in-out after:duration-100">
                                        Xem đanh sách đang duyệt</div></Link>
                <Link to={path.RequestStudentCurrent}><div className="text-base font-bold cursor-pointer hover:text-pink-600 py-1 relative after:absolute after:bottom-0 after:left-0
            after:bg-pink-600 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:ease-in-out after:duration-100">
                Xem đanh sách bị từ chối</div></Link>
                <Link to={path.RequestStudentCurrent}><div className="text-base font-bold cursor-pointer hover:text-pink-600 py-1 relative after:absolute after:bottom-0 after:left-0
            after:bg-pink-600 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:ease-in-out after:duration-100">
                Xem đanh sách đang hiện hành</div></Link>
            </div>
    </>);
}

export default NavStudentRequestList;