import { lazy } from "react";
import { useParams } from "react-router-dom";

const MainCompMesa = lazy(() => import("./utils/MainCompMesa"));

function MesaPedir() {

    const { id } = useParams();


    return (

        <>
            <div className="py-12">
                <MainCompMesa id={id} />

            </div>
        </>
    )
}

export default MesaPedir;