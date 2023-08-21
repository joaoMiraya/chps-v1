import AddLanche from "./utils/AddLanche";
import LanchesDashComp from "./LanchesDashComp";


function LanchesDash() {

        return (
            <div className=" flex flex-col px-12 my-6">
            <button className="btn btn-primary bg-black border-none max-w-[16rem]" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Abrir menu</button>

            <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title text-xl text-center" id="offcanvasScrollingLabel">Adicionar novo lanche</h5>
                    <button type="button" className="btn-close " data-bs-dismiss="offcanvas" aria-label="Close">X</button>
                </div>
                <div className="offcanvas-body">
                    <AddLanche />
                </div>
            </div>
            <div className="flex flex-col w-full">
                <h1 className="text-2xl font-semibold text-center">Lanches do Cardápio</h1>
                <LanchesDashComp />
            </div>
        </div>
    )
}


export default LanchesDash;