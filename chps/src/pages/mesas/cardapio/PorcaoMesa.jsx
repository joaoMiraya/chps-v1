import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CardItemMesa from "../utils/CardItemMesa";
import SearchItems from "../utils/SearchItems";
import { fetchPorcoes } from "@services/redux/items/porcoesSlice";


function PorcaoMesa() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPorcoes())
    }, []);

    const { porcoes } = useSelector(state => state.porcoes);


    return (

        <>
            <SearchItems items={porcoes} cat={"porcoes"} />
            <div className='flex flex-col items-center pt-12 px-6 '>
                <div className='flex flex-wrap gap-2'>
                    {porcoes?.map((porcao) => {
                        return (
                            <CardItemMesa
                                key={porcao.id}
                                urlImage={porcao.imagem}
                                itemId={porcao.id}
                                itemNome={porcao.nome}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default PorcaoMesa;