import { Outlet } from "react-router-dom";
import ModeratorNav from "../Components";

export default function ModeratorLayout(){
    return(
        <>
            <div className="w-full grid grid-cols-12">
                <div className="col-span-4 p-2">
                    <ModeratorNav/>
                </div>
                <div className="col-span-8 p-2">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}