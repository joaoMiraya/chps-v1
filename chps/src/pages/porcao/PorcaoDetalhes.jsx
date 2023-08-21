

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineInfoCircle } from 'react-icons/ai';

import BebidasSection from "../../components/utils/cards/BebidasSection";
import IncresDecresBtn from "../../components/utils/buttons/IncresDecresBtn";
import Loading from '../../components/partials/Loading';


import { addToCart } from "../../services/redux/cart/cartSlice";
import ButtonAddFixo from "../../components/utils/cards/detalhes/ButtonAddFixo";
import { fetchPorcoes } from "../../services/redux/items/porcoesSlice";
import PorcaoToggle from "./utils/PorcaoToggle";




function PorcaoDetalhes() {

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPorcoes())
    }, [dispatch])


    const { porcoes } = useSelector(state => state.porcoes);
    const porcao = porcoes.find((porcao) => porcao.id === id);

    const [valorTotal, setValorTotal] = useState(0);
    const [qnt, setQnt] = useState(1);

    const [inteira, setInteira] = useState(true);

    //RESPONSÁVEL POR CALCULAR O VALOR TOTAL
    useEffect(() => {
        if (inteira) {
            setValorTotal((porcao?.valorI * qnt).toFixed(2))
        } else {
            setValorTotal((porcao?.valorM * qnt).toFixed(2))
        }
    }, [inteira, porcao, qnt]);

    const handleAddToCart = () => {
        const values = {
            id: id,
            idPedido: id + Date.now(),
            nome: porcao.nome,
            classe: porcao.classe,
            tamanho: inteira ? 'Inteira' : 'Meia',
            valor: valorTotal,
            qnt: qnt
        };
        dispatch(addToCart(values))
    };


    if (!porcao) {
        return <Loading />
    }
    return (
        <>
            <div className="p-4 w-full overflow-hidden">

                <div className="my-4">
                    <h1 className="text-3xl font-semibold">{porcao.nome}</h1>
                    <span aria-label="Sub-valor">Sub-total: {String(valorTotal).replace(".", ",")}</span>
                </div>
                <div className="">
                    <img src={porcao.imagem} alt={porcao.nome} />
                </div>
                <p aria-label="Ingredientes" className="text-center">
                    {porcao.ingredientes}
                </p>
                <PorcaoToggle inteira={inteira} setInteira={setInteira} />
                <div className="flex flex-col items-center my-4 ">
                    <IncresDecresBtn qnt={qnt} setQnt={setQnt} />
                    <div className="flex justify-center text-center my-4 bg-[#9C9C9C40] p-2 rounded-xl">
                        <span className="mb-4"><AiOutlineInfoCircle color="#9C9C9C" size={25} />Você pode remover ingredientes adicionando uma nota na hora de finalizar o pedido</span>
                    </div>
                    <BebidasSection />
                </div>

            </div>
            <ButtonAddFixo handleAddToCart={handleAddToCart} qnt={qnt} />
        </>
    )
}

export default PorcaoDetalhes;