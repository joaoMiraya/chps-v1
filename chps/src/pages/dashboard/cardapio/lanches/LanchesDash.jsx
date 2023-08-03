function LanchesDash() {
    return (
        <div className="flex mt-6 px-6">
            <div className="flex flex-col w-1/3">
                <h2 className="text-xl text-center">Adicionar novo lanche</h2>
                <div>
                    <form >
                        <div className="flex flex-col gap-2 mt-6">
                            <label htmlFor="imagemLanche">Escolha a imagem do lanche</label>
                            <input type="file" name="imagemLanche" id="nomeLanche" />

                            <label htmlFor="nomeLanche">Nome do Lanche</label>
                            <input className="border-b-[1px] border-gray-400 border-solid"
                                type="text"
                                name="nomeLanche"
                                id="nomeLanche"
                            />

                            <label htmlFor="descricaoLanche">Ingredientes do Lanche</label>
                            <input className="border-b-[1px] border-gray-400 border-solid"
                                type="text"
                                name="descricaoLanche"
                                id="nomeLanche"
                            />

                            <label htmlFor="valorLanche">Valor do Lanche</label>
                            <input className="border-b-[1px] border-gray-400 border-solid"
                                type="text"
                                name="valorLanche"
                                id="nomeLanche"
                            />
                            <button type="submit" className="bg-[#DB0007] text-white font-semibold py-2 rounded-md">Adicionar Lanche</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <h1 className="text-2xl font-semibold text-center">Lanches do Cardápio</h1>
            </div>
        </div>
    )
}


export default LanchesDash;