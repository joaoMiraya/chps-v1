import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';


const initialState = {
    mesaItems: localStorage.getItem("mesaItems") ? JSON.parse(localStorage.getItem("mesaItems")) : [],
};

const mesaSlice = createSlice({
    name: "mesa",
    initialState,
    reducers: {
        addToMesa(state, action) {
            const tempProduct = { ...action.payload }
            state.mesaItems.push(tempProduct);
            toast.success(`${action.payload.nome} adicionado na mesa ${tempProduct.numero_mesa}`, {
                position: "top-left"
            });
            localStorage.setItem("mesaItems", JSON.stringify(state.mesaItems));

        },
        editItemInMesa(state, action) {
            const newProduct = { ...action.payload };
            // Encontre o índice do item a ser editado na mesa
            const index = state.mesaItems.findIndex(item => item.idPedido === newProduct.idPedido);
            if (index !== -1) {
                // Atualize o carrinho com o novo produto na mesma posição
                state.mesaItems[index] = newProduct;
                toast.success(`${newProduct.nome} foi alterado na mesa`, {
                    position: "top-left"
                });
                // Atualize o localStorage
                localStorage.setItem("mesaItems", JSON.stringify(state.mesaItems));
            } else {
                // Caso o item não seja encontrado, apenas adicione-o ao carrinho
                state.mesaItems.push(newProduct);

                toast.success(`${newProduct.nome} adicionado na mesa`, {
                    position: "top-left"
                });

                localStorage.setItem("mesaItems", JSON.stringify(state.mesaItems));
            }
        },

        removeFromMesa(state, action) {
            const nextmesaItems = state.mesaItems.filter(
                cartItem => cartItem.idPedido !== action.payload.idPedido
            )
            state.mesaItems = nextmesaItems;
            localStorage.setItem("mesaItems", JSON.stringify(state.mesaItems))
            toast.error(`${action.payload.nome} removido da mesa ${action.payload.numero_mesa}`, {
                position: "top-left"
            });
        },
        decreaseMesa(state, action) {
            const itemIndex = state.mesaItems.findIndex(
                cartItem => cartItem.id === action.payload.id
            )
            if (state.mesaItems[itemIndex].cartQuantity > 1) {
                state.mesaItems[itemIndex].cartQuantity -= 1
                toast.error(`${action.payload.name} quantidade decrementada`, {
                    position: "top-left"
                });
            } else if (state.mesaItems[itemIndex].cartQuantity === 1) {
                const nextMesaItems = state.mesaItems.filter(
                    (cartItem) => cartItem.id !== action.payload.id
                );
                state.mesaItems = nextMesaItems;
                toast.error(`${action.payload.nome} removido da mesa ${action.payload.numero_mesa}`, {
                    position: "top-left"
                });
            }
            localStorage.setItem("mesaItems", JSON.stringify(state.mesaItems))
        },
        clearMesa(state, action) {
            const clearMesaItem = state.mesaItems.filter(
                mesaItem => mesaItem.numero_mesa !== action.payload.numero_mesa
            );
            state.mesaItems = clearMesaItem;
            localStorage.setItem("mesaItems", JSON.stringify(state.mesaItems))
        },
    },
});

export const { addToMesa, removeFromMesa, decreaseMesa, editItemInMesa, clearMesa } = mesaSlice.actions;

export default mesaSlice.reducer;