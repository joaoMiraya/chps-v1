import { useDispatch } from "react-redux";
import { deleteUserAccount } from "../../../services/redux/users/authSlice";

function FormEndPerfil() {
    const dispatch = useDispatch();

    const handleDeleteAccount = () => {
        dispatch(deleteUserAccount())
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
                <span onClick={handleDeleteAccount} className="underline">Excluir conta</span>
            </div>

        </div>
    )
}

export default FormEndPerfil;