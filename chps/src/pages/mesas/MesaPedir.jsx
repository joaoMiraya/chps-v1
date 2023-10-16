import { useParams } from "react-router-dom";

import MainCompMesa from "./utils/MainCompMesa";


function MesaPedir() {

    const { id } = useParams();

    return (

        <>
            <MainCompMesa id={id} />
        </>
    )
}

export default MesaPedir;