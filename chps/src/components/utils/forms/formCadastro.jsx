import PropTypes from 'prop-types';
import { useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { userRegister } from '../../../services/redux/users/registerSlice';





const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    email: yup.string().email().required("Campo obrigatório"),
    confirmEmail: yup.string().email().required("Campo obrigatório").oneOf([yup.ref("email"), null], "Email estão diferentes"),
    password: yup.string().min(8, 'Sua senha deve conter no minímo 8 caracteres').max(32).required("Campo obrigatório").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{6,15}$/, " A senha dever conter: 1 letra grande 1 pequena e 1 número"),
    confirmPassword: yup.string().required("Campo obrigatório").oneOf([yup.ref("password"), null], "Senhas estão diferentes"),
    tel: yup.string().min(8, "Telefone inválido").max(11, "Seu telefone tem muitos números").required("Campo obrigatório"),
});

function FormCadastro({ handleFocusInput, handleChangeForm, handleBlur }) {
    FormCadastro.propTypes = {
        handleFocusInput: PropTypes.func.isRequired,
        handleChangeForm: PropTypes.func.isRequired,
        handleBlur: PropTypes.func.isRequired,
    };
    /*  const navigate = useNavigate(); */
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.register);


    /* PEGAR A DATA ATUAL */
    let dataAtual = new Date();
    let dia = dataAtual.getDate();
    let mes = dataAtual.getMonth() + 1;
    let ano = dataAtual.getFullYear();
    const formatedDate = dia + '/' + mes + '/' + ano;

    const name = useRef();
    const email = useRef();
    const ConfirmEmail = useRef();
    const passwordRef = useRef();
    const confirmPassword = useRef();
    const telRef = useRef();

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
                Name: data.name,
                Email: data.email,
                Password: data.password,
                Tel: data.tel,
                Date: formatedDate
            };
            // Faça a chamada assíncrona para criar o usuário
            await dispatch(userRegister(values));
            // Resete o formulário se a submissão for bem-sucedida
            reset({
                name: "",
                email: "",
                confirmEmail: "",
                password: "",
                confirmPassword: "",
                tel: ""
            });
            window.location.reload()
        } catch (error) {
            console.error("Ocorreu um erro ao criar o usuário:", error);
        }
    };

    return (
        <div className=" z-20 flex flex-col w-screen items-center text-white mt-16">
            <h1 className="text-3xl font-semibold bg-gradient-to-r from-red-900 to-[#D4AA3C] bg-clip-text text-transparent">Crie sua conta</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container flex flex-col">
                    <label className="labelBase" htmlFor="name">Nome: </label>
                    <input
                        ref={name}
                        {...register("name")}
                        className="inputsBase"
                        aria-label="Seu nome"
                        type="text"
                        id="name"
                        name="name"
                        onFocus={() => handleFocusInput(name)}
                        onBlur={() => handleBlur(name)}
                    />
                    <p className=' text-sm text-center w-2/3 '>{errors.name?.message}</p>

                    <label className="labelBase" htmlFor="email">Email:</label>
                    <input
                        ref={email}
                        {...register("email")}
                        className="inputsBase"
                        aria-label="Seu email"
                        type="email"
                        id="email"
                        name="email"
                        onFocus={() => handleFocusInput(email)}
                        onBlur={() => handleBlur(email)}
                    />
                    <p className=' text-sm text-center w-2/3 '>{errors.email?.message}</p>
                    <p className=' text-sm text-center mt-2 '>{error}</p>

                    <label className="labelBase" htmlFor="confirmEmail">Confirme seu e-mail:</label>
                    <input
                        ref={ConfirmEmail}
                        {...register("confirmEmail")}
                        className="inputsBase"
                        aria-label="Confirme seu email"
                        type="email"
                        id="confirmEmail"
                        name="confirmEmail"
                        onFocus={() => handleFocusInput(ConfirmEmail)}
                        onBlur={() => handleBlur(ConfirmEmail)}
                    />
                    <p className=' text-sm text-center w-2/3 '>{errors.confirmEmail?.message}</p>

                    <label className="labelBase" htmlFor="password">Senha:</label>
                    <input
                        ref={passwordRef}
                        {...register("password")}
                        className="inputsBase"
                        aria-label="Sua senha"
                        type="password"
                        id="password"
                        name="password"
                        onFocus={() => handleFocusInput(passwordRef)}
                        onBlur={() => handleBlur(passwordRef)}
                    />
                    <p className=' text-sm text-center w-2/3 '>{errors.password?.message}</p>

                    <label className="labelBase" htmlFor="confirmPassword">Confirme sua senha:</label>
                    <input
                        ref={confirmPassword}
                        {...register("confirmPassword")}
                        className="inputsBase"
                        aria-label="Confirme sua senha"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        onFocus={() => handleFocusInput(confirmPassword)}
                        onBlur={() => handleBlur(confirmPassword)}
                    />
                    <p className=' text-sm text-center w-2/3 '>{errors.confirmPassword?.message}</p>

                    <label className="labelBase" htmlFor="tel">Seu telefone:</label>
                    <input
                        ref={telRef}
                        {...register("tel")}
                        className="inputsBase"
                        aria-label="Seu telefone"
                        type="text"
                        id="tel"
                        name="tel"
                        onFocus={() => handleFocusInput(telRef)}
                        onBlur={() => handleBlur(telRef)}
                    />
                    <p className=' text-sm text-center w-2/3 '>{errors.tel?.message}</p>

                    <input type="date" defaultValue={formatedDate} name="createdAt" id="createdAt" hidden />

                </div>
                <div className=" flex w-full flex-col items-center mt-6">
                    <span onClick={handleChangeForm} className="text-sm text-center mb-6 underline">Ja possuí cadastro? Faça login!</span>
                    <button
                        className="bg-black py-2 px-24 rounded-md font-bold "
                        type="submit"
                        disabled={formState.isSubmitting}
                    >
                        {formState.isSubmitting ?
                            <div className="spinner-border h-6 w-6" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            : 'Enviar'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FormCadastro;