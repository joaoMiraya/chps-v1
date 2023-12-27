import { useEffect } from "react";
import { fetchAcrescimo } from '../../../../services/redux/items/acrescimosSlice';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function AcrescimosForDash() {

    const dispatch = useDispatch();


    const { acrescimos } = useSelector(state => state.acrescimos);


    useEffect(() => {
        dispatch(fetchAcrescimo());
    }, [dispatch]);


    return (

        <div className="flex justify-center gap-4 mt-6 flex-wrap">
            {acrescimos.map((acrescimo) => {
                return (
                    <div className="bg-white p-8 border-[1px] border-solid border-gray-200 min-w-[16rem] flex flex-col "
                        key={acrescimo.id}>
                        <Link to={`/dashboard/acrescimos/${acrescimo.id}`}>
                            <div className="flex flex-col items-center justify-between">
                                <p className="font-semibold">{acrescimo.nome}</p>
                                <p className="font-semibold">Valor: {Number(acrescimo.valor).toFixed(2).replace('.', ',')} </p>
                            </div>

                        </Link>
                    </div>
                )
            })}
        </div>
    )
}


export default AcrescimosForDash;