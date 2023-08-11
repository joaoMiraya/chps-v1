import { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchBebidas } from "../../../../services/redux/items/bebidasSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../components/partials/Loading";

function Bebidas() {

    const dispatch = useDispatch();
    const { bebidas } = useSelector(state => state.bebidas);

    useEffect(() => {
        dispatch(fetchBebidas());
    }, [dispatch]);

    if (!bebidas) {
        return <Loading />
    }
    return (

        <div className="flex flex-wrap mt-12 px-6 gap-4">
            {bebidas.map((bebidas) => {
                return (
                    <div key={bebidas.id} className="flex flex-col justify-between max-w-[12rem] border-[1px] border-solid border-gray-300 p-2 rounded-sm shadow-xl cursor-pointer hover:scale-105 transition duration-300">
                        <Link to={`/dashboard/bebidas/${bebidas.id}`}>
                            <div>
                                <h2 className="text-xl font-semibold text-center">{bebidas.nome}</h2>
                                <img className="object-contain" src={bebidas.imagem} alt={bebidas.nome} />
                                <p className="text-center">{bebidas.ingredientes}</p>
                            </div>
                            <div className="flex justify-between mt-4">
                                <p className="font-semibold">valor:</p>
                                <p>R${bebidas.valor}</p>
                            </div>
                        </Link>
                    </div>

                )
            })}
        </div>
    )
}


export default Bebidas;