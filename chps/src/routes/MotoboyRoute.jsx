import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';

function MotoboyRoute({children}) {
    MotoboyRoute.propTypes = {
        children: PropTypes.object.isRequired,
    };

    const { isMotoboy } = useSelector((state) => state.auth);


    if (!isMotoboy) {
        const toastMessage = "Você precisa de permissão para acessar está página.";
        const customId = "custom-id-yes"
        toast.error(toastMessage, {
            toastId: customId
        });
        return <Navigate to={"/"} />
    } else {
        return children
    }

}

export default MotoboyRoute;