import { useSelector } from "react-redux";
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineInfoCircle, AiOutlineCheck } from 'react-icons/ai';

function LancheDetalhes() {


    const { bgHeader } = useSelector((state) => state.images);
    return (
        <>
            <div className="p-4 w-full overflow-hidden">
                <div>
                    <IoIosArrowBack size={30} />
                </div>
                <div className="my-4">
                    <h1 className="text-3xl font-semibold">X-Calabresa Especial</h1>
                    <span>Valor und: 20,00</span>
                </div>
                <div className="">
                    <img src={bgHeader} alt="nome do lanche" />
                </div>
                <p className="text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore
                </p>
                <div className="flex flex-col items-center my-4 ">
                    {/* FAZER UM COMPONENTE PARA O BOTÃO */}
                    <div className="mb-6 border-[1px] border-solid border-gray-400 gap-4 flex px-2 py-[3px] rounded-2xl">
                        <button> - </button>
                        1
                        <button> + </button>
                    </div>
                    <h2 className="text-3xl font-semibold self-start mb-4">Acréscimos</h2>
                    {/* FAZER COMPONENTE PARA ACRESCIMOS */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        <span className="px-2 py-[2px] rounded-full border-[1px] border-solid border-gray-400">
                            + calabresa
                        </span>
                        <span className="px-2 py-[2px] rounded-full border-[1px] border-solid border-gray-400">
                            + calabresa
                        </span>
                        <span className="px-2 py-[2px] rounded-full border-[1px] border-solid border-gray-400">
                            + calabresa
                        </span>
                        <span className="px-2 py-[2px] rounded-full border-[1px] border-solid border-gray-400">
                            + calabresa
                        </span>
                        <span className="px-2 py-[2px] rounded-full border-[1px] border-solid border-gray-400">
                            + calabresa
                        </span>
                        <span className="px-2 py-[2px] rounded-full border-[1px] border-solid border-gray-400">
                            + calabresa
                        </span>
                    </div>
                    <div className="flex justify-center text-center my-4 bg-[#9C9C9C40] p-2 rounded-xl">
                        <span><AiOutlineInfoCircle color="#9C9C9C" size={25} />Você pode remover ingredientes adicionando uma nota na hora de finalizar o pedido</span>
                    </div>

                    <h2 className="text-3xl font-semibold self-start mb-4">Bebidas</h2>

                    <div className="flex container overflow-x-scroll ">
                        {/* FAZER COMPONENTE PARA BEBIDAS */}
                        <div className="flex gap-2 mb-4">
                            {/* FAZER A FUNÇÃO PARA ADICIONAR A CLASSE selectedCard E O SPAN QUANDO SELECIONADO */}
                            <div aria-label="Bebidas" className="w-[8rem] md:w-[14rem] md:h-[14rem] rounded-md relative" >
                               {/*  <span className="absolute top-0 right-0"><AiOutlineCheck className="bg-[#98FB98] rounded-md text-white text-xl" /></span> */}
                                <img className=" rounded-md shadow-xl border-[1px] mr-4 border-solid border-gray-300" src={bgHeader} alt="nome do lanche" />
                                <div className=" text-start p-2 ">
                                    <h2 className=" font-medium text-md">Coca-cola 2l</h2>
                                    <h2 className="text-start mt-2 font-semibold">R$ 12,00</h2>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
            <button className=" w-full bg-[#FFBC0D] py-3 text-xl font-medium  fixed bottom-0 left-0">Adicionar ao carrinho</button>

        </>
    )
}


export default LancheDetalhes;