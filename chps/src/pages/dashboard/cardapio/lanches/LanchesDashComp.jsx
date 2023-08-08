import { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchLanches } from "../../../../services/redux/items/lanchesSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../components/partials/Loading";

function Lanches() {

    const dispatch = useDispatch();
    const { lanches } = useSelector(state => state.lanches);

    useEffect(() => {
        dispatch(fetchLanches());
    }, [dispatch]);

    if (!lanches) {
        return <Loading />
    }
    return (

        <div className="flex flex-wrap mt-12 px-6 gap-4">
            {lanches.map((lanche) => {
                return (
                    <div key={lanche.id} className="flex flex-col justify-between max-w-[12rem] border-[1px] border-solid border-gray-300 p-2 rounded-sm shadow-xl cursor-pointer hover:scale-105 transition duration-300">
                        <Link to={`/dashboard/lanches/${lanche.id}`}>
                            <div>
                                <h2 className="text-xl font-semibold text-center">{lanche.nome}</h2>
                                <img className="object-contain" src={lanche.imagem} alt={lanche.nome} />
                                <p className="text-center">{lanche.ingredientes}</p>
                            </div>
                            <div className="flex justify-between mt-4">
                                <p className="font-semibold">valor:</p>
                                <p>R${lanche.valor}</p>
                            </div>
                        </Link>
                    </div>

                )
            })}
        </div>
    )
}


export default Lanches;