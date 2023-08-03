import { Outlet } from "react-router-dom";
import DashHeader from "./components/DashHeader";

function DashApp() {


    return (
        <>
            <DashHeader />
            <div>
                <Outlet></Outlet>

            </div>
        </>
    )
}


export default DashApp;