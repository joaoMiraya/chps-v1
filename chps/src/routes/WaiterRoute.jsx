import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';

function WaiterRoute({ children }) {
    WaiterRoute.propTypes = {
        children: PropTypes.object.isRequired,
    };

    const { isWaiter, isAdm } = useSelector((state) => state.auth);


    if (isWaiter || isAdm) {
        return children
    } else {
        const toastMessage = "Você precisa de permissão para acessar está página.";
        const customId = "custom-id-yes"
        toast.error(toastMessage, {
            toastId: customId
        });
        return <Navigate to={"/"} />
    }

}

export default WaiterRoute;