import { lazy } from "react";

const Lanches = lazy(() => import("./Lanches"));

function Lanche() {

    return (
        <div>

            <h1>lanches</h1>

            <Lanches />
        </div>
    )
}


export default Lanche;