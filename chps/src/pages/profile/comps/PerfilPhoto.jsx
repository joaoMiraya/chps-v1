import PropTypes from 'prop-types';


function PerfilPhoto({ letter }) {
    PerfilPhoto.propTypes = {
        letter: PropTypes.string.isRequired,
    }
    return (

        <div className="w-[8rem] h-[8rem] absolute top-6 flex justify-center items-center rounded-full bg-gray-200">
            <h1 className="text-5xl font-bold">{letter}</h1>
        </div>
    )
}

export default PerfilPhoto;