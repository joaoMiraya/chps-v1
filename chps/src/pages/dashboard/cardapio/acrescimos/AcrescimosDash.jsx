import AcrescimosAdd from "./AcrescimosAdd";
import AcrescimosForDetail from "./AcrescimosForDash";

function AcrescimosDash() {


    return (

        <div className="flex">
            <div className="flex flex-col w-1/3 h-screen p-6 border-r-2 border-gray-300 border-solid shadow-2xl">
                <h2 className="text-xl text-center">Adicionar novo Acréscimo</h2>
                <AcrescimosAdd />
            </div>
            <div className="flex flex-col w-full">
                <h1 className="text-2xl font-semibold text-center">Acréscimos do Cardápio</h1>
                <AcrescimosForDetail />
            </div>
        </div>
    )
}


export default AcrescimosDash;