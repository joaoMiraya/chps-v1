import PropTypes from 'prop-types';


function AcrescimoSection({ quantities, setQuantities, acrescimos }) {
    AcrescimoSection.propTypes = {
        setQuantities: PropTypes.func.isRequired,
        quantities: PropTypes.object.isRequired,
        acrescimos: PropTypes.array.isRequired,
    };

    const handleDecrease = (acrescimoId) => {
        setQuantities((prevQuantities) => {
            const updatedQuantities = {
                ...prevQuantities,
                [acrescimoId]: Math.max(0, (prevQuantities[acrescimoId] || 0) - 1),
            };
            if (updatedQuantities[acrescimoId] === 0) {
                delete updatedQuantities[acrescimoId];
            }

            return updatedQuantities;
        });
    };

    const handleIncrease = (acrescimoId) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [acrescimoId]: (prevQuantities[acrescimoId] || 0) + 1
        }));
    };

    return (
        <>
            <h2 className="text-3xl font-semibold self-start mb-2">Acréscimos</h2>
            <div className="flex flex-wrap max-h-[20rem] overflow-y-auto gap-2 px-4 justify-center border-[1px] border-solid border-gray-200 py-4 bg-gray-100 shadow-inner">
                {acrescimos.map((acrescimo) => (
                    <span
                        aria-label={`Acrescentar ${acrescimo.nome}`}
                        tabIndex={0}
                        key={acrescimo.id}
                        className={`p-2 flex justify-between items-center rounded-md shadow-md w-full bg-white `}
                    >
                        <span className="flex flex-col">
                            <p className="font-semibold">{acrescimo.nome}</p>
                            <p className="text-green-400 font-semibold">R${Number(acrescimo.valor).toFixed(2).replace('.', ',')} </p>
                        </span>

                        <div className=" border-[1px] border-solid border-gray-400 gap-4 flex px-2 py-[3px] rounded-2xl">
                            <button
                                aria-label="Botão para diminuir a quantidade"
                                className={`${(quantities[acrescimo.id] || 0) === 0 ? ' opacity-0' : ''}`}
                                onClick={() => handleDecrease(acrescimo.id)}
                                disabled={(quantities[acrescimo.id] || 0) === 0}
                            >
                                -
                            </button>
                            {quantities[acrescimo.id] || 0}
                            <button
                                aria-label="Botão para aumentar a quantidade"
                                className=""
                                onClick={() => handleIncrease(acrescimo.id)}
                            >
                                +
                            </button>
                        </div>

                    </span>
                ))}
            </div>
        </>
    );
}

export default AcrescimoSection;
