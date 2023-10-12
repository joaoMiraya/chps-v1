import { Link, useParams } from "react-router-dom";
import { fetchLanches } from "@services/redux/items/lanchesSlice";
import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Loading = lazy(() => import("@components/partials/Loading"));

function TodosLanches() {

    const { cat } = useParams();
    const dispatch = useDispatch();
    const { lanches } = useSelector(state => state.lanches);

    useEffect(() => {
        dispatch(fetchLanches());
    }, [dispatch]);


    if (!lanches) {
        return <Loading />
    }

    const lanchesFiltrados = lanches.filter(lanche => lanche.categoria === cat);

    return (
        <div className="pt-12">
            <h1 className="text-xl font-semibold  text-center">Todos os lanches de {cat}</h1>

            <div className="flex w-full flex-wrap mt-6 justify-center">
                {lanchesFiltrados.map(lanche => (
                    <div key={lanche.id} className="p-2 cursor-pointer">
                        <Link to={`/menu/lanches/${lanche.id}`}>
                            <div className="rounded-xl shadow-xl border-[1px] w-[10rem] border-solid border-gray-300">
                                <img className="object-contain" src={lanche.imagem} alt={lanche.nome} />
                            </div>
                            <div className="flex flex-col gap-2 mt-2">
                                <h2 className="text-start">{lanche.nome}</h2>
                                <p className="font-semibold text-sm">R${(lanche.valor.replace(".", ","))}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TodosLanches;