import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLanches } from "../../../services/redux/items/lanchesSlice";
import CardItemMesa from "../utils/CardItemMesa";
import { Link, useParams } from "react-router-dom";
import SearchItems from "../utils/SearchItems";

function LancheMesa() {
    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchLanches())
    }, []);

    const { lanches } = useSelector(state => state.lanches);

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
           
            <div className='flex flex-col items-center pt-6 px-6 '>
                <div className='flex flex-col'>
                    {Object.keys(categorias).map(categoria => (
                        <div key={categoria}>
                            <div className="flex justify-between items-end">
                                <h1 className="text-3xl font-semibold my-6">{categoria}</h1>
                            </div>
                            <div className="flex flex-col">
                                {categorias[categoria].map(lanche => (
                                    <div key={lanche.id} className="p-2 cursor-pointer">
                                        <Link tabIndex={0} aria-label={lanche.nome} to={`/mesas/${id}/pedido/lanches/${lanche.id}`}>
                                            <CardItemMesa
                                                urlImage={lanche.imagem}
                                                itemId={lanche.id}
                                                itemNome={lanche.nome}
                                            />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default LancheMesa;