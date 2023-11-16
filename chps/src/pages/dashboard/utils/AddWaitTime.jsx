
import { useDispatch } from "react-redux";
import { BsArrowDown } from "react-icons/bs";
import { setTempoEntrega, setTempoRetirar } from "@services/redux/app/appSlice";
import { lazy, useState } from "react";

const FormTemposRetirada = lazy(() => import("./FormTemposRetirada"));
const FormTemposEntrega = lazy(() => import("./FormTemposEntrega"));

function AddTempoEntrega() {

    const [isDeliveryOpen, setDeliveryOpen] = useState(false);
    const [isPickUpOpen, setPickUpOpen] = useState(false);

    const dispatch = useDispatch();

    const handleSetTimeDelivery = (value) => {
        dispatch(setTempoEntrega(value))
    };

    const handleSetTimePickUp = (value) => {
        dispatch(setTempoRetirar(value))
    };

    return (

        <div className="flex flex-col items-center px-8">
            <button onClick={() => setDeliveryOpen(!isDeliveryOpen)} className={`flex items-center shadow-inner cursor-pointer hover:bg-gray-100 transition-all duration-300 font-semibold p-2 border-solid border-[1px] border-gray-300 rounded-md mt-4 text-gray-400`}>Definir tempo de entrega <BsArrowDown className={`${isDeliveryOpen ? 'rotate-180' : ''}`} size={20} /> </button>
            <span className={`${isDeliveryOpen ? 'flex' : 'hidden'} border-solid border-[1px] border-gray-300 rounded-md w-full justify-center mt-4 py-6 shadow-inner`}>
                <FormTemposEntrega handleSetTime={handleSetTimeDelivery} />
            </span>

            <button onClick={() => setPickUpOpen(!isPickUpOpen)} className={`flex items-center shadow-inner cursor-pointer hover:bg-gray-100 transition-all duration-300 font-semibold p-2 border-solid border-[1px] border-gray-300 rounded-md mt-4 text-gray-400`}>Definir tempo de retirada <BsArrowDown className={`${isPickUpOpen ? 'rotate-180' : ''}`} size={20} /></button>
            <span className={`${isPickUpOpen ? 'flex' : 'hidden'} border-solid border-[1px] border-gray-300 rounded-md w-full justify-center mt-4 py-6 shadow-inner`}>
                <FormTemposRetirada handleSetTime={handleSetTimePickUp} />
            </span>
        </div>
    )
}

export default AddTempoEntrega