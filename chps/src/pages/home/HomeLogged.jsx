import { lazy } from "react";
import CarouselHome from "./home-logged-utils/CarouselHome";
import Qualidades from "./home-logged-utils/Qualidades";
import Localizacao from "./home-logged-utils/Localizacao";

const PromoComp = lazy(() => import("./home-logged-utils/PromoComp"));

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