import PropTypes from 'prop-types';



function ToggleButton({ selected, setSelected }) {
    ToggleButton.propTypes = {
        setSelected: PropTypes.func.isRequired,
        selected: PropTypes.bool.isRequired,
    };



    return (

        <div onClick={() => setSelected(!selected)} tabIndex={0} aria-label='Alternar o metodo de pagamento' className={`cursor-pointer  flex w-10 h-50  rounded-full transition-all duration-300 ${selected ? 'bg-green-600 shadow-inner ' : 'bg-gray-400'}`}>
            <span className={`h-5 w-5 rounded-full  transition-all duration-300 ${selected ? 'ml-5 bg-white active-shadow ' : 'bg-gray-300'}`}></span>
        </div>
    )
}

export default ToggleButton;