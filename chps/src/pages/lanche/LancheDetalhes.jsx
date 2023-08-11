import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineInfoCircle } from 'react-icons/ai';

import BebidasSection from "../../components/utils/cards/BebidasSection";
import AcrescimoSection from "../../components/utils/cards/AcrescimoSection";
import IncresDecresBtn from "../../components/utils/buttons/IncresDecresBtn";
import Loading from '../../components/partials/Loading';

import { fetchLanches } from "../../services/redux/items/lanchesSlice";
import { addToCart } from "../../services/redux/cart/cartSlice";
import ButtonAddFixo from "../../components/utils/cards/detalhes/ButtonAddFixo";



function LancheDetalhes() {

    const { id } = useParams();
    const dispatch = useDispatch();

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
            nome: lanche.nome,
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

        dispatch(addToCart(values));
    };



    if (!lanche) {
        return <Loading />
    }
    return (
        <>
            <div className="p-4 w-full overflow-hidden">

                <div className="my-4">
                    <h1 className="text-3xl font-semibold">{lanche.nome}</h1>
                    <span>Valor und: {String(valorTotal).replace(/\./g, ',')}</span>
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


export default LancheDetalhes;