import { lazy, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPorcoes } from "../../../../services/redux/items/porcoesSlice";

const Loading = lazy(() => import("../../../../components/partials/Loading"));

function PorcoesDashComp() {

    const dispatch = useDispatch();
    const { porcoes } = useSelector(state => state.porcoes);

    useEffect(() => {
        dispatch(fetchPorcoes());
    }, [dispatch]);
    console.log(porcoes);
    if (!porcoes) {
        return <Loading />
    }
    return (

        <div className="flex flex-wrap mt-12 px-6 gap-4">
            {porcoes.map((porcao) => {
                return (
                    <div key={porcao.id} className="flex flex-col justify-between max-w-[12rem] border-[1px] border-solid border-gray-300 p-2 rounded-sm shadow-xl cursor-pointer hover:scale-105 transition duration-300">
                        <Link to={`/dashboard/porcoes/${porcao.id}`}>
                            <div>
                                <h2 className="text-xl font-semibold text-center">{porcao.nome}</h2>
                                <img className="object-contain" src={porcao.imagem} alt={porcao.nome} />
                                <p className="text-center">{porcao.ingredientes}</p>
                            </div>
                            <div className="flex justify-center mt-4">
                                <p>Meia R${porcao.valorM}</p>
                                <p>Inteira R${porcao.valorI}</p>
                            </div>
                        </Link>
                    </div>

                )
            })}
        </div>
    )
}


export default PorcoesDashComp;