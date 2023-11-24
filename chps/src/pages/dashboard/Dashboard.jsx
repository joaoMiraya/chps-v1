import { lazy, useEffect, useState } from 'react'
import FiltroPedidos from './pedidos/utils/FiltroPedidos';
import Logo from '@components/partials/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPedidosAndamento } from '@services/redux/pedidos/pedidosSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddWaitTime = lazy(() => import("./utils/AddWaitTime"))
const PedidosAndamento = lazy(() => import("./pedidos/PedidosAndamento"))

function Dashboard() {

    const [orderConfig, setOrderConfig] = useState(0);
    const [numberOpt, setNumberOpt] = useState(0);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPedidosAndamento());
    }, [dispatch]);

    const fetchData = async () => {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        dispatch(fetchPedidosAndamento());
    };
    fetchData();

    const { pedidos_mesa } = useSelector((state) => state.pedidos);

    const getUniqueTableNumbers = () => {
        const numbers = pedidos_mesa.map((pedido) => pedido.numero_mesa);
        numbers.sort((a, b) => a - b);
        const uniqueNumbers = numbers.filter((numero, index, self) => {
            return self.indexOf(numero) === index;
        });
        return uniqueNumbers;
    };

    const handleNavigateToCloseAccount = () => {
        if (numberOpt === 0) {
            toast.error("Selecione uma mesa")
        } else {
            navigate(`encerrar-mesa/${numberOpt}`)
        }
    };

    return (

        <div className=" flex p-2">
            <aside className='flex flex-col min-w-[20rem] rounded-xl h-screen border-solid border-[1px] border-gray-300 shadow-md'>
                <span className='flex justify-center'>
                    <Logo />
                </span>
                <AddWaitTime />
                <span className='my-4'>
                    <FiltroPedidos setOrderConfig={setOrderConfig} />
                </span>
                <span className={`${orderConfig === 2 ? 'flex' : 'hidden'} flex-col justify-center`}>
                    <h3 className='text-center text-xl font-semibold text-white  bg-gradient-to-tr from-red-800 to bg-orange-300 '>Encerrar mesa</h3>
                    <p className='text-center'>Selecione a mesa que deseja encerrar</p>
                    <div className='flex py-6 justify-center gap-6'>
                        <select
                            className='min-w-[4rem] cursor-pointer'
                            onChange={(e) => setNumberOpt(e.target.value)}
                            value={numberOpt}
                            name="numero_mesa"
                            id="numero_mesa"
                        >
                            <option value={'undefined'}>Selecione</option>
                            {getUniqueTableNumbers()?.map((mesa) => {
                                return (
                                    <option key={mesa} value={mesa}>{mesa}</option>
                                )
                            })}

                        </select>
                        <button onClick={() => handleNavigateToCloseAccount()} className='cursor-pointer hover:scale-105 shadow-md bg-gradient-to-tr from-red-800 to bg-orange-300 rounded-lg text-white font-semibold p-2'>Encerrar</button>
                    </div>
                    <hr />
                </span>
            </aside>
            <div className='px-12 w-full'>
                <PedidosAndamento orderConfig={orderConfig} />
            </div>
        </div>
    )
}

export default Dashboard;