import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';


const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    /* cartTotalQuantity: 0,
    cartTotalAmount: 0, */
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const tempProduct = { ...action.payload }
            state.cartItems.push(tempProduct);
            toast.success(`${action.payload.nome} adicionado no carrinho`, {
                position: "top-left"
            });
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

        },
        editItemInCart(state, action) {
            const newProduct = { ...action.payload };
            // Encontre o índice do item a ser editado no carrinho
            const index = state.cartItems.findIndex(item => item.idPedido === newProduct.idPedido);
            if (index !== -1) {
                // Atualize o carrinho com o novo produto na mesma posição
                state.cartItems[index] = newProduct;
                toast.success(`${newProduct.nome} foi alterado no carrinho`, {
                    position: "top-left"
                });
                // Atualize o localStorage
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            } else {
                // Caso o item não seja encontrado, apenas adicione-o ao carrinho
                state.cartItems.push(newProduct);

                toast.success(`${newProduct.nome} adicionado no carrinho`, {
                    position: "top-left"
                });

                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            }
        },

        removeFromCart(state, action) {
            const nextCartItems = state.cartItems.filter(
                cartItem => cartItem.idPedido !== action.payload.idPedido
            )
            state.cartItems = nextCartItems;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            toast.error(`${action.payload.nome} removido do carrinho`, {
                position: "top-left"
            });
        },
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                cartItem => cartItem.id === action.payload.id
            )
            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1
                toast.error(`${action.payload.name} quantidade decrementada`, {
                    position: "top-left"
                });
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter(
                    (cartItem) => cartItem.id !== action.payload.id
                );
                state.cartItems = nextCartItems;
                toast.error(`${action.payload.nome} removido do carrinho`, {
                    position: "top-left"
                });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        clearCart(state) {
            state.cartItems = [];
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
    },
});

export const { addToCart, removeFromCart, decreaseCart, editItemInCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;