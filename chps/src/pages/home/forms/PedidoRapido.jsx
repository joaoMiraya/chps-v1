import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userAnonymous } from "../../../services/redux/users/authSlice";

function PedidoRapido() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAuthAnonymously = () => {
        dispatch(userAnonymous());
        navigate('/menu');
    };

    return (
        <div className="pt-12 flex flex-col items-center gap-2 ">
            <h2 className="text-2xl font-semibold">Está com muita fome?!</h2>
            <p>Faça seu pedido sem se cadastrar</p>
            <div>
                <button
                    aria-label="Faça pedidos sem cadastro"
                    className="bg-[#FFBC0D] py-3 px-20 text-xl w-full shadow-md rounded-md font-semibold mt-2"
                    onClick={handleAuthAnonymously}
                >
                    Pedido Rápido
                </button>
            </div>
        </div>
    )
}

export default PedidoRapido;