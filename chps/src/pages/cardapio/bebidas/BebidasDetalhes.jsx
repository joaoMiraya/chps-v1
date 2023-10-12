import { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Link, useParams } from "react-router-dom";

import { fetchBebidas } from "@services/redux/items/bebidasSlice";
import { addToCart } from "@services/redux/cart/cartSlice";

const Loading = lazy(() => import("@components/partials/Loading"));
const IncresDecresBtn = lazy(() => import("@components/utils/buttons/IncresDecresBtn"));
const BebidasSection = lazy(() => import("@components/utils/cards/BebidasSection"));
const ButtonAddFixo = lazy(() => import("@components/utils/cards/detalhes/ButtonAddFixo"));



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
    const [sugar, setSugar] = useState('Com açucar');

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
        if (bebida.categoria == "Suco") {
            values = {
                ...values,
                suco: sugar
            }
        }
        dispatch(addToCart(values))
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
                        <h1 className="text-3xl font-semibold">{bebida.nome}</h1>
                        <span>Sub-total: {String(valorTotal).replace(".", ",")}</span>
                    </div>
                    <div className=" self-end flex gap-2">
                        <Link className="underline" to={"/menu"}>{('menu >')}</Link><Link className="underline" to={"/menu/bebidas"}>{('bebidas >')}</Link><span className="text-gray-400">{bebida.nome}</span>
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
                    <BebidasSection />
                </div>

            </div>
            <ButtonAddFixo handleAddToCart={handleAddToCart} qnt={qnt} />

        </>
    )
}


export default BebidasDetalhes;