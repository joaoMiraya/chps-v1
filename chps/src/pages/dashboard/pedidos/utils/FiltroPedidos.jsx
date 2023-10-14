import PropTypes from 'prop-types';

function FiltroPedidos({ setOrderConfig }) {
    FiltroPedidos.propTypes = {
        setOrderConfig: PropTypes.func.isRequired,
    }

    return (
        <>
            <div className="flex flex-col items-start self-start bg-gray-200 p-2 rounded-lg shadow-inner">
                <h2 className='text-xl font-semibold'>Filtre os pedidos</h2>
                <span className="flex flex-row-reverse justify-start items-center gap-2 ">
                    <label className="cursor-pointer" htmlFor="entregas">Entregas</label>
                    <input
                        onClick={() => setOrderConfig(1)}
                        className="cursor-pointer"
                        type="radio"
                        name="pedidos"
                        id="entregas"
                    />
                </span>
                <span className="flex flex-row-reverse justify-start items-center gap-2 ">
                    <label className="cursor-pointer" htmlFor="mesas">Mesas</label>
                    <input
                        onClick={() => setOrderConfig(2)}
                        className="cursor-pointer"
                        type="radio"
                        name="pedidos"
                        id="mesas"
                    />
                </span>
                <span className="flex flex-row-reverse justify-start items-center gap-2 ">
                    <label className="cursor-pointer" htmlFor="retirar">Retirar</label>
                    <input
                        onClick={() => setOrderConfig(3)}
                        className="cursor-pointer"
                        type="radio"
                        name="pedidos"
                        id="retirar"
                    />
                </span>
            </div>
        </>
    )
}

export default FiltroPedidos;