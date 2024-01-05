import { Link, useParams } from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchLanches } from "@services/redux/items/lanchesSlice";

const CardItemMesa = lazy(() => import("../utils/CardItemMesa"));
const SearchItems = lazy(() => import("../utils/SearchItems"));

function LancheMesa() {

    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchLanches())
    }, [dispatch]);

    const [category, setCategory] = useState('Hamburguer');

    const { lanches } = useSelector(state => state.lanches);
    const categoryBurg = lanches.filter(lanche => lanche.categoria === category);

    const categorias = {};
    lanches.forEach(lanche => {
        if (!categorias[lanche.categoria]) {
            categorias[lanche.categoria] = [];
        }
        categorias[lanche.categoria].push(lanche);
    });

    return (
        <>
            <SearchItems items={lanches} cat={"lanches"} />

            <div className='flex flex-col pt-6 '>
                <span className="w-screen px-6 bg-stone-200 flex items-center gap-4 overflow-x-scroll scroll-smooth shadow-inner">
                    {Object.keys(categorias).map((categoria, i) => {
                        return (
                            <button onClick={() => setCategory(categoria)} className={`whitespace-nowrap pt-2 font-semibold ${category === categoria ? 'bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-600' : 'text-gray-500'} `} key={i}>{categoria}</button>
                        )
                    })}
                </span>
                <div className="flex flex-wrap px-4">
                    {categoryBurg.map((lanche) => {
                        return (
                            <div key={lanche.id} className="p-2 cursor-pointer">
                                <Link tabIndex={0} aria-label={lanche.nome} to={`/mesas/${id}/pedido/lanches/${lanche.id}`}>
                                    <CardItemMesa
                                        urlImage={lanche.imagem}
                                        itemId={lanche.id}
                                        itemNome={lanche.nome}
                                    />
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default LancheMesa;