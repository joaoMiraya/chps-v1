import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { fetchBebidas } from "../../services/redux/items/bebidasSlice";
import { addToCart } from "../../services/redux/cart/cartSlice";

import Loading from "../../components/partials/Loading";
import IncresDecresBtn from "../../components/utils/buttons/IncresDecresBtn";
import BebidasSection from "../../components/utils/cards/BebidasSection";
import ButtonAddFixo from "../../components/utils/cards/detalhes/ButtonAddFixo";




function BebidasDetalhes() {

    const { id } = useParams();
    const dispatch = useDispatch();



    const { bebidas } = useSelector(state => state.bebidas);
    const bebida = bebidas.find((bebida) => bebida.id === id);
    const [isSuco, setIsSuco] = useState(false);

    useEffect(() => {
        dispatch(fetchBebidas());
    }, [dispatch]);

    const [qnt, setQnt] = useState(1);
    const [valorTotal, setValorTotal] = useState(0);

    useEffect(() => {
        if (bebida) {
            const { categoria, valor } = bebida;
            setValorTotal(valor)
            categoria == "Suco" ? setIsSuco(true) : setIsSuco(false)
            const valorInCents = Math.round(valor * 100);
            const valorTotal = (valorInCents / 100)
            const valorFinal = valorTotal * qnt
            setValorTotal(valorFinal.toFixed(2))
        } else {
            return
        }
    }, [bebida, qnt]);

    const handleAddToCart = () => {
        let values = {
            id: id,
            idPedido: id + Date.now(),
            nome: bebida.nome,
            classe: bebida.classe,
            valor: valorTotal,
            qnt: qnt
        };
        dispatch(addToCart(values))
    };


    if (!bebida) {
        return <Loading />
    }
    return (
        <>
            <div className="p-4 w-full overflow-hidden">

                <div className="my-4">
                    <h1 className="text-3xl font-semibold">{bebida.nome}</h1>
                    <span>Sub-total: {String(valorTotal).replace(".", ",")}</span>
                </div>
                <div className="">
                    <img src={bebida.imagem} alt={bebida.nome} />
                </div>
                <div className="flex flex-col items-center my-4 ">
                    <IncresDecresBtn qnt={qnt} setQnt={setQnt} />
                    <div className={`${isSuco ? 'block' : 'hidden'}`}>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                            <label className="form-check-label" htmlFor="defaultCheck1">
                                Sem Açúcar
                            </label>
                        </div>
                    </div>
                    <BebidasSection />
                </div>

            </div>
            <ButtonAddFixo handleAddToCart={handleAddToCart} qnt={qnt} />

        </>
    )
}


export default BebidasDetalhes;