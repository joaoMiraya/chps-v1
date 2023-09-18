import { lazy, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import { fetchLanches } from "../../services/redux/items/lanchesSlice";
import { addToCart } from "../../services/redux/cart/cartSlice";

const Note = lazy(() => import("../cart/detalhes/utils/Note"));
const ButtonAddFixo = lazy(() => import("../../components/utils/cards/detalhes/ButtonAddFixo"));
const BebidasSection = lazy(() => import("../../components/utils/cards/BebidasSection"));
const AcrescimoSection = lazy(() => import("../../components/utils/cards/AcrescimoSection"));
const IncresDecresBtn = lazy(() => import("../../components/utils/buttons/IncresDecresBtn"));
const Loading = lazy(() => import("../../components/partials/Loading"));

function LancheDetalhes() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const [note, setNote] = useState('');

    useEffect(() => {
        dispatch(fetchLanches());
    }, [dispatch]);

    const { lanches } = useSelector(state => state.lanches);
    const lanche = lanches.find((lanche) => lanche.id === id);

    const { acrescimos } = useSelector(state => state.acrescimos);

    //RESPONSAVEL POR CAPTURAR O ACRESCIMO SELECIONADO
    const [selectedAcrescimos, setSelectedAcrescimos] = useState([]);
    const handleSelectAcrescimo = (acrescimoId) => {
        setSelectedAcrescimos(prevSelected => {
            if (prevSelected.includes(acrescimoId)) {
                return prevSelected.filter(id => id !== acrescimoId);
            } else {
                return [...prevSelected, acrescimoId];
            }
        });
    };


    const [valorTotal, setValorTotal] = useState(0);
    const [qnt, setQnt] = useState(1);

    //      RESPONSAVEL POR VERIFICAR E ATUALIZAR O PREÇO FINAL DO LANCHE
    useEffect(() => {
        if (selectedAcrescimos && lanche) {
            const selectedAcrescimosTotalValueInCents = selectedAcrescimos.reduce((totalValue, acrescimoId) => {
                const acrescimo = acrescimos.find(acrescimo => acrescimo.id === acrescimoId);
                if (acrescimo) {
                    return totalValue + Math.round(acrescimo.valor * 100); // Convertendo para centavos
                }
                return totalValue;
            }, 0);
            const valorLancheInCents = Math.round(lanche.valor * 100); // Convertendo para centavos
            const valorTotalInCents = valorLancheInCents + selectedAcrescimosTotalValueInCents;
            const valorTotal = (valorTotalInCents / 100);
            const valorFinal = valorTotal * qnt
            setValorTotal(valorFinal.toFixed(2))

        }
    }, [lanche, acrescimos, selectedAcrescimos, qnt]);


    const handleAddToCart = () => {
        let values = {
            id: id,
            idPedido: id + Date.now(),
            nome: lanche.nome,
            classe: lanche.classe,
            valor: valorTotal,
            qnt: qnt
        };

        if (selectedAcrescimos && selectedAcrescimos.length > 0) {
            const selectedAcrecimoObjects = selectedAcrescimos.map(selectedId => {
                const acrescimo = acrescimos.find(acrescimo => acrescimo.id === selectedId);
                return acrescimo;
            });

            values = {
                ...values,
                acrescimos: selectedAcrecimoObjects
            };
        }
        if (note && note.length > 3) {
            values = {
                ...values,
                nota: note
            }
            setNote('');
        }

        dispatch(addToCart(values));
    };



    if (!lanche) {
        return <Loading />
    }
    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="p-4 w-full overflow-hidden">

                <div className="my-4 flex flex-col gap-2">
                    <div>
                        <h1 className="text-3xl font-semibold">{lanche.nome}</h1>
                        <span>Sub-total: {String(valorTotal).replace(/\./g, ',')}</span>
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
                <div className="flex flex-col items-center my-4 ">
                    <IncresDecresBtn qnt={qnt} setQnt={setQnt} />
                    <AcrescimoSection
                        selectedAcrescimos={selectedAcrescimos}
                        handleSelectAcrescimo={handleSelectAcrescimo}
                    />
                    {/* <div className="flex justify-center text-center my-4 bg-[#9C9C9C40] p-2 rounded-xl">
                        <span className="mb-4"><AiOutlineInfoCircle color="#9C9C9C" size={25} />Você pode remover ingredientes adicionando uma nota na hora de finalizar o pedido</span>
                    </div> */}
                    <Note setNote={setNote} note={note} />

                </div>
                <section className="py-6">
                    <BebidasSection />
                </section>
            </div>
            <ButtonAddFixo handleAddToCart={handleAddToCart} qnt={qnt} />

        </>
    )
}


export default LancheDetalhes;