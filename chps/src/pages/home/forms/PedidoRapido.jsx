import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function PedidoRapido() {

    const navigate = useNavigate();

    const handleAuthAnonymously = () => {
        Cookies.set("UserAnonymous", true, { expires: 0.5 });
        toast.warn("Não se esqueça de se registrar para participar de promoções e plano fidelidade");
        navigate("/menu");
    };

    return (
        <div className="relative top-14 flex flex-col items-center gap-2 ">
            <h2 className="text-2xl font-semibold">Está com muita fome?!</h2>
            <p>Faça seu pedido sem se cadastrar</p>
            <div>
                <button
                    aria-label="Botão para fazer pedido sem cadastro"
                    className="bg-[#FFBC0D] py-3 px-20 mb-4 w-full  rounded-md font-semibold mt-2"
                    onClick={handleAuthAnonymously}
                >
                    Pedido Rápido
                </button>
            </div>
        </div>
    )
}

export default PedidoRapido;