import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Cookies from "js-cookie";
import { deleteDoc, doc } from "firebase/firestore";

import { deleteUserAccount, fetchUsers, addEndress } from "../../../services/redux/users/usersSlice";
import { db } from "../../../services/firebase/firebase";


const schema = yup.object().shape({
    bairroDefault: yup.string().min(3, 'Caracteres insuficiente').required("Campo obrigatório"),
    ruaDefault: yup.string().min(3, 'Caracteres insuficiente').required("Campo obrigatório"),
    numeroCasaDefault: yup.string().required("Campo obrigatório"),
    referenciaDefault: yup.string(),
});

function FormEndPerfil() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    const user = JSON.parse(Cookies.get("User"));
    const { users } = useSelector(state => state.users);
    const usuario = users.find(usuario => usuario.email == user?.email)
    const id = usuario?.id;

    const { register,
        handleSubmit,
        formState,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const values = {
                id: id,
                bairro: data.bairroDefault,
                rua: data.ruaDefault,
                numero_casa: data.numeroCasaDefault,
                referencia: data.referenciaDefault,
            };
            // Faça a chamada assíncrona para criar o usuário
            dispatch(addEndress(values));
            // Resete o formulário se a submissão for bem-sucedida
            reset({
                bairroDefault: "",
                ruaDefault: "",
                numeroCasaDefault: "",
                referenciaDefault: "",
            });
        } catch (error) {
            console.error("Ocorreu um erro ao tentar adicionar seu endereço: ", error);
        }
    };


    //RESPONSÁVEL POR EXCLUIR OS DADOS DO USUARIO NO FIRESTORE E DISPACHAR A FUNÇÃO PARA EXCLUIR A AUTENTICAÇÃO
    const handleDeleteAccount = async () => {
        await deleteDoc(doc(db, "usuarios", id));
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

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col">
                    <label htmlFor="bairroDefault">Bairro:</label>
                    <input
                        aria-label="Digite aqui o seu bairro"
                        className="border-b-[1px] border-solid border-gray-300 mb-2"
                        name="bairroDefault"
                        id="bairroDefault"
                        type="text"
                        placeholder={usuario?.bairro ? usuario.bairro : ''}
                        {...register("bairroDefault")}
                    />
                    <p className=' text-sm text-center  text-red-400'>{errors.bairroDefault?.message}</p>

                    <label htmlFor="ruaDefault">Rua:</label>
                    <input
                        aria-label="Digite aqui a sua rua"
                        className="border-b-[1px] border-solid border-gray-300 mb-2"
                        name="ruaDefault"
                        id="ruaDefault"
                        type="text"
                        placeholder={usuario?.rua ? usuario.rua : ''}
                        {...register("ruaDefault")}
                    />
                    <p className=' text-sm text-center  text-red-400'>{errors.ruaDefault?.message}</p>

                    <label htmlFor="numeroCasaDefault">Número da casa:</label>
                    <input
                        aria-label="Digite aqui o seu complemento"
                        className="border-b-[1px] border-solid border-gray-300 mb-2"
                        name="numeroCasaDefault"
                        id="numeroCasaDefault"
                        placeholder={usuario?.numero_casa ? usuario.numero_casa : ''}
                        type="text"
                        {...register("numeroCasaDefault")}
                    />
                    <p className=' text-sm text-center  text-red-400'>{errors.numeroCasaDefault?.message}</p>

                    <label htmlFor="referenciaDefault">Referência: <span className="text-sm">(Opcional)</span></label>
                    <input
                        aria-label="Digite aqui a referencia"
                        className="border-b-[1px] border-solid border-gray-300 mb-2"
                        name="referenciaDefault"
                        id="referenciaDefault"
                        type="text"
                        placeholder={usuario?.referencia ? usuario.referencia : 'Ajuda seu pedido chegar mais rápido'}
                        {...register("referenciaDefault")}
                                            />
                    <p className=' text-sm text-center  text-red-400'>{errors.referenciaDefault?.message}</p>


                    <div className="flex flex-row-reverse gap-4 my-4">
                        <label htmlFor="confirmCity">Você está em Álvares Machado ou proximidades?</label>
                        <input
                            type="checkbox"
                            name="confirmCity"
                            id="confirmCity"
                            checked
                            readOnly
                        />

                    </div>
                    <button
                        tabIndex={0}
                        aria-label='Enviar Formulário'
                        type="submit"
                        className={`bg-[#D4AA3C] rounded-md py-3 w-full font-bold text-xl my-4 ${formState.isSubmitting ? 'opacity-70' : ''} `}
                        disabled={formState.isSubmitting}
                    >
                        {formState.isSubmitting ?
                            <div className="spinner-border h-6 w-6" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            : 'Salvar'}
                    </button>
                </div>
            </form>

            <div className="mt-12 self-end text-gray-400">
                <button onClick={handleDeleteAccount} className="underline cursor-pointer">Excluir conta</button>
            </div>

        </div>
    )
}

export default FormEndPerfil;