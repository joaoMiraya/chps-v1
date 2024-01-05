import proptypes from 'prop-types';

function ValorPago({ setOpen, open, valorPago, setValorPago, handlePartialPayment }) {
    ValorPago.propTypes = {
        setOpen: proptypes.func.isRequired,
        open: proptypes.bool.isRequired,
        valorPago: proptypes.string.isRequired,
        setValorPago: proptypes.func.isRequired,
        handlePartialPayment: proptypes.func.isRequired,
    };

    return (

        <>
            <button onClick={() => setOpen(!open)} className={`${open ? 'hidden' : ''} hover:opacity-80 mr-4 self-end bg-red-500 py-2 px-4 rounded-md font-semibold text-white `}>Descontar um valor?</button>
            <div className={`${open ? 'flex' : 'hidden'}  justify-end`}>
                <form onSubmit={(e) => handlePartialPayment(e)}>
                    <div className='flex flex-col gap-2 max-w-[8rem]'>
                        <label htmlFor="valorPago">Insira um valor para descontar:</label>
                        <input
                            className='border-[1px] border-solid border-gray-300'
                            value={valorPago}
                            onChange={(e) => setValorPago(e.target.value)}
                            type="number"
                            name="valorPago"
                            id="valorPago"
                        />
                        <button type="submit" className="hover:opacity-80 bg-orange-500 rounded-md py-2 px-6 font-semibold text-white">Descontar</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ValorPago;