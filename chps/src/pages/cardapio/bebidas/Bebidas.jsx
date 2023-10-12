import { useDispatch, useSelector } from "react-redux";
import { fetchBebidas } from "@services/redux/items/bebidasSlice";
import { lazy, useEffect } from "react";
import { Link } from "react-router-dom";

const Loading = lazy(() => import("@components/partials/Loading"));



function Bebidas() {
    const dispatch = useDispatch();

    const { bebidas } = useSelector(state => state.bebidas);

    useEffect(() => {
        dispatch(fetchBebidas())
    }, [dispatch]);

    if (!bebidas) {
        return <Loading />
    }

    const categorias = {};
    bebidas.forEach(bebida => {
        if (!categorias[bebida.categoria]) {
            categorias[bebida.categoria] = [];
        }
        categorias[bebida.categoria].push(bebida);
    });

    return (
        <div className="pt-12 overflow-hidden">
            {Object.keys(categorias).map(categoria => (
                <div key={categoria}>
                    <div className="flex justify-between items-end">
                        <h1 className="text-3xl font-semibold pl-8 mt-6">{categoria}</h1>
                    </div>
                    <div className="flex w-full overflow-x-auto mt-6 ml-6 pr-12 space-x-2">
                        {categorias[categoria].map(bebida => (
                            <div key={bebida.id} className="cursor-pointer">
                                <Link tabIndex={0} aria-label={bebida.nome} to={`/menu/bebidas/${bebida.id}`}>
                                    <div className="rounded-xl shadow-xl flex justify-center items-center border-[1px] w-[10rem] h-[10rem] border-solid border-gray-300">
                                        <img className="object-contain  w-[8rem] h-[8rem]" src={bebida.imagem} alt={bebida.nome} />
                                    </div>
                                    <div className="flex flex-col gap-2 mt-2">
                                        <h2 className="text-start">{bebida.nome}</h2>
                                        <p className="font-semibold text-sm">R${(bebida.valor.replace(".", ","))}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )

}

export default Bebidas;