import PropTypes from 'prop-types';


function CardItemMesa({ urlImage, itemId, itemNome }) {
    CardItemMesa.propTypes = {
        urlImage: PropTypes.string.isRequired,
        itemId: PropTypes.string.isRequired,
        itemNome: PropTypes.string.isRequired
    };

    return (

        <>
            <div key={itemId} className='flex items-center mt-2 border-[1px] border-solid shadow rounded-md border-gray-300 flex-grow'>
                <img className='w-[6rem] rounded-l-md h-[4rem] rounded-full bg-orange-200' src={urlImage} alt="" />
                <h2 className='font-semibold px-6'>{itemNome}</h2>
            </div>
        </>
    )
}

export default CardItemMesa;