import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchPratos } from "../../services/redux/items/pratosSlice";
import Loading from "../../components/partials/Loading";

function Pratos() {

    const dispatch = useDispatch();
    const { pratos } = useSelector(state => state.pratos);

    useEffect(() => {
        dispatch(fetchPratos());
    }, [dispatch]);

    if (!pratos) {
        return <Loading />
    }


    return (
        <div className="flex justify-center flex-wrap gap-4">
            {pratos.map((prato) => {
                return (
                    <Link aria-label={prato.nome} tabIndex={0} to={`/menu/pratos/${prato.id}`} key={prato.id} className=" w-[10rem] cursor-pointer">
                        <img className="h-[8rem] min-w-[10rem] rounded-md shadow-md" src={prato.imagem} alt={prato.nome} />
                        <p className="text-start font-semibold mt-2">{prato.nome}</p>
                        <p className="text-start">R$ {(prato.valor).replace(".", ",")}</p>
                    </Link>
                )
            })}
        </div>
    );

}


export default Pratos;