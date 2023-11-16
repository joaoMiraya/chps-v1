import { lazy, useState } from 'react'
import FiltroPedidos from './pedidos/utils/FiltroPedidos';
import Logo from '../../components/partials/Logo';

const AddWaitTime = lazy(() => import("./utils/AddWaitTime"))
const PedidosAndamento = lazy(() => import("./pedidos/PedidosAndamento"))

{/*     <button className="btn btn-primary bg-black border-none max-w-[16rem]" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Definir tempo</button>

    <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div className="offcanvas-header">
            <h5 className="offcanvas-title font-semibold text-2xl text-center" id="offcanvasScrollingLabel">Genrencie a aplicação</h5>
            <button type="button" className="btn-close " data-bs-dismiss="offcanvas" aria-label="Close">X</button>
        </div>
        <div className="offcanvas-body">
            <AddTempoEntrega />
            <AddTempoRetirar />
        </div>
    </div> */}
{/*    <div className="flex flex-col items-center w-full">
        <PedidosAndamento />
    </div> */}

function Dashboard() {

    const [orderConfig, setOrderConfig] = useState(0);


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
            </aside>
            <div className='px-12 w-full'>
                <PedidosAndamento orderConfig={orderConfig} />
            </div>
        </div>
    )
}

export default Dashboard;