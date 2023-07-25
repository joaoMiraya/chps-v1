import { useSelector } from "react-redux";
import { AiOutlineInfoCircle} from 'react-icons/ai';
import BebidasSection from "../BebidasSection";
import AcrescimoSection from "../AcrescimoSection";
import IncresDecresBtn from "../../buttons/IncresDecresBtn";


function LancheDetalhes() {

    const { bgHeader } = useSelector((state) => state.images);
    return (
        <>
            <div className="p-4 w-full overflow-hidden">
             
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
                    <IncresDecresBtn />
                    <AcrescimoSection />
                    <div className="flex justify-center text-center my-4 bg-[#9C9C9C40] p-2 rounded-xl">
                        <span><AiOutlineInfoCircle color="#9C9C9C" size={25} />Você pode remover ingredientes adicionando uma nota na hora de finalizar o pedido</span>
                    </div>
                    <BebidasSection />
                </div>

            </div>
            <button className=" w-full bg-[#FFBC0D] py-3 text-xl font-medium  fixed bottom-0 left-0">Adicionar ao carrinho</button>

        </>
    )
}


export default LancheDetalhes;