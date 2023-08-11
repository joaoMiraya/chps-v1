import AddBebida from "./utils/addBebidas";
import Bebidas from "./BebidasDashComp";

function BebidasDash() {

    return (
        <div className="flex">
            <div className="flex flex-col w-1/3 h-screen p-6 border-r-2 border-gray-300 border-solid shadow-2xl">
                <h2 className="text-xl text-center">Adicionar nova bebida</h2>
                <AddBebida />
            </div>
            <div className="flex flex-col w-full">
                <h1 className="text-2xl font-semibold text-center">Bebidas do Cardápio</h1>
                <Bebidas />
            </div>
        </div>
    )
}


export default BebidasDash;