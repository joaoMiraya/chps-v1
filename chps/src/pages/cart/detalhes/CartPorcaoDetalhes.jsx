

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";



import { editItemInCart } from "../../../services/redux/cart/cartSlice";
import { fetchPorcoes } from "../../../services/redux/items/porcoesSlice";
import Loading from "../../../components/partials/Loading";
import PorcaoToggle from "../../porcao/utils/PorcaoToggle";
import IncresDecresBtn from "../../../components/utils/buttons/IncresDecresBtn";
import BebidasSection from "../../../components/utils/cards/BebidasSection";
import SaveBtn from "./utils/SaveBtn";
import Note from "./utils/Note";





function CartPorcaoDetalhes() {

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPorcoes())
    }, [dispatch])

    const [itemInCart, setItemInCart] = useState([]);
    const { porcoes } = useSelector(state => state.porcoes);
    const porcao = porcoes.find((porcao) => porcao.id === itemInCart?.id);

    const [valorTotal, setValorTotal] = useState(0);
    const [qnt, setQnt] = useState(1);

    const [inteira, setInteira] = useState(true);
    const [note, setNote] = useState('');


    //RESPONSÁVEL POR ENCONTRAR O ITEM DO PEDIDO E SETAR SUAS INFORMAÇÕES
    useEffect(() => {
        const fetchCartItems = async () => {
            const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
            if (!storedCartItems) {
                return;
            }
            const itemWithMatchingId = await storedCartItems.find(item => item.idPedido === id);
            if (itemWithMatchingId) {
                setItemInCart(itemWithMatchingId);
                setQnt(itemWithMatchingId.qnt)
                if (itemWithMatchingId.tamanho == 'Inteira') {
                    setInteira(true)
                } else {
                    setInteira(false)
                }
            }
        };
        fetchCartItems();
    }, [id, porcoes]);

    //RESPONSÁVEL POR CALCULAR O VALOR TOTAL
    useEffect(() => {
        if (inteira) {
            setValorTotal((porcao?.valorI * qnt).toFixed(2))
        } else {
            setValorTotal((porcao?.valorM * qnt).toFixed(2))
        }
    }, [inteira, porcao, qnt]);

    const handleSaveChanges = () => {
        let values = {
            id: porcao.id,
            idPedido: id,
            nome: porcao.nome,
            classe: porcao.classe,
            tamanho: inteira ? 'Inteira' : 'Meia',
            valor: valorTotal,
            qnt: qnt
        };
        if (note.length > 3) {
            values = {
                ...values,
                nota: note
            }
        }
        dispatch(editItemInCart(values))
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
                    <Note setNote={setNote} note={note} handleSaveChanges={handleSaveChanges} />

                    <BebidasSection />
                </div>

            </div>
            <SaveBtn handleSaveChanges={handleSaveChanges} qnt={qnt} />
        </>
    )
}

export default CartPorcaoDetalhes;