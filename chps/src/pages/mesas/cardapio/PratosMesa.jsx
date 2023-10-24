import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPratos } from "@services/redux/items/pratosSlice";


import CardItemMesa from "../utils/CardItemMesa";
import SearchItems from "../utils/SearchItems";
function PratosMesa() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPratos())
    }, []);

    const { pratos } = useSelector(state => state.pratos);


    return (

        <>
            <SearchItems items={pratos} cat={"pratos"} />
            <div className='flex flex-col items-center pt-12 px-6 '>
                <div className='flex flex-wrap gap-2'>
                    {pratos?.map((prato) => {
                        return (
                            <CardItemMesa
                                key={prato.id}
                                urlImage={prato.imagem}
                                itemId={prato.id}
                                itemNome={prato.nome}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default PratosMesa;