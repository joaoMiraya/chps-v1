import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";



export function PrivateRoute({ children }) {
    PrivateRoute.propTypes = {
        children: PropTypes.object.isRequired,
    };
    const { isLogged } = useSelector((state) => state.auth);


    if (!isLogged) {
        return <Navigate to={"/"} />
    } else {
        return children
    }
}