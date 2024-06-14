import { Outlet } from "react-router-dom";
import Search from "../../../../components/Search/Search";
import TurorMenu from "../AdminMenu/TutorMenu";
import { useState } from "react";

function AdminRejectRegister() {
    const [searchText, setSearchText] = useState('');
    return ( <>
        <div>
            <div className="text-left">Quản lí đơn đã bị từ chối</div>
            <TurorMenu/>
            <div className="m-10 text-left">
                <Search
                inputText={searchText}
                placeHolder="Search đi nè"
                setInputValue={setSearchText}
                label="Q"/>
                <Outlet/>
            </div>
            
        </div>
    </> );
}

export default AdminRejectRegister;