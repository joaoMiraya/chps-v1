import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function MesaPlaceholder({ id }) {
    MesaPlaceholder.propTypes = {
        id: PropTypes.string.isRequired
    };

    return (

        <>
            <div className="flex flex-col gap-4 items-center">
                <div className="w-[16rem] rounded-lg h-[3rem] bg-gray-200 animate-pulse">


                </div>
                <div className="w-[16rem] rounded-lg h-[3rem] bg-gray-200 animate-pulse">


                </div>
                <div className="w-[16rem] rounded-lg h-[3rem] bg-gray-200 animate-pulse">


                </div>
                <p>Sem pedidos na mesa!</p>
                <Link tabIndex={0} className='py-2 px-12 shadow-md text-white font-semibold rounded-md bg-red-400 text-md' to={`/mesas/${id}/pedir`}>
                    Pedir
                </Link>
            </div>
        </>
    )
}

export default MesaPlaceholder;