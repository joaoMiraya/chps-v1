import { useEffect } from "react";
import { fetchPizzas } from "../../../services/redux/items/pizzasSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/partials/Loading";
import { Link } from "react-router-dom";


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
                    <Link to={`/menu/pizzas/${pizza.id}`} key={pizza.id} className=" w-[10rem] rounded-b-xl shadow-2xl">
                        <img className="h-[8rem] min-w-[10rem] rounded-t-xl" src={pizza.imagem} alt={pizza.nome} />
                        <p className="text-center font-semibold my-2">{pizza.nome}</p>
                    </Link>
                )
            })}
        </div>
    )
}

export default Pizzas;