import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";



export function AdminRoute({ children }) {
    AdminRoute.propTypes = {
        children: PropTypes.object.isRequired,
    };
    const { isAdm } = useSelector((state) => state.auth);


    if (isAdm) {
        return children
    } else {
        return <Navigate to={"/"} />
    }
}