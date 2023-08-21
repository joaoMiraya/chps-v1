import { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPratos } from "../../../../services/redux/items/pratosSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../components/partials/Loading";

function PratosDashComp() {

    const dispatch = useDispatch();
    const { pratos } = useSelector(state => state.pratos);

    useEffect(() => {
        dispatch(fetchPratos());
    }, [dispatch]);

    if (!pratos) {
        return <Loading />
    }
    return (

        <div className="flex flex-wrap mt-12 px-6 gap-4">
            {pratos.map((prato) => {
                return (
                    <div key={prato.id} className="flex flex-col justify-between max-w-[12rem] border-[1px] border-solid border-gray-300 p-2 rounded-sm shadow-xl cursor-pointer hover:scale-105 transition duration-300">
                        <Link to={`/dashboard/pratos/${prato.id}`}>
                            <div>
                                <h2 className="text-xl font-semibold text-center">{prato.nome}</h2>
                                <img className="object-contain" src={prato.imagem} alt={prato.nome} />
                                <p className="text-center">{prato.ingredientes}</p>
                            </div>
                            <div className="flex justify-between mt-4">
                                <p className="font-semibold">valor:</p>
                                <p>R${prato.valor}</p>
                            </div>
                        </Link>
                    </div>

                )
            })}
        </div>
    )
}


export default PratosDashComp;