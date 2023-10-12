
import { lazy, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import { editItemInCart } from "@services/redux/cart/cartSlice";
import { fetchPratos } from "@services/redux/items/pratosSlice";

const Loading = lazy(() => import("@components/partials/Loading"));
const AcrescimoSection = lazy(() => import("@components/utils/cards/AcrescimoSection"));
const IncresDecresBtn = lazy(() => import("@components/utils/buttons/IncresDecresBtn"));
const Note = lazy(() => import("@components/utils/Note"));
const SaveBtn = lazy(() => import("./utils/SaveBtn"));

function CartPratosDetalhes() {

    const { id } = useParams();
    const dispatch = useDispatch();

    const [itemInCart, setItemInCart] = useState([]);
    const [selectedAcrescimos, setSelectedAcrescimos] = useState([]);
    const [valorTotal, setValorTotal] = useState(0);
    const [qnt, setQnt] = useState(1);
    const [note, setNote] = useState('');


    const { pratos } = useSelector(state => state.pratos);
    const prato = pratos.find((prato) => prato.id === itemInCart?.id)

    useEffect(() => {
        dispatch(fetchPratos());
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
        if (selectedAcrescimos && prato) {
            const selectedAcrescimosTotalValueInCents = selectedAcrescimos.reduce((totalValue, acrescimoId) => {
                const acrescimo = acrescimos.find(acrescimo => acrescimo.id === acrescimoId);
                if (acrescimo) {
                    return totalValue + Math.round(acrescimo.valor * 100); // Convertendo para centavos
                }
                return totalValue;
            }, 0);
            const valorLancheInCents = Math.round(prato.valor * 100); // Convertendo para centavos
            const valorTotalInCents = valorLancheInCents + selectedAcrescimosTotalValueInCents;
            const valorTotal = (valorTotalInCents / 100);
            const valorFinal = valorTotal * qnt
            setValorTotal(valorFinal.toFixed(2))

        }
    }, [prato, acrescimos, selectedAcrescimos, qnt]);

    //FUNÇÃO RESPONSAVEL POR EDITAR O PRODUTO NO CARRINHO
    const handleSaveChanges = () => {
        let values = {
            id: prato.id,
            idPedido: id,
            nome: prato.nome,
            classe: prato.classe,
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
        } if (note && note.length > 3) {
            values = {
                ...values,
                nota: note
            }
            setNote('');
        }
        dispatch(editItemInCart(values));
    };



    if (!prato) {
        return <Loading />
    }
    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="p-4 w-full overflow-hidden">

                <div className="my-4 flex flex-col gap-2">
                    <div>
                        <h1 className="text-3xl font-semibold">{prato.nome}</h1>
                        <span>Sub-total: {String(valorTotal).replace(/\./g, ',')}</span>
                    </div>
                    <div className=" self-end flex gap-2 mt-2">
                        <Link className="underline" to={"/carrinho"}>{('carrinho >')}</Link><span className="text-gray-400">{prato.nome}</span>
                    </div>
                </div>
                <div>
                    <img src={prato.imagem} alt={prato.nome} />
                </div>
                <p className="text-center">
                    {prato.ingredientes}
                </p>
                <div className="flex flex-col items-center my-4 ">
                    <IncresDecresBtn qnt={qnt} setQnt={setQnt} />
                    <AcrescimoSection
                        selectedAcrescimos={selectedAcrescimos}
                        handleSelectAcrescimo={handleSelectAcrescimo}
                    />
                    <Note setNote={setNote} note={note} handleSaveChanges={handleSaveChanges} />
                </div>
            </div>
            <SaveBtn
                handleSaveChanges={handleSaveChanges}
                qnt={qnt}
            />

        </>
    )
}


export default CartPratosDetalhes;