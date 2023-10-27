import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCheck } from 'react-icons/ai';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchBebidas } from "@services/redux/items/bebidasSlice";

function BebidasSection() {
    const dispatch = useDispatch();

    const { bebidas } = useSelector((state) => state.bebidas);

    useEffect(() => {
        dispatch(fetchBebidas());
    }, [dispatch]);

    return (
        <>
            <h2 className="text-3xl font-semibold self-start mb-4">Bebidas</h2>

            <div className="flex container overflow-x-scroll ">
                <div className="flex gap-2 mb-4">
                    {bebidas.map((bebida) => {
                        return (

                            <Link to={`/menu/bebidas/${bebida.id}`} key={bebida.id} aria-label={`Ir para ${bebida.nome}`} className="w-[8rem] md:w-[14rem] md:h-[14rem] cursor-pointer rounded-md relative" >
                                <span className="hidden absolute top-0 right-0"><AiOutlineCheck className="bg-[#98FB98] rounded-md text-white text-xl" /></span>
                                <img className="rounded-md shadow-xl border-[1px] mr-4 border-solid h-[8rem] border-gray-300" src={bebida.imagem} alt="nome do lanche" />
                                <div className=" text-start p-2 ">
                                    <h2 className=" font-medium text-md">{bebida.nome}</h2>
                                    <h2 className="text-start mt-2 font-semibold">R$ {(bebida.valor.replace(".", ","))}</h2>
                                </div>
                            </Link>

                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default BebidasSection;