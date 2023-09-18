import { lazy } from 'react'

const AddTempoRetirar = lazy(() => import("./utils/AddTempoRetirar"))
const AddTempoEntrega = lazy(() => import("./utils/AddTempoEntrega"))

function Dashboard() {

    return (

        <div className=" flex flex-col px-12 my-6">
            <button className="btn btn-primary bg-black border-none max-w-[16rem]" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Abrir menu</button>

            <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title font-semibold text-2xl text-center" id="offcanvasScrollingLabel">Genrencie a aplicação</h5>
                    <button type="button" className="btn-close " data-bs-dismiss="offcanvas" aria-label="Close">X</button>
                </div>
                <div className="offcanvas-body">
                    <AddTempoEntrega />
                    <AddTempoRetirar />
                </div>
            </div>
            <div className="flex flex-col items-center w-full">
                <h2>Pedidos em Andamento</h2>

            </div>
        </div>
    )
}

export default Dashboard;