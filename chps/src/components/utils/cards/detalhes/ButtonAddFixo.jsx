import PropTypes from 'prop-types';
import { BiBlock } from 'react-icons/bi';

function ButtonAddFixo({ handleAddToCart, qnt }) {
    ButtonAddFixo.propTypes = {
        qnt: PropTypes.number.isRequired,
        handleAddToCart: PropTypes.func.isRequired,
    };
    return (

        <button onClick={handleAddToCart} disabled={qnt === 0} className={`w-full flex justify-center  py-3 text-xl font-medium fixed bottom-0 left-0 ${qnt === 0 ? 'bg-[#c1c1c1]' : 'bg-[#FFBC0D]'}`}>
            {qnt === 0 ? <BiBlock size={30} className="text-gray-400" /> : 'Adicionar ao carrinho'}
        </button>
    )
}

export default ButtonAddFixo;