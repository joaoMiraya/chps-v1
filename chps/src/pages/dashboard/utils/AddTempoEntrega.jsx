
import { useDispatch, useSelector } from "react-redux";
import { setTempoEntrega } from "../../../services/redux/app/appSlice";
import { lazy } from "react";


const FormTemposEntrega = lazy(() => import("./FormTemposEntrega"));

function AddTempoEntrega() {


    const dispatch = useDispatch();

    const handleSetTime = (value) => {
        dispatch(setTempoEntrega(value))
    };
   
    return (

        <div >
            <h2 className="my-2 font-semibold">Definir tempo de entrega</h2>
            <FormTemposEntrega handleSetTime={handleSetTime} />
        </div>
    )
}

export default AddTempoEntrega