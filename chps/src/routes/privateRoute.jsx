import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';


export function PrivateRoute({ children }) {
    PrivateRoute.propTypes = {
        children: PropTypes.object.isRequired,
    };
    const { isLogged } = useSelector((state) => state.auth);


    if (!isLogged) {
        const toastMessage = "Você precisa fazer login para acessar esta página.";
        toast.warn(toastMessage);
        return <Navigate to={"/"} />
    } else {
        return children
    }
}

export default PrivateRoute;