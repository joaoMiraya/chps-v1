import { useSelector } from "react-redux";


function LancheCard() {
    const { bgHeader } = useSelector((state) => state.images);



    return (
        <div className=" flex justify-center overflow-scroll items-center h-screen">
            <div className="flex ">

                {/* CARD LANCHE */}
                <div aria-label="Lanche Info" className="w-[8rem] h-[8rem] md:w-[14rem] md:h-[14rem] mr-4 rounded-xl shadow-xl " >
                    <img className=" rounded-md border-[1px] border-solid border-gray-300 " src={bgHeader} alt="nome do lanche" />
                    <div className=" text-start p-2">
                        <h2 className=" font-medium text-md">X-Calabresa Especial</h2>
                        <h2 className="text-start mt-2 font-semibold">R$ 20,00</h2>

                    </div>
                </div>


            </div>
        </div>
    )
}

export default LancheCard;