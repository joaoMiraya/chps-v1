import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";



function EncerrarMesa() {

    const { id } = useParams();

    const { pedidos_mesa } = useSelector((state) => state.pedidos);
    const pedido = pedidos_mesa?.filter(pedido => pedido.numero_mesa == id);


    console.log(pedido);

    return (

        <>
            <h1 className="text-2xl text-center my-6">Visão geral da mesa {id}</h1>
            <div className="border-2 border-solid border-gray-400 m-4 p-4 rounded-md flex flex-col gap-2">
                {pedido?.map((order, i) => {

                    /* const totalAmount = order.itens.reduce((acc, item) => acc + item.valor, 0);
                    console.log(totalAmount); */

                    return (
                        <div key={order.numero_pedido} className="border-[1px] border-solid border-gray-400 p-2 rounded-md">
                            <span className="flex flex-col">
                                <span className="flex gap-6">
                                    <p>{`Pedido ${i + 1}`}</p>
                                    <p className="mr-4">{order.hora_pedido}</p>
                                </span>
                                <p>{`Atendente: ${order.atendente.name}`}</p>
                            </span>
                            <div className="flex flex-col">
                                {order.itens.map((item) => {
                                    return (
                                        <span key={item.id}>
                                            <span className="flex justify-between items-center p-2">
                                                <p className="flex-1">{item.nome}</p>
                                                <p className="flex-1">R$ {(item.valor).replace(".", ",")}</p>
                                                <button className="p-2 border-[1px] border-solid border-red-400 hover:bg-red-400 hover:text-white transition-colors duration-300  rounded-lg font-semibold text-red-400">Pagar</button>
                                            </span>
                                            <hr />
                                        </span>
                                    )
                                })}
                            </div>
                            <span className="flex justify-between">
                                <p>Subtotal</p>

                            </span>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default EncerrarMesa;