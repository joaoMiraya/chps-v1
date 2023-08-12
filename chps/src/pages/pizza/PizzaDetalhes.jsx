

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineInfoCircle } from 'react-icons/ai';

import BebidasSection from "../../components/utils/cards/BebidasSection";
import IncresDecresBtn from "../../components/utils/buttons/IncresDecresBtn";
import Loading from '../../components/partials/Loading';


import { addToCart } from "../../services/redux/cart/cartSlice";
import ButtonAddFixo from "../../components/utils/cards/detalhes/ButtonAddFixo";
import { fetchPizzas } from "../../services/redux/items/pizzasSlice";
import PizzaToggle from "./utils/PizzaToggle";
import SegundoSabor from "./utils/SegundoSabor";



function PizzaDetalhes() {

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPizzas())
    }, [dispatch])



    const { pizzas } = useSelector(state => state.pizzas);
    const pizza = pizzas.find((pizza) => pizza.id === id);

    const [valorTotal, setValorTotal] = useState(0);
    const [qnt, setQnt] = useState(1);

    const [sizeF, setSizeF] = useState(true);
    const [umSabor, setUmSabor] = useState(true);
    const [segundoSabor, setSegundoSabor] = useState([]);

    //RESPONSAVEL POR VERIFICAR E ATUALIZAR O PREÇO FINAL DA PIZZA

    useEffect(() => {
        if (pizza) {
            const { valorP, valorF } = pizza;

            // Convertendo os valores para centavos
            const valorFCents = valorF / 100;
            const valorPCents = valorP / 100;

            let calculatedValue;

            if (sizeF && umSabor) {
                // Caso 1: Tamanho Família com um sabor
                calculatedValue = valorFCents * 100;
            } else if (sizeF && !umSabor && segundoSabor != null) {
                // Caso 2: Tamanho Família com dois sabores
                const segundoValorFCents = segundoSabor.valorF / 100;
                const media = (valorFCents + segundoValorFCents) / 2;
                calculatedValue = media * 100;
            } else if (!sizeF && umSabor) {
                // Caso 3: Tamanho Pequeno com um sabor
                calculatedValue = valorPCents * 100;
            } else if (!sizeF && !umSabor) {
                // Caso 4: Tamanho Pequeno com dois sabores
                const segundoValorP = segundoSabor?.valorP / 100;
                const media = (valorPCents + segundoValorP) / 2;
                calculatedValue = media * 100;
            } else {
                // Caso padrão: outros cenários
                calculatedValue = 0;
            }

            // Calculando o valor total com base na quantidade e formatando a saída
            const totalValue = (calculatedValue * qnt).toFixed(2).replace(".", ",");
            setValorTotal(totalValue);
        }
    }, [pizza, qnt, sizeF, segundoSabor, umSabor]);


    const handleAddToCart = () => {
        let values = {
            id: id,
            idPedido: id + Date.now(),
            nome: pizza.nome,
            classe: pizza.classe,
            valor: valorTotal,
            qnt: qnt
        };
        if (!umSabor && sizeF) {
            values = {
                ...values,
                fk: segundoSabor.id,
                nome: 'Meia' + ' ' + pizza.nome + ' ' + 'Meia' + ' ' + segundoSabor.nome,
                tamanho: "Família"
            }
        } else if (!umSabor && !sizeF) {
            values = {
                ...values,
                fk: segundoSabor.id,
                nome: 'Meia' + ' ' + pizza.nome + ' ' + 'Meia' + ' ' + segundoSabor.nome,
                tamanho: "Individual"

            }
        }
        dispatch(addToCart(values));
    };

    if (!pizza) {
        return <Loading />
    }
    return (
        <>
            <div className="p-4 w-full overflow-hidden">

                <div className="my-4">
                    <h1 className="text-3xl font-semibold">{pizza.nome}</h1>
                    <span aria-label="Sub-valor">Sub-total: {String(valorTotal).replace(".", ",")}</span>
                </div>
                <div className="">
                    <img src={pizza.imagem} alt={pizza.nome} />
                </div>
                <p aria-label="Ingredientes" className="text-center">
                    {pizza.ingredientes}
                </p>
                <div className={`${umSabor ? 'hidden' : 'block'}`}>
                    <h2 className="text-xl font-semibold text-center my-4">Selecione o segundo sabor: </h2>
                    <SegundoSabor setSegundoSabor={setSegundoSabor} pizzas={pizzas} />
                </div>
                <div className="flex justify-center my-4">
                    <PizzaToggle
                        sizeF={sizeF}
                        setSizeF={setSizeF}
                        umSabor={umSabor}
                        setUmSabor={setUmSabor}
                    />
                </div>

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

export default PizzaDetalhes;