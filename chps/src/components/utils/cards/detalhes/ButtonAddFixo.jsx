import PropTypes from 'prop-types';
import { BiBlock } from 'react-icons/bi';

function ButtonAddFixo({ handleAddToCart, qnt, disabled }) {
    ButtonAddFixo.propTypes = {
        qnt: PropTypes.number.isRequired,
        disabled: PropTypes.bool,
        handleAddToCart: PropTypes.func.isRequired,
    };
    return (

        <button onClick={handleAddToCart} disabled={qnt === 0 || disabled} className={`w-full flex justify-center  py-4 text-xl items-center fixed bottom-0 left-0 ${qnt === 0 || disabled ? 'bg-[#c1c1c1]' : 'bg-[#FFBC0D]'}`}>
            {qnt === 0 || disabled? <BiBlock size={30} className="text-gray-400" /> : 'Adicionar ao carrinho'}
        </button>
    )
}

export default ButtonAddFixo;