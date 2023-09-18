
import { useDispatch } from "react-redux";
import { setTempoRetirar } from "../../../services/redux/app/appSlice";
import { lazy } from "react";


const FormTemposRetirada = lazy(() => import("./FormTemposRetirada"));

function AddTempoRetirar() {


    const dispatch = useDispatch();

    const handleSetTime = (value) => {
        dispatch(setTempoRetirar(value))
    };

    return (

        <div >
            <h2 className="my-2 font-semibold">Definir tempo para retirar</h2>
            <FormTemposRetirada handleSetTime={handleSetTime} />
        </div>
    )
}

export default AddTempoRetirar