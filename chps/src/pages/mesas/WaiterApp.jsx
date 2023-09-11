import { Outlet } from "react-router-dom";
import WaiterHeader from "./utils/WaiterHeader";
import GoBackBtn from "../../components/utils/buttons/GoBackBtn";


function WaiterApp() {

    return (
        <>
            <WaiterHeader />
            <GoBackBtn />
            <Outlet />
        </>
    )
}

export default WaiterApp;