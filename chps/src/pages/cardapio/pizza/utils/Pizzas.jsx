import { lazy, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchPizzas } from "@services/redux/items/pizzasSlice";

const Loading = lazy(() => import("@components/partials/Loading"));

function Pizzas() {

    const dispatch = useDispatch();
    const { pizzas } = useSelector(state => state.pizzas)

    useEffect(() => {
        dispatch(fetchPizzas())
    }, [dispatch])

    if (!pizzas) {
        return <Loading />
    }
    return (

        <div className="flex justify-center flex-wrap gap-4">
            {pizzas.map((pizza) => {

                return (
                    <Link aria-label={pizza.nome} tabIndex={0} to={`/menu/pizzas/${pizza.id}`} key={pizza.id} className=" w-[10rem] cursor-pointer">

                        <img className="h-[8rem] min-w-[10rem] rounded-md shadow-md " src={pizza.imagem} alt={pizza.nome} />
                        <p className="text-start font-semibold mt-2">{pizza.nome}</p>
                        <p className="text-start">R$ {(pizza.valorF).replace(".", ",")}</p>
                    </Link>
                )
            })}
        </div>
    )
}

export default Pizzas;