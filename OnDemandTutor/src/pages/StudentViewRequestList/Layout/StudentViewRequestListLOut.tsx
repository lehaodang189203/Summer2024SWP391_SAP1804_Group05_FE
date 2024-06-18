import { Outlet } from "react-router-dom";
import NavStudentRequestList from "../Nav/NavStudentRequestList";
import { Footer, Header } from "antd/es/layout/layout";

function StudentViewRequestListLOut() {
    return ( <>
        <div className="w-4/5">
            <NavStudentRequestList/>
            <div className=" border-2 shadow-xl"><Outlet/></div>
        </div>
    </> );
}

export default StudentViewRequestListLOut ;