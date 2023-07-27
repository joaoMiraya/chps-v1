import { useDispatch } from "react-redux";
import { redefinePassword } from "../../../services/redux/users/authSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function RedefinePassword() {
    const [emailToSend, setEmailToSend] = useState('');

    const dispatch = useDispatch();

    const handleSendEmailToRedefine = (e) => {
        e.preventDefault();
        dispatch(redefinePassword(emailToSend))
    };

    return (

        <div className="flex flex-col h-screen justify-center items-center">
            <ToastContainer />
            <form onSubmit={(e) => handleSendEmailToRedefine(e)}>
                <div className="flex flex-col w-full px-4 gap-8">
                    <h1 className="text-2xl font-semibold text-center">Insira o seu email de cadastro</h1>
                    <p>Será enviado um link no seu email para você alterar sua senha</p>
                    <input
                        aria-label="Digite o email cadastrado"
                        autoComplete="email"
                        className=" border-[1px] py-2 border-solid border-gray-300"
                        type="email"
                        name="emailToRedefine"
                        id="emailToRedefine"
                        placeholder="Digite o email cadastrado"
                        onChange={(e) => setEmailToSend(e.target.value)}
                        value={emailToSend}
                        required
                    />
                    <button aria-label="Botão para enviar link de redefinir senha" className="bg-black py-2 text-white font-semibold" type="submit">Enviar</button>
                </div>
            </form>
            <Link className="ml-6 mt-6 self-start" to={"/"}><span className="underline ">Voltar</span></Link>
        </div>
    )
}

export default RedefinePassword;