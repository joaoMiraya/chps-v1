import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPorcoes } from "../../../services/redux/items/porcoesSlice";
import { Link } from "react-router-dom";


function Porcoes() {

    const dispatch = useDispatch();
    const { porcoes } = useSelector(state => state.porcoes);

    useEffect(() => {
        dispatch(fetchPorcoes())
    }, [dispatch])

    return (

        <div className="flex justify-center flex-wrap gap-4">
            {porcoes.map((porcao) => {
                return (
                    <Link aria-label={porcao.nome} tabIndex={0} to={`/menu/porcoes/${porcao.id}`} key={porcao.id} className=" w-[10rem] cursor-pointer">
                        <img className="h-[8rem] min-w-[10rem] rounded-md " src={porcao.imagem} alt={porcao.nome} />
                        <p className="text-start font-semibold my-2">{porcao.nome}</p>
                        <p className="text-start">R$ {(porcao.valorM).replace(".", ",")}</p>
                        <p className="text-start">R$ {(porcao.valorI).replace(".", ",")}</p>
                    </Link>
                )
            })}
        </div>
    )
}


export default Porcoes;