import { useState } from "react";
import MotoboySvg from "../MotoboySvg";
import { AiOutlineClose, AiOutlineFieldTime } from 'react-icons/ai';




function TempoEntrega() {


    const [open, setOpen] = useState(false);


    return (

        <>
            <div className={`${open ? 'w-full' : ''} fixed bottom-16 z-20`}>
                <button aria-label="Ver quanto tempo de espera" onClick={() => setOpen(!open)} className={`${open ? ' hidden' : ' flex '} ml-4 p-2 shadow-xl justify-center items-center  bg-yellow-500 text-center rounded-full  `}>
                    <AiOutlineFieldTime className="text-white" size={50} />
                </button>
                <div className={`${open ? 'bgSvgClass' : ' hidden '} rounded-l-xl bg-[#FFBC0D] border-2 border-solid border-yellow-500 pl-4 h-[6rem]`}>
                    <AiOutlineClose tabIndex={0} aria-label="Fechar menu" onClick={() => setOpen(!open)} className="absolute right-4 text-red-500 top-2" size={25} />
                    <div className="">
                        <MotoboySvg />
                    </div>
                    <h2 className="font-bold absolute left-12 top-2 z-20">Tempo de entrega de 30 minutos</h2>
                </div>
            </div>
        </>
    )
}

export default TempoEntrega;