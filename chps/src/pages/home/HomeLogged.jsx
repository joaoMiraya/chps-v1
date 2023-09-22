import { lazy } from "react";

const PromoComp = lazy(() => import("./home-logged-utils/PromoComp"));
const CarouselHome = lazy(() => import("./home-logged-utils/CarouselHome"));
const Qualidades = lazy(() => import("./home-logged-utils/Qualidades"));
const Localizacao = lazy(() => import("./home-logged-utils/Localizacao"));

function HomeLogged() {

    return (
        <>
            <PromoComp />
            <CarouselHome />
            <h2 className="text-2xl font-semibold text-center my-6">Venha conhecer nosso ambiente</h2>
            <Qualidades />
            <Localizacao />
        </>


    )
}

export default HomeLogged;