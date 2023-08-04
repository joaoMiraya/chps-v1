import { Outlet } from "react-router-dom";
import DashHeader from "./components/DashHeader";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DashApp() {


    return (
        <>
            <DashHeader />
            <div>
                <ToastContainer position="top-right" autoClose={3000} />
                <Outlet></Outlet>

            </div>
        </>
    )
}


export default DashApp;