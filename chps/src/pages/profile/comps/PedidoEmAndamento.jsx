import PropTypes from 'prop-types';
import { useState } from 'react';
import { BsCheckCircle } from 'react-icons/bs';

function PedidoEmAndamento({ pedidos }) {
    PedidoEmAndamento.propTypes = {
        pedido: PropTypes.object
    };
    const [progress, setProgress] = useState(50);

    return (

        <>
            <div className='flex flex-col gap-2'>
                <h2 className='text-2xl font-semibold text-center'>Pedidos em Andamento</h2>
                {pedidos?.map((pedido) => {
                    return (
                        <div key={pedido.numero_pedido} className='bg-white p-2 rounded-md'>
                            <p>Número do pedido: {pedido.numero_pedido}</p>
                            <p>Pedido feito às: {pedido.hora_pedido}</p>
                            <div className="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: `${pedido.status}%` }}></div>
                            </div>
                            <span className={`${pedido.retirar ? 'flex' : 'hidden'}`}>
                                <p className='font-semibold'>Ir retirar</p>
                            </span>
                            <div className={`${pedido.retirar ? 'hidden' : 'flex'} text-sm gap-2 text-center`}>
                                <span className={`${pedido.status >= 25 ? 'text-blue-400' : 'text-gray-300'} flex flex-col justify-between items-center`}>
                                    Pedido Aprovado
                                    <BsCheckCircle size={25} />
                                </span>
                                <span className={`${pedido.status >= 50 ? 'text-blue-400' : 'text-gray-300'} flex flex-col justify-between items-center`}>
                                    Pedido em andamento
                                    <BsCheckCircle size={25} />
                                </span>
                                <span className={`${pedido.status >= 75 ? 'text-blue-400' : 'text-gray-300'} flex flex-col justify-between items-center`}>
                                    Saiu...
                                    <BsCheckCircle size={25} />
                                </span>
                                <span className={`${pedido.status >= 100 ? 'text-blue-400' : 'text-gray-300'} flex flex-col justify-between items-center`}>
                                    Entregue!
                                    <BsCheckCircle size={25} />
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
            <h3 className='text-xl font-semibold my-4'>Está com algum problema?!</h3>
            <a className='underline' href="tel:+5518996149007">Falar com um atendente!</a>
        </>
    )
}

export default PedidoEmAndamento;