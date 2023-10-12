import PropTypes from 'prop-types';


function PorcaoToggle({ inteira, setInteira }) {
    PorcaoToggle.propTypes = {
        setInteira: PropTypes.func.isRequired,
        inteira: PropTypes.bool.isRequired,
    };

    return (

        <div className='flex flex-col items-center justify-center my-4'>
            <h2 className='text-xl font-semibold my-2'>Selecione o tamanho:</h2>
            <div onClick={() => setInteira(!inteira)} tabIndex={0} aria-label='Alternar tamanho da pizza' className={`flex w-[16rem] h-[3rem] shadow-inner  rounded-full transition-all duration-300 bg-gray-200`}>
                <span className={`w-[8rem] cursor-pointer h-[3rem]  rounded-full shadow-sm transition-all duration-300 flex items-center justify-center font-semibold bg-[#FFBC0D] ${inteira ? 'ml-[8rem]' : ''}`}>
                    {inteira ? 'Inteira' : 'Meia'}
                </span>
            </div>
        </div>
    )
}

export default PorcaoToggle;