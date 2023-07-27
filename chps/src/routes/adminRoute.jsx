import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";



export function AdminRoute({ children }) {
    AdminRoute.propTypes = {
        children: PropTypes.object.isRequired,
    };
    const { isAdm } = useSelector((state) => state.auth);


    if (isAdm) {
        return children
    } else {
        const toastMessage = "Você não está autorizado a entrar nesse caminho!";
        const customId = "custom-id-yes"
        toast.error(toastMessage, {
            toastId: customId
        });
        return <Navigate to={"/"} />
    }
}