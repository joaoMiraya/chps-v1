import { useDispatch, useSelector } from "react-redux";
import { fetchPedidosAndamento } from "../../../services/redux/pedidos/pedidosSlice";
import { useEffect, useState } from "react";


function PedidosAndamento() {
    const dispatch = useDispatch();


    const pedidosAndamento = useSelector((state) => state.pedidos.entregas);

    useEffect(() => {
        dispatch(fetchPedidosAndamento())
    }, []);
    console.log(pedidosAndamento);


    return (
        <>
            
        </>
    )
}

export default PedidosAndamento;