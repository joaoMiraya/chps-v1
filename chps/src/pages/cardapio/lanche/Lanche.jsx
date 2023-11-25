import { lazy } from "react";

const Lanches = lazy(() => import("./Lanches"));

function Lanche() {

    return (
        <div className="py-20">
            <Lanches />
        </div>
    )
}


export default Lanche;