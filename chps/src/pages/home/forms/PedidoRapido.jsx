import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function PedidoRapido() {

    const navigate = useNavigate();

    const handleAuthAnonymously = () => {
        localStorage.setItem("UserAnony", true)
        toast.warn("Não se esqueça de se registrar para participar de promoções e plano fidelidade")
        navigate("/menu")
    }

    return (
        <div className="relative top-14 flex flex-col items-center gap-2 ">
            <h2 className="text-2xl font-semibold">Está com muita fome?!</h2>
            <p>Faça seu pedido sem se cadastrar</p>
            <div>
                <button aria-label="Botão para fazer pedido sem cadastro" className="bg-[#FFBC0D] py-2 px-16 rounded-md font-semibold mt-2" onClick={handleAuthAnonymously}>Pedido Rápido</button>
            </div>
        </div>
    )
}

export default PedidoRapido;