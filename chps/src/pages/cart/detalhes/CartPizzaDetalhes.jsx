import { lazy, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { editItemInCart } from "@services/redux/cart/cartSlice";
import { fetchPizzas } from "@services/redux/items/pizzasSlice";
import { ToastContainer } from "react-toastify";

const SegundoSabor = lazy(() => import("@pizzas/utils/SegundoSabor"));
const PizzaToggle = lazy(() => import("@pizzas/utils/PizzaToggle"));
const Loading = lazy(() => import("@components/partials/Loading"));
const IncresDecresBtn = lazy(() => import("@components/utils/buttons/IncresDecresBtn"));
const Note = lazy(() => import("@components/utils/Note"));
const SaveBtn = lazy(() => import("./utils/SaveBtn"));


function CartPizzaDetalhes() {

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPizzas())
    }, [dispatch])

    const [itemInCart, setItemInCart] = useState([]);
    const { pizzas } = useSelector(state => state.pizzas);
    const pizza = pizzas.find((pizza) => pizza.id === itemInCart?.id);

    const [valorTotal, setValorTotal] = useState(0);
    const [qnt, setQnt] = useState(1);

    const [sizeF, setSizeF] = useState(true);
    const [umSabor, setUmSabor] = useState(true);
    const [segundoSabor, setSegundoSabor] = useState([]);
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
                if (itemWithMatchingId.fk) {
                    setUmSabor(false)
                    const pizza = pizzas.find((pizza) => pizza.id === itemWithMatchingId.fk)
                    setSegundoSabor(pizza)
                }
            }
        };
        fetchCartItems();
    }, [id, pizzas]);

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


    const handleSaveChanges = () => {
        let values = {
            id: pizza.id,
            idPedido: id,
            nome: pizza.nome,
            classe: pizza.classe,
            valor: valorTotal,
            qnt: qnt
        };
        if (note.length > 3) {
            values = {
                ...values,
                nota: note
            }
        }
        else if (!umSabor && sizeF) {
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
        dispatch(editItemInCart(values));
    };

    if (!pizza) {
        return <Loading />
    }
    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="p-4 w-full overflow-hidden">

                <div className="my-4 flex flex-col gap-2">
                    <div>
                        <h1 className={'text-xl font-semibold'}>{itemInCart.nome}</h1>
                        <span aria-label="Sub-valor">Sub-total: {String(valorTotal).replace(".", ",")}</span>
                    </div>
                    <div className=" self-end flex gap-2 mt-2">
                        <Link className="underline" to={"/carrinho"}>{('carrinho >')}</Link><span className="text-gray-400">{pizza.nome}</span>
                    </div>
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
                    <Note setNote={setNote} note={note} handleSaveChanges={handleSaveChanges} />
                </div>

            </div>
            <SaveBtn handleSaveChanges={handleSaveChanges} qnt={qnt} />
        </>
    )
}

export default CartPizzaDetalhes;