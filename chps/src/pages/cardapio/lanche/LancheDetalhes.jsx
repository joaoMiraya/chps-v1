import { lazy, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import { fetchAcrescimo } from '@services/redux/items/acrescimosSlice';
import { fetchLanches } from "@services/redux/items/lanchesSlice";
import { addToCart } from "@services/redux/cart/cartSlice";

const Note = lazy(() => import("@components/utils/Note"));
const ButtonAddFixo = lazy(() => import("@components/utils/buttons/ButtonAddFixo"));
const BebidasSection = lazy(() => import("@components/utils/cards/BebidasSection"));
const AcrescimoSection = lazy(() => import("@components/utils/cards/AcrescimoSection"));
const IncresDecresBtn = lazy(() => import("@components/utils/buttons/IncresDecresBtn"));
const DetalhesPlaceholder = lazy(() => import("@components/utils/cards/DetalhesPlaceholder"));

function LancheDetalhes() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const [note, setNote] = useState('');


    useEffect(() => {
        dispatch(fetchLanches());
        dispatch(fetchAcrescimo());

    }, [dispatch]);

    const { lanches } = useSelector(state => state.lanches);
    const lanche = lanches.find((lanche) => lanche.id === id);

    const { acrescimos } = useSelector(state => state.acrescimos);

    const [selectedAcrescimos, setSelectedAcrescimos] = useState([]);
    const [valorTotal, setValorTotal] = useState(0);
    const [qnt, setQnt] = useState(1);
    const [quantities, setQuantities] = useState({});


    //REPONSÁVEL POR VERIFICAR SE POSSUI ACRESCIMOS
    useEffect(() => {
        let result = [];
        for (let i = 0; i < Object.keys(quantities).length; i++) {
            const quantityId = Object.keys(quantities)[i];
            const foundAcrescimo = acrescimos.find(elemento => elemento.id === quantityId);
            if (foundAcrescimo) {
                const newObjct = {
                    ...foundAcrescimo,
                    qntd: quantities[quantityId]
                }
                result.push(newObjct);
            }
        }
        setSelectedAcrescimos(result);
    }, [quantities, acrescimos]);


    //      RESPONSAVEL POR VERIFICAR E ATUALIZAR O PREÇO FINAL DO LANCHE
    useEffect(() => {
        if (selectedAcrescimos && lanche) {
            let valorTotalAcr = 0;
            for (let i = 0; i < selectedAcrescimos.length; i++) {
                valorTotalAcr += selectedAcrescimos[i].valor * selectedAcrescimos[i].qntd;
            }
            const selectedAcrescimosTotalValueInCents = Math.round(valorTotalAcr * 100); // Convertendo o valor dos acrescimos para centavos
            const valorLancheInCents = Math.round(lanche.valor * 100); // Convertendo o valor do lanche para centavos
            const valorTotalInCents = valorLancheInCents + selectedAcrescimosTotalValueInCents;
            const valorTotal = (valorTotalInCents / 100); // Convertendo o valor total para reais
            const valorFinal = valorTotal * qnt
            setValorTotal(valorFinal)

        }
    }, [lanche, acrescimos, selectedAcrescimos, qnt]);


    const handleAddToCart = () => {
        let values = {
            id: id,
            idPedido: id + Date.now(),
            nome: lanche.nome,
            classe: lanche.classe,
            valor: valorTotal,
            qnt: qnt,
            nota: note.length < 3 ? 'Sem exigências' : note
        };

        if (selectedAcrescimos && selectedAcrescimos.length > 0) {
            values = {
                ...values,
                acrescimos: selectedAcrescimos
            };
        }

        dispatch(addToCart(values));
    };



    if (!lanche) {
        return <DetalhesPlaceholder />
    }
    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="p-4 w-full overflow-hidden">
                <main>
                    <div className="my-4 flex flex-col gap-2">
                        <div>
                            <h1 className="text-3xl font-semibold">{lanche.nome}</h1>
                            <span>Sub-total: {Number(valorTotal).toFixed(2).replace('.', ',')} </span>
                        </div>
                        <div className=" self-end flex gap-2">
                            <Link className="underline" to={"/menu"}>{('menu >')}</Link><Link className="underline" to={"/menu/lanches"}>{('lanches >')}</Link><span className="text-gray-400">{lanche.nome}</span>
                        </div>
                    </div>
                    <div className="">
                        <img src={lanche.imagem} alt={lanche.nome} />
                    </div>
                    <p className="text-center">
                        {lanche.ingredientes}
                    </p>
                </main>
                <section className="flex flex-col items-center my-4 ">
                    <IncresDecresBtn qnt={qnt} setQnt={setQnt} />
                    <AcrescimoSection
                        setQuantities={setQuantities}
                        quantities={quantities}
                        acrescimos={acrescimos}
                    />
                </section>

                <section>
                    <Note setNote={setNote} note={note} />
                </section>

                <section className="py-6">
                    <BebidasSection />
                </section>
            </div>
            <ButtonAddFixo handleFunc={handleAddToCart} text={"Adicionar ao carrinho"} qnt={qnt} />

        </>
    )
}


export default LancheDetalhes;