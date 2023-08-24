import { lazy } from "react";

const PromoComp = lazy(() => import("./home-logged-utils/PromoComp"));

function HomeLogged() {

    return (
        <>
            <PromoComp />
            <h2 className="text-2xl font-semibold text-center my-6">Venha conhecer nosso ambiente</h2>
        </>


    )
}

export default HomeLogged;