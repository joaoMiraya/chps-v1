import { lazy } from "react";

const Porcoes = lazy(() => import("./utils/Porcoes"));

function Porcao() {

    return (
        <div className="pt-6">
            <h1 className="text-2xl font-semibold text-center my-6">Nossas variadas porções</h1>
            <Porcoes />
        </div>
    )
}


export default Porcao;