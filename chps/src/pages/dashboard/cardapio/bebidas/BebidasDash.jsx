import { lazy } from "react";


const AddBebida = lazy(() => import("./utils/addBebidas"));

const BebidasDashComp = lazy(() => import("./BebidasDashComp"));

function BebidasDash() {

    return (
        <div className=" flex flex-col px-12 my-6">
            <button className="btn btn-primary bg-black border-none max-w-[16rem]" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Adicionar novo</button>

            <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title text-xl text-center" id="offcanvasScrollingLabel">Adicionar nova bebida</h5>
                    <button type="button" className="btn-close " data-bs-dismiss="offcanvas" aria-label="Close">X</button>
                </div>
                <div className="offcanvas-body">
                    <AddBebida />
                </div>
            </div>
            <div className="flex flex-col w-full">
                <h1 className="text-2xl font-semibold text-center">Bebidas do Cardápio</h1>
                <BebidasDashComp />
            </div>
        </div>
    )
}


export default BebidasDash;