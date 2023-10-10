import { Outlet } from "react-router-dom";
import Header from "./partials/Header";
import GoBackBtn from "../../components/utils/buttons/GoBackBtn";



function EntregaApp() {

    return (
        <>
            <Header />
            <GoBackBtn />
            <Outlet />

        </>
    )
}

export default EntregaApp;