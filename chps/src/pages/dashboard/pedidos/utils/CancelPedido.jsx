import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { getHours } from '@javascript/main';
import { addCancelOrder, deleteOrder } from '@services/redux/pedidos/pedidosSlice';

function CancelPedido({ pedido }) {
    CancelPedido.propTypes = {
        pedido: PropTypes.object.isRequired
    };

    const [reason, setReason] = useState('');
    const dispatch = useDispatch();

    const handleCancelOrder = (e) => {
        e.preventDefault();
        if (reason.length > 3) {
            dispatch(addCancelOrder({ Reason: reason, Order: pedido, Time: getHours() }));
            dispatch(deleteOrder(pedido.key));
            window.history.back();
        } else {
            toast.error("Insira um motivo para o cancelamento do pedido")
        }
    };

    return (
        <div className="flex flex-col">

            <form onSubmit={(e) => handleCancelOrder(e)}>
                <textarea
                    className=" border-[1px] w-full border-solid p-2 rounded-xl border-gray-300"
                    type="text"
                    name="cancelamento"
                    id="cancelamento"
                    onChange={(e) => setReason(e.target.value)}
                    value={reason}
                    cols="10"
                    rows=".5"
                    placeholder='Descreva o motivo'
                ></textarea>

                <div className="flex flex-col pt-12">
                    <button className="bg-red-900 text-white py-2 rounded-md shadow-lg hover:scale-105" type="submit">Cancelar pedido</button>
                </div>
            </form>

        </div>

    )
}

export default CancelPedido;