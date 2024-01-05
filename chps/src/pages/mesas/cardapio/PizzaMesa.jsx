import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPizzas } from "../../../services/redux/items/pizzasSlice";

import CardItemMesa from "../utils/CardItemMesa";
import SearchItems from "../utils/SearchItems";



function PizzaMesa() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPizzas())
    }, []);

    const { pizzas } = useSelector(state => state.pizzas);


    return (

        <>
            
            <SearchItems items={pizzas} cat={"pizzas"} />
            <div className='flex flex-col items-center pt-12 px-6 '>
                <div className='flex flex-wrap gap-2'>
                    {pizzas?.map((pizza) => {
                        return (
                            <CardItemMesa
                                key={pizza.id}
                                urlImage={pizza.imagem}
                                itemId={pizza.id}
                                itemNome={pizza.nome}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default PizzaMesa;