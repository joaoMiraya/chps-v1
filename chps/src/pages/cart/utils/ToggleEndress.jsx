import PropTypes from 'prop-types';



function ToggleEndress({  autoEnd, setAutoEnd }) {
    ToggleEndress.propTypes = {
        setAutoEnd: PropTypes.func.isRequired,
        autoEnd: PropTypes.bool.isRequired,
    };



    return (

        <div onClick={() => setAutoEnd(!autoEnd)} tabIndex={0} aria-label='Alternar o metodo de pagamento' className={`flex w-10 h-50  rounded-full transition-all duration-300 ${autoEnd ? 'bg-green-600 shadow-inner ' : 'bg-gray-400'}`}>
            <span className={`h-5 w-5 rounded-full  transition-all duration-300 ${autoEnd ? 'ml-5 bg-white active-shadow ' : 'bg-gray-300'}`}></span>
        </div>
    )
}

export default ToggleEndress;