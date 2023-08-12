
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { CiStickyNote } from 'react-icons/ci';
import { fetchLanches } from "../../../services/redux/items/lanchesSlice";
import { fetchBebidas } from "../../../services/redux/items/bebidasSlice";
import { fetchPizzas } from "../../../services/redux/items/pizzasSlice";
import { editItemInCart } from "../../../services/redux/cart/cartSlice";

import ButtonAddFixo from "../../../components/utils/cards/detalhes/ButtonAddFixo";
import Loading from "../../../components/partials/Loading";
import IncresDecresBtn from "../../../components/utils/buttons/IncresDecresBtn";
import AcrescimoSection from "../../../components/utils/cards/AcrescimoSection";




function CartDetalhes() {

    const { id } = useParams();
    const dispatch = useDispatch();

    const [itemInCart, setItemInCart] = useState();
    const [selectedAcrescimos, setSelectedAcrescimos] = useState([]);
    const [valorTotal, setValorTotal] = useState(0);
    const [qnt, setQnt] = useState(1);

    const [isLanche, setIsLanche] = useState(false);
    const [isBebida, setIsBebida] = useState(false);
    const [isPizza, setIsPizza] = useState(false);
    const [isPorcao, setIsPorcao] = useState(false);

    const [item, setItem] = useState('');


    const { lanches } = useSelector(state => state.lanches);
    const { bebidas } = useSelector(state => state.bebidas);
    const { pizzas } = useSelector(state => state.pizzas);

    useEffect(() => {
        if (itemInCart) {
            if (itemInCart?.classe === "lanche") {
                dispatch(fetchLanches())
                setIsLanche(true)
                setItem(lanches.find((item) => item.id === itemInCart?.id))
            } else if (itemInCart?.classe === "bebida") {
                dispatch(fetchBebidas())
                setIsBebida(true)
                setItem(bebidas.find((item) => item.id === itemInCart?.id))
            } else if (itemInCart?.classe === "pizza") {
                dispatch(fetchPizzas())
                setIsPizza(true)
                setItem(pizzas.find((item) => item.id === itemInCart?.id))
            }
        } else return
    }, [itemInCart, lanches, pizzas, bebidas, dispatch]);


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

    //RESPONSAVEL POR VERIFICAR SE O ITEM POSSUI ACRESCIMOS OU NÃO
    useEffect(() => {
        if (itemInCart) {
            const { acrescimos } = itemInCart;
            if (acrescimos) {
                const acrescimoIds = itemInCart.acrescimos.map(acrescimo => acrescimo.id);
                setSelectedAcrescimos(acrescimoIds);
            } else return
        } else {
            return
        }
    }, [itemInCart]);

    const { acrescimos } = useSelector(state => state.acrescimos);

    //RESPONSAVEL POR CAPTURAR O ACRESCIMO SELECIONADO
    const handleSelectAcrescimo = (acrescimoId) => {
        setSelectedAcrescimos(prevSelected => {
            if (prevSelected.includes(acrescimoId)) {
                return prevSelected.filter(id => id !== acrescimoId);
            } else {
                return [...prevSelected, acrescimoId];
            }
        });
    };

    //RESPONSAVEL POR VERIFICAR E ATUALIZAR O PREÇO FINAL DO ITEM
    useEffect(() => {
        if (selectedAcrescimos && item) {
            const selectedAcrescimosTotalValueInCents = selectedAcrescimos.reduce((totalValue, acrescimoId) => {
                const acrescimo = acrescimos.find(acrescimo => acrescimo.id === acrescimoId);
                if (acrescimo) {
                    return totalValue + Math.round(acrescimo.valor * 100); // Convertendo para centavos
                }
                return totalValue;
            }, 0);
            const valorLancheInCents = Math.round(item.valor * 100); // Convertendo para centavos
            const valorTotalInCents = valorLancheInCents + selectedAcrescimosTotalValueInCents;
            const valorTotal = (valorTotalInCents / 100);
            const valorFinal = valorTotal * qnt
            setValorTotal(valorFinal.toFixed(2))

        }
    }, [item, acrescimos, selectedAcrescimos, qnt]);
    const [note, setNote] = useState('');

    //FUNÇÃO RESPONSAVEL POR EDITAR O PRODUTO NO CARRINHO
    const handleSaveChanges = () => {
        let values = {
            id: item.id,
            idPedido: id,
            nome: item.nome,
            classe: item.classe,
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
        } if (note && note.length > 0) {
            values = {
                ...values,
                nota: note
            }
            setNote('');
        }
        dispatch(editItemInCart(values));
    };



    if (!item) {
        return <Loading />
    }
    return (
        <>
            <div className="p-4 w-full overflow-hidden">

                <div className="my-4">
                    <h1 className="text-3xl font-semibold">{item.nome}</h1>
                    <span>Sub-total: {String(valorTotal).replace(/\./g, ',')}</span>
                </div>
                <div className="">
                    <img src={item.imagem} alt={item.nome} />
                </div>
                <p className="text-center">
                    {item.ingredientes}
                </p>
                <div className="flex flex-col items-center my-4 ">
                    <div className={`form-check my-4 ${item?.categoria === "Suco" ? '' : 'hidden'}`}>
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            Sem Açúcar
                        </label>
                    </div>
                    <IncresDecresBtn qnt={qnt} setQnt={setQnt} />
                    <div className={`${isLanche ? 'block' : 'hidden'}`}>
                        <AcrescimoSection
                            selectedAcrescimos={selectedAcrescimos}
                            handleSelectAcrescimo={handleSelectAcrescimo}
                        />
                    </div>
                    <div className="mt-6 flex flex-col items-center gap-4 px-6">
                        <h2 className="text-xl font-semibold  text-center">Gostaria de adicionar uma nota ao pedido?</h2>
                        <textarea
                            className="bg-gray-100 p-2"
                            name="notaPedido"
                            id="notaPedido"
                            cols="30"
                            rows="5"
                            onChange={(e) => setNote(e.target.value)}
                            value={note}
                            placeholder="Adicione sua nota">
                        </textarea>
                        <button onClick={handleSaveChanges} className=" rounded-sm shadow-inner cursor-pointer border-[1px] border-solid border-gray-300 flex items-center py-2 px-6"><CiStickyNote size={25} /> Adicionar nota</button>
                    </div>
                </div>

            </div>
            <ButtonAddFixo handleAddToCart={handleSaveChanges} qnt={qnt} />

        </>
    )
}


export default CartDetalhes;