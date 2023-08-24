import { lazy, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineInfoCircle } from 'react-icons/ai';

import { addToCart } from "../../services/redux/cart/cartSlice";

import { fetchPorcoes } from "../../services/redux/items/porcoesSlice";
import { ToastContainer } from "react-toastify";

const BebidasSection = lazy(() => import("../../components/utils/cards/BebidasSection"));
const IncresDecresBtn = lazy(() => import("../../components/utils/buttons/IncresDecresBtn"));
const Loading = lazy(() => import("../../components/partials/Loading"));
const ButtonAddFixo = lazy(() => import("../../components/utils/cards/detalhes/ButtonAddFixo"));
const PorcaoToggle = lazy(() => import("./utils/PorcaoToggle"));


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
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="p-4 w-full overflow-hidden">

                <div className="my-4 flex flex-col gap-2">
                    <div>
                        <h1 className="text-3xl font-semibold">{porcao.nome}</h1>
                        <span aria-label="Sub-valor">Sub-total: {String(valorTotal).replace(".", ",")}</span>
                    </div>
                    <div className=" self-end flex gap-2">
                        <Link className="underline" to={"/menu"}>{('menu >')}</Link><Link className="underline" to={"/menu/porcoes"}>{('porcoes >')}</Link><span className="text-gray-400">{porcao.nome}</span>
                    </div>
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