import { Link } from 'react-router-dom';
import icon from '/android/android-launchericon-48-48.png'
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPedidosAndamento } from '../../../services/redux/pedidos/pedidosSlice';
import { useEffect } from 'react';

function MesaCard({ mesaNumero }) {
    MesaCard.propTypes = {
        mesaNumero: PropTypes.number.isRequired,
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPedidosAndamento());
    }, [dispatch]);

    const { mesaItems } = useSelector((state) => state.mesa);
    const mesa = mesaItems?.find((mesa) => mesa.numero_mesa == mesaNumero);

    const { pedidos_mesa } = useSelector(state => state.pedidos);
    const pedido = pedidos_mesa?.filter(pedido => pedido.numero_mesa == mesaNumero)

    return (

        <Link to={`/mesas/${mesaNumero}`} className="flex rounded-xl w-[10rem]  relative items-center shadow-md cursor-pointer hover:scale-105 transition-all duration-300  gap-2 ">
            <span className={` ${mesa || pedido.length > 0 ? 'mesaActive' : 'mesaDefault'} shadow-sm flex justify-center items-center w-[4rem] h-[4rem] relative top-1/2`}>
                <img className='absolute' src={icon} alt="" />
            </span>
            <span className={`${mesa ? 'bg-orange-400' : ''} ${pedido.length > 0 ? 'bg-green-600' : ''}  absolute drop-shadow-md right-2 top-2 w-[.7rem] h-[.7rem]  bg-gray-300 rounded-full`}></span>
            <h2 className='text-xl text-center font-semibold'>Mesa {mesaNumero} </h2>
        </Link>
    )
}

export default MesaCard;