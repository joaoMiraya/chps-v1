import { Outlet } from "react-router-dom";
import WaiterHeader from "./utils/WaiterHeader";
import GoBackBtn from "../../components/utils/buttons/GoBackBtn";
import { ToastContainer } from "react-toastify";


function WaiterApp() {

    return (
        <>
            <WaiterHeader />
            <main className="bg-gray-100">
                <ToastContainer position="top-right" autoClose={3000} />

                <GoBackBtn />
                <Outlet />
            </main>
        </>
    )
}

export default WaiterApp;