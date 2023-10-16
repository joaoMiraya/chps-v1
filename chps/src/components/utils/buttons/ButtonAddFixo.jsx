import PropTypes from 'prop-types';
import { BiBlock } from 'react-icons/bi';

function ButtonAddFixo({ handleFunc, qnt, disabled, text }) {
    ButtonAddFixo.propTypes = {
        text: PropTypes.string.isRequired,
        qnt: PropTypes.number.isRequired,
        disabled: PropTypes.bool,
        handleFunc: PropTypes.func.isRequired,
    };
    return (

        <button onClick={handleFunc} disabled={qnt === 0 || disabled} className={`w-full flex justify-center py-4 text-xl items-center fixed bottom-0 left-0 ${qnt === 0 || disabled ? 'bg-[#c1c1c1]' : 'bg-[#FFBC0D]'}`}>
            {qnt === 0 || disabled ? <BiBlock size={30} className="text-gray-400" /> : text}
        </button>
    )
}

export default ButtonAddFixo;