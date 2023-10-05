import { Outlet } from "react-router-dom";
import Header from "./partials/Header";



function EntregaApp() {

    return (
        <>
            <Header />

            <Outlet />

        </>
    )
}

export default EntregaApp;