import { useSelector } from "react-redux";
import { AiOutlineCheck } from 'react-icons/ai';

function BebidasSection() {

    const { bgHeader } = useSelector((state) => state.images);

    return (

        <>
            <h2 className="text-3xl font-semibold self-start mb-4">Bebidas</h2>

            <div className="flex container overflow-x-scroll ">
                {/* FAZER COMPONENTE PARA BEBIDAS */}
                <div className="flex gap-2 mb-4">
                    {/* FAZER A FUNÇÃO PARA ADICIONAR A CLASSE selectedCard E O SPAN QUANDO SELECIONADO */}
                    <div aria-label="Bebidas" className="w-[8rem] md:w-[14rem] md:h-[14rem] rounded-md relative" >
                        <span className="absolute top-0 right-0"><AiOutlineCheck className="bg-[#98FB98] rounded-md text-white text-xl" /></span>
                        <img className="selectedCard rounded-md shadow-xl mr-4 " src={bgHeader} alt="nome do lanche" />
                        <div className=" text-start p-2 ">
                            <h2 className=" font-medium text-md">Coca-cola 2l</h2>
                            <h2 className="text-start mt-2 font-semibold">R$ 12,00</h2>
                        </div>
                    </div>
                    <div aria-label="Bebidas" className="w-[8rem] md:w-[14rem] md:h-[14rem] rounded-md relative" >
                        <span className="hidden absolute top-0 right-0"><AiOutlineCheck className="bg-[#98FB98] rounded-md text-white text-xl" /></span>
                        <img className="rounded-md shadow-xl border-[1px] mr-4 border-solid border-gray-300" src={bgHeader} alt="nome do lanche" />
                        <div className=" text-start p-2 ">
                            <h2 className=" font-medium text-md">Coca-cola 2l</h2>
                            <h2 className="text-start mt-2 font-semibold">R$ 12,00</h2>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default BebidasSection;