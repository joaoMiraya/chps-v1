import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPizzas } from "../../services/redux/items/pizzasSlice";
import { fetchLanches } from "../../services/redux/items/lanchesSlice";
import MainCompMesa from "./utils/MainCompMesa";
import { useParams } from "react-router-dom";
import MesaItems from "./MesaItems";



function MesaDetalhe() {

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPizzas(), fetchLanches())
    }, [])
    const { lanches } = useSelector(state => state.lanches);


    return (
        <>
            <div className="">
                {/* <MainCompMesa id={id} /> */}
                <MesaItems />
            </div>


        </>
    )
}

export default MesaDetalhe;