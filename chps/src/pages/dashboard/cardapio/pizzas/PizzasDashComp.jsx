import { lazy, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPizzas } from "@services/redux/items/pizzasSlice";
import { useDispatch, useSelector } from "react-redux";

const Loading = lazy(() => import("@components/partials/Loading"));

function Pizzas() {

    const dispatch = useDispatch();
    const { pizzas } = useSelector(state => state.pizzas);

    useEffect(() => {
        dispatch(fetchPizzas());
    }, [dispatch]);

    if (!pizzas) {
        return <Loading />
    }
    return (

        <div className="flex flex-wrap mt-12 px-6 gap-4">
            {pizzas.map((pizza) => {
                return (
                    <div key={pizza.id} className="flex flex-col justify-between max-w-[12rem] border-[1px] border-solid border-gray-300 p-2 rounded-sm shadow-xl cursor-pointer hover:scale-105 transition duration-300">
                        <Link to={`/dashboard/pizzas/${pizza.id}`}>
                            <div>
                                <h2 className="text-xl font-semibold text-center my-2">{pizza.nome}</h2>
                                <img className="object-contain" src={pizza.imagem} alt={pizza.nome} />
                                <p className="text-center">{pizza.ingredientes}</p>
                            </div>
                            <div className="flex justify-between mt-4">
                                <p className="font-semibold">Valor P:</p>
                                <p>R${pizza.valorP}</p>
                            </div>
                            <div className="flex justify-between mt-4">
                                <p className="font-semibold">Valor F:</p>
                                <p>R${pizza.valorF}</p>
                            </div>
                        </Link>
                    </div>

                )
            })}
        </div>
    )
}


export default Pizzas;