import { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { fetchBebidas } from "../../../services/redux/items/bebidasSlice";
import { editItemInCart } from "../../../services/redux/cart/cartSlice";
import { ToastContainer } from "react-toastify";

const Loading = lazy(() => import("../../../components/partials/Loading"));
const IncresDecresBtn = lazy(() => import("../../../components/utils/buttons/IncresDecresBtn"));
const SaveBtn = lazy(() => import("./utils/SaveBtn"));

function CartBebidasDetalhes() {

    const { id } = useParams();
    const dispatch = useDispatch();

    const [itemInCart, setItemInCart] = useState([]);
    const [qnt, setQnt] = useState(1);
    const [valorTotal, setValorTotal] = useState(0);
    const [isSuco, setIsSuco] = useState(false);
    const [sugar, setSugar] = useState('Com açucar');

    const { bebidas } = useSelector(state => state.bebidas);
    const bebida = bebidas.find((bebida) => bebida.id === itemInCart?.id);

    useEffect(() => {
        dispatch(fetchBebidas());
    }, [dispatch]);

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
            }
        };
        fetchCartItems();
    }, [id]);

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

    const handleSaveChanges = () => {
        let values = {
            id: bebida.id,
            idPedido: id,
            nome: bebida.nome,
            classe: bebida.classe,
            valor: valorTotal,
            qnt: qnt
        };
        if (bebida.categoria == "Suco") {
            values = {
                ...values,
                suco: sugar
            }
        }
        dispatch(editItemInCart(values))
    };

    if (!bebida) {
        return <Loading />
    }
    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="p-4 w-full overflow-hidden">

                <div className="my-4 flex flex-col gap-2">
                    <div>
                        <h1 className="text-3xl font-semibold">{bebida.nome}</h1> <span>{isSuco ? itemInCart?.suco : ''}</span> <br />
                        <span>Sub-total: {String(valorTotal).replace(".", ",")}</span>
                    </div>
                    <div className=" self-end flex gap-2 mt-2">
                        <Link className="underline" to={"/carrinho"}>{('carrinho >')}</Link><span className="text-gray-400">{bebida.nome}</span>
                    </div>
                </div>
                <div className="">
                    <img src={bebida.imagem} alt={bebida.nome} />
                </div>
                <div className="flex flex-col items-center my-4 ">
                    <IncresDecresBtn qnt={qnt} setQnt={setQnt} />
                    <div className={`${isSuco ? 'block' : 'hidden'}`}>
                        <div className="form-check">
                            <input className="form-check-input" onChange={(e) => setSugar(e.target.value)} value="Sem açúcar" type="checkbox" id="defaultCheck1" />
                            <label className="form-check-label" htmlFor="defaultCheck1">
                                Sem Açúcar
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" onChange={(e) => setSugar(e.target.value)} value="Pouco açúcar" type="checkbox" id="defaultCheck2" />
                            <label className="form-check-label" htmlFor="defaultCheck2">
                                Pouco Açúcar
                            </label>
                        </div>
                    </div>
                </div>

            </div>
            <SaveBtn handleSaveChanges={handleSaveChanges} qnt={qnt} />

        </>
    )
}


export default CartBebidasDetalhes;