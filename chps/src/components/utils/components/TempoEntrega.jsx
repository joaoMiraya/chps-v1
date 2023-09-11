import { useState } from "react";
import MotoboySvg from "../../../assets/MotoboySvg";
import { AiOutlineClose, AiOutlineFieldTime } from 'react-icons/ai';
import { useSelector } from "react-redux";




function TempoEntrega() {


    const [open, setOpen] = useState(false);

    const { tempoEntregar, tempoRetirar } = useSelector(state => state.app)


    return (

        <>
            <div className={`${open ? 'w-full' : ''} fixed bottom-28 z-20`}>
                <button aria-label="Ver quanto tempo de espera" onClick={() => setOpen(!open)} className={`${open ? ' hidden' : ' flex '} ml-2 p-2 shadow-xl justify-center items-center  bg-yellow-500 text-center rounded-full  `}>
                    <AiOutlineFieldTime className="text-white" size={50} />
                </button>
                <div className={`${open ? 'bgSvgClass' : ' hidden '} rounded-l-xl bg-[#FFBC0D] border-2 border-solid border-yellow-500 pl-4 h-[6rem]`}>
                    <AiOutlineClose tabIndex={0} aria-label="Fechar menu" onClick={() => setOpen(!open)} className="absolute cursor-pointer right-4 text-red-500 top-2" size={25} />
                    <div className="">
                        <MotoboySvg />
                    </div>
                    <h2 className="font-bold absolute left-12 top-2 z-20">Entregar {tempoEntregar}</h2>
                    <h2 className="font-bold absolute right-12 top-12 z-20">Retirar {tempoRetirar}</h2>
                </div>
            </div>
        </>
    )
}

export default TempoEntrega;