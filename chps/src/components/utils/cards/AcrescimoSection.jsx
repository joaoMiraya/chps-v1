import PropTypes from 'prop-types';
import { useEffect } from "react";
import { fetchAcrescimo } from "@services/redux/items/acrescimosSlice";
import { useDispatch, useSelector } from "react-redux";

function AcrescimoSection({ handleSelectAcrescimo, selectedAcrescimos }) {
    AcrescimoSection.propTypes = {
        handleSelectAcrescimo: PropTypes.func.isRequired,
        selectedAcrescimos: PropTypes.array.isRequired,
    };
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
                        <span aria-label={`Acrescentar ${acrescimo.nome}`} tabIndex={0} key={acrescimo.id}
                            onClick={() => handleSelectAcrescimo(acrescimo.id)}
                            className={`px-2 py-[2px] rounded-full cursor-pointer  ${selectedAcrescimos.includes(acrescimo.id) ? "border-[1px] border-solid border-green-400" : "border-[1px] border-solid border-gray-400"
                                }`}>
                            + {acrescimo.nome}
                        </span>

                    )
                })}
            </div>
        </>
    )
}

export default AcrescimoSection;