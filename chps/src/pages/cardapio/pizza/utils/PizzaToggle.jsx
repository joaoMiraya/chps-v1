import PropTypes from 'prop-types';


function PizzaToggle({ sizeF, setSizeF, umSabor, setUmSabor }) {
    PizzaToggle.propTypes = {
        setSizeF: PropTypes.func.isRequired,
        sizeF: PropTypes.bool.isRequired,
        setUmSabor: PropTypes.func.isRequired,
        umSabor: PropTypes.bool.isRequired,
    }
    return (

        <div>
            <div onClick={() => setSizeF(!sizeF)} tabIndex={0} aria-label='Alternar tamanho da pizza' className={`flex w-[16rem] h-[3rem] shadow-inner  rounded-full transition-all duration-300 bg-gray-200`}>
                <span className={`w-[8rem] cursor-pointer h-[3rem]  rounded-full shadow-sm transition-all duration-300 flex items-center justify-center font-semibold bg-[#FFBC0D] ${sizeF ? 'ml-[8rem]' : ''}`}>
                    {sizeF ? 'Família' : 'Individual'}
                </span>
            </div>

            <div onClick={() => setUmSabor(!umSabor)} tabIndex={0} aria-label='Alternar quantidade de sabor da pizza' className={`flex w-[16rem] h-[3rem] shadow-inner  mt-4 rounded-full transition-all duration-300 bg-gray-200`}>
                <span className={`w-[8rem] h-[3rem]  cursor-pointer rounded-full shadow-sm  transition-all duration-300 flex items-center justify-center font-semibold bg-[#FFBC0D] ${umSabor ? 'ml-[8rem]' : ''}`}>
                    {umSabor ? 'Um sabor' : 'Dois Sabores'}
                </span>
            </div>

        </div>
    )
}

export default PizzaToggle;