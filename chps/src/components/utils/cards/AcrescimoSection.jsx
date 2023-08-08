import { useEffect } from "react";
import { fetchAcrescimo } from "../../../services/redux/items/acrescimosSlice";
import { useDispatch, useSelector } from "react-redux";

function AcrescimoSection() {

    const dispatch = useDispatch();


    const { acrescimos } = useSelector(state => state.acrescimos);


    useEffect(() => {
        dispatch(fetchAcrescimo());
    }, [dispatch]);

    return (
        <>
            <h2 className="text-3xl font-semibold self-start mb-4">Acréscimos</h2>
            <div className="flex flex-wrap gap-2 justify-center">
                {acrescimos.map((acrescimo) => {
                    return (
                        <span key={acrescimo.id} className="px-2 py-[2px] rounded-full border-[1px] border-solid border-gray-400">
                            + {acrescimo.nome}
                        </span>

                    )
                })}
            </div>
        </>
    )
}

export default AcrescimoSection;