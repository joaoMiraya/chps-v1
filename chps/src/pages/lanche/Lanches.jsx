import { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchLanches } from "../../services/redux/items/lanchesSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/partials/Loading";

function Lanches() {

    const dispatch = useDispatch();
    const { lanches } = useSelector(state => state.lanches);

    useEffect(() => {
        dispatch(fetchLanches());
    }, [dispatch]);

    if (!lanches) {
        return <Loading />
    }

    const categorias = {};
    lanches.forEach(lanche => {
        if (!categorias[lanche.categoria]) {
            categorias[lanche.categoria] = [];
        }
        categorias[lanche.categoria].push(lanche);
    });

    return (
        <div className="overflow-x-hidden">
            {Object.keys(categorias).map(categoria => (
                <div key={categoria}>
                    <h1 className="text-3xl font-semibold pl-8 mt-6">{categoria}</h1>
                    <div className="flex w-full overflow-x-auto mt-6 px-6 space-x-2">
                        {categorias[categoria].map(lanche => (
                            <div key={lanche.id} className="p-2 cursor-pointer">
                                <Link to={`/menu/lanches/${lanche.id}`}>
                                    <div className="rounded-xl shadow-xl border-[1px] w-[10rem] border-solid border-gray-300">
                                        <img className="object-contain" src={lanche.imagem} alt={lanche.nome} />
                                    </div>
                                    <div className="flex flex-col gap-2 mt-2">
                                        <h2 className="text-start">{lanche.nome}</h2>
                                        <p className="font-semibold text-sm">R${lanche.valor}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

}


export default Lanches;