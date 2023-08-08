import AddLanche from "./utils/AddLanche";
import LanchesDashComp from "./LanchesDashComp";


function LanchesDash() {

        return (
        <div className="flex">
            <div className="flex flex-col w-1/3 h-screen p-6 border-r-2 border-gray-300 border-solid shadow-2xl">
                <h2 className="text-xl text-center">Adicionar novo lanche</h2>
                <AddLanche />
            </div>
            <div className="flex flex-col w-full">
                <h1 className="text-2xl font-semibold text-center">Lanches do Cardápio</h1>
                <LanchesDashComp />
            </div>
        </div>
    )
}


export default LanchesDash;