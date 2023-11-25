
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";



function EncerrarMesa() {

    const { id } = useParams();

    const { pedidos_mesa } = useSelector((state) => state.pedidos);
    const pedido = pedidos_mesa?.filter(pedido => pedido.numero_mesa == id);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let subtotal = 0;
        pedido.map(order => {
            order.itens.map(item => {
                subtotal += parseFloat(item.valor);
            });
        });
        setTotal(subtotal);
    }, [pedido]);

    return (

        <>
            <h1 className="text-2xl text-center my-6">Visão geral da mesa {id}</h1>
            <div className=" m-4 p-4 rounded-md flex flex-col gap-2">
                {pedido?.map((order, i) => {

                    const subtotal = order.itens.reduce(
                        (accumulator, currentValue) => accumulator + parseFloat(currentValue.valor),
                        0
                    );

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
                                                <button className="p-2 flex-1 border-[1px] border-solid border-red-400 hover:bg-red-400 hover:text-white transition-colors duration-300  rounded-lg font-semibold text-red-400">Pagar</button>
                                            </span>
                                            <hr />
                                        </span>
                                    )
                                })}
                            </div>
                            <span className={`${pedido.length === 1 ? 'hidden' : 'flex'}  justify-between items-center px-2 py-4`}>
                                <p className="font-semibold flex-1">Subtotal</p>
                                <p className="flex-1 my-2">R$ {subtotal.toFixed(2).replace('.', ',')}</p>
                                <button className="p-2 flex-1 border-[1px] border-solid border-red-400 hover:bg-red-400 hover:text-white transition-colors duration-300  rounded-lg font-semibold text-red-400">Pagar subtotal</button>
                            </span>
                        </div>
                    )
                })}
                <span className="flex justify-between px-2">
                    <p className="font-semibold text-lg flex-1">Total da Mesa:</p>
                    <p className="text-lg font-semibold flex-1">R$ {(total).toFixed(2).replace(".", ",")}</p>
                    <button className="p-2 flex-1 border-2 border-solid border-green-600 hover:bg-green-600 hover:text-white transition-colors duration-300  rounded-lg font-semibold text-green-600">
                        Finalizar mesa
                    </button>

                </span>
            </div>
        </>
    )
}

export default EncerrarMesa;