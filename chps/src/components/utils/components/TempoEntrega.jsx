import { useEffect, useState } from "react";
import MotoboySvg from "../../../assets/MotoboySvg";
import { AiOutlineClose, AiOutlineFieldTime } from 'react-icons/ai';
import { useDispatch, useSelector } from "react-redux";
import { fetchWaitTime } from "../../../services/redux/app/appSlice";

function TempoEntrega() {


    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const { tempoEntregar, tempoRetirar, appOnline } = useSelector(state => state.app);

    useEffect(() => {
        if (open) {
            dispatch(fetchWaitTime())
        }
    }, [open, dispatch])

    return (

        <div className={`${appOnline ? 'block' : 'hidden'}`}>
            <div className={`${open ? 'w-full' : ''} fixed bottom-28 z-20`}>
                <button aria-label="Ver quanto tempo de espera" onClick={() => setOpen(!open)} className={`${open ? ' hidden' : ' flex '} ml-2 p-2 shadow-inner justify-center items-center border-4 border-solid border-white bg-yellow-500 text-center rounded-full  `}>
                    <AiOutlineFieldTime className="text-white" size={50} />
                </button>
                <div className={`${open ? 'bgSvgClass' : ' hidden '}  bg-[#FFBC0D] pl-4 h-[6rem]`}>
                    <AiOutlineClose tabIndex={0} aria-label="Fechar menu" onClick={() => setOpen(!open)} className="absolute cursor-pointer right-4 text-red-500 top-2" size={25} />
                    <div className="">
                        <MotoboySvg />
                    </div>
                    <h2 className="font-bold absolute left-12 top-2 z-20">Entregar {tempoEntregar}</h2>
                    <h2 className="font-bold absolute right-12 top-12 z-20">Retirar {tempoRetirar}</h2>
                </div>
            </div>
        </div>
    )
}

export default TempoEntrega;