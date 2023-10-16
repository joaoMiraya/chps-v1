import { Link } from 'react-router-dom';
import icon from '/android/android-launchericon-48-48.png'
import PropTypes from 'prop-types';

function MesaCard({ mesaNumero }) {
    MesaCard.propTypes = {
        mesaNumero: PropTypes.number.isRequired,
    }

    return (

        <Link to={`/mesas/${mesaNumero}`} className="flex rounded-xl w-[10rem]  relative items-center shadow-md cursor-pointer hover:scale-105 transition-all duration-300  gap-2 ">
            <span className=" mesaDefault flex justify-center items-center w-[4rem] h-[4rem] relative top-1/2">
                <img className='absolute' src={icon} alt="" />
            </span>
            <span className={`absolute shadow-inner right-2 top-2 w-[.7rem] h-[.7rem]  bg-gray-300 rounded-full`}></span>
            <h2 className='text-xl text-center font-semibold'>Mesa {mesaNumero}</h2>
        </Link>
    )
}

export default MesaCard;