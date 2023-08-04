import AddLanche from "./utils/AddLanche";

function LanchesDash() {
    return (
        <div className="flex mt-6 px-6">
            <div className="flex flex-col w-1/3">
                <h2 className="text-xl text-center">Adicionar novo lanche</h2>
                <AddLanche />
            </div>
            <div className="flex flex-col w-full">
                <h1 className="text-2xl font-semibold text-center">Lanches do Cardápio</h1>
            </div>
        </div>
    )
}


export default LanchesDash;