import { useDispatch, useSelector } from "react-redux";
import { deleteUserAccount, fetchUsers } from "../../../services/redux/users/authSlice";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../services/firebase/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Cookies from "js-cookie";


function FormEndPerfil() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    const user = JSON.parse(Cookies.get("User"));
    const { users } = useSelector(state => state.auth);
    const usuario = users.find(usuario => usuario.email == user?.email)
    const id = usuario?.id;


    //RESPONSÁVEL POR EXCLUIR OS DADOS DO USUARIO NO FIRESTORE E DISPACHAR A FUNÇÃO PARA EXCLUIR A AUTENTICAÇÃO
    const handleDeleteAccount = async () => {
        await deleteDoc(doc(db, "usuarios", id));
        toast.error("Conta apagada")
        dispatch(deleteUserAccount())
        setTimeout(() => {
            navigate("/")
            window.location.reload();
        }, 2500)
    };

    return (

        <div className="flex flex-col items-center mx-6">
            <h2 className="text-2xl font-semibold text-center">Salvar endereço padrão para entregas</h2>
            <span className="text-sm text-center">Fique tranquilo que você poderá alterar o endereço ao finalizar o pedido caso não esteja no endereço padrão.</span>
            <form >
                <div className="flex flex-col">
                    <label htmlFor="bairroDefault">Bairro:</label>
                    <input className="border-b-[1px] border-solid border-gray-300 mb-2" name="bairroDefault" id="bairroDefault" type="text" />

                    <label htmlFor="ruaDefault">Rua:</label>
                    <input className="border-b-[1px] border-solid border-gray-300 mb-2" name="ruaDefault" id="ruaDefault" type="text" />

                    <label htmlFor="numeroCasaDefault">Número da casa:</label>
                    <input className="border-b-[1px] border-solid border-gray-300 mb-2" name="numeroCasaDefault" id="numeroCasaDefault" type="text" />

                    <label htmlFor="referenciaDefault">Referência: <span className="text-sm">(Opcional)</span></label>
                    <input className="border-b-[1px] border-solid border-gray-300 mb-2" name="referenciaDefault" id="referenciaDefault" type="text" placeholder="Ajuda seu pedido chegar mais rápido" />

                    <div className="flex flex-row-reverse gap-4 my-4">
                        <label htmlFor="confirmCity">Você está em Álvares Machado ou proximidades?</label>
                        <input type="checkbox" name="confirmCity" id="confirmCity" checked readOnly />
                    </div>
                    <button className=" text-xl font-semibold py-2 bg-[#FFBC0D]" type="submit">Salvar</button>
                </div>
            </form>

            <div className="mt-12 self-end text-gray-400">
                <button onClick={handleDeleteAccount} className="underline cursor-pointer">Excluir conta</button>
            </div>

        </div>
    )
}

export default FormEndPerfil;