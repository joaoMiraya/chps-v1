import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { userLogin, authGoogle } from '../../../services/redux/users/authSlice';




const schema = yup.object().shape({
    emailToLogin: yup.string().email("Não é um email válido").required("Campo obrigatório"),
    passwordToLogin: yup.string().required("Campo obrigatório"),
});

function LoginForm({ handleFocusInput, handleChangeForm }) {
    LoginForm.propTypes = {
        handleFocusInput: PropTypes.func.isRequired,
        handleChangeForm: PropTypes.func.isRequired,
    };

    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.auth);

    const emailLoginRef = useRef();
    const passwordLoginRef = useRef();
    //LOGIN COM EMAIL E SENHA
    const { register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        const values = {
            Email: data.emailToLogin,
            Password: data.passwordToLogin,
        }
        dispatch(userLogin(values));
        isSubmitSuccessful ? reset() : ' ';
    };

    //LOGIN COM O GOOGLE
    const handleAuthGoogle = () => {
        dispatch(authGoogle)
    }


    return (
        <div className="flex flex-col h-screen w-screen text-white items-center justify-center z-10">
            <Helmet>
                <meta name="referrer" content="no-referrer-when-downgrade" />

            </Helmet>
            <h1 className="text-3xl font-semibold bg-gradient-to-r from-red-900 to-[#D4AA3C] bg-clip-text text-transparent">Faça seu Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container flex flex-col ">
                    <label className="labelBase" htmlFor="emailToLogin">Seu e-mail:</label>
                    <input
                        ref={emailLoginRef}
                        className="inputsBase"
                        type="email"
                        name="emailToLogin"
                        id="emailToLogin"
                        onFocus={() => handleFocusInput(emailLoginRef)}
                        onBlur={() => handleFocusInput(emailLoginRef)}
                        {...register("emailToLogin")}
                    />
                    <p className=' text-sm text-center mt-2'>{errors.emailToLogin?.message}</p>
                    <p className=' text-sm text-center mt-2 '>{error}</p>

                    <label className="labelBase" htmlFor="passwordToLogin">Sua senha: </label>
                    <input
                        ref={passwordLoginRef}
                        className="inputsBase"
                        type="password"
                        name="passwordToLogin"
                        id="passwordToLogin"
                        onFocus={() => handleFocusInput(passwordLoginRef)}
                        onBlur={() => handleFocusInput(passwordLoginRef)}
                        {...register("passwordToLogin")}
                    />
                    <p className=' text-sm text-center mt-2'>{errors.passwordToLogin?.message}</p>

                    <div className="gap-6 mt-2 flex flex-col text-center  ">
                        <span className="text-sm cursor-pointer text-center">Esqueci minha senha!</span>

                        <button className="bg-black py-2 px-16 rounded-md " type="submit">
                            {isSubmitting ?
                                <div className="spinner-border h-6 w-6" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                : 'Enviar'}
                        </button>

                        <span onClick={handleChangeForm} className="text-sm cursor-pointer underline">Não possuí cadastro? Crie sua conta! </span>
                    </div>
                </div>
            </form>
            <div >
                <button onClick={handleAuthGoogle} className="bg-gray-200 text-black font-bold rounded-md mt-8 flex items-center gap-2  ">
                    <span>
                        <svg className=' w-10 h-10' viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 11.9556C2 8.47078 2 6.7284 2.67818 5.39739C3.27473 4.22661 4.22661 3.27473 5.39739 2.67818C6.7284 2 8.47078 2 11.9556 2H20.0444C23.5292 2 25.2716 2 26.6026 2.67818C27.7734 3.27473 28.7253 4.22661 29.3218 5.39739C30 6.7284 30 8.47078 30 11.9556V20.0444C30 23.5292 30 25.2716 29.3218 26.6026C28.7253 27.7734 27.7734 28.7253 26.6026 29.3218C25.2716 30 23.5292 30 20.0444 30H11.9556C8.47078 30 6.7284 30 5.39739 29.3218C4.22661 28.7253 3.27473 27.7734 2.67818 26.6026C2 25.2716 2 23.5292 2 20.0444V11.9556Z" fill="white"></path> <path d="M22.0515 8.52295L16.0644 13.1954L9.94043 8.52295V8.52421L9.94783 8.53053V15.0732L15.9954 19.8466L22.0515 15.2575V8.52295Z" fill="#EA4335"></path> <path d="M23.6231 7.38639L22.0508 8.52292V15.2575L26.9983 11.459V9.17074C26.9983 9.17074 26.3978 5.90258 23.6231 7.38639Z" fill="#FBBC05"></path> <path d="M22.0508 15.2575V23.9924H25.8428C25.8428 23.9924 26.9219 23.8813 26.9995 22.6513V11.459L22.0508 15.2575Z" fill="#34A853"></path> <path d="M9.94811 24.0001V15.0732L9.94043 15.0669L9.94811 24.0001Z" fill="#C5221F"></path> <path d="M9.94014 8.52404L8.37646 7.39382C5.60179 5.91001 5 9.17692 5 9.17692V11.4651L9.94014 15.0667V8.52404Z" fill="#C5221F"></path> <path d="M9.94043 8.52441V15.0671L9.94811 15.0734V8.53073L9.94043 8.52441Z" fill="#C5221F"></path> <path d="M5 11.4668V22.6591C5.07646 23.8904 6.15673 24.0003 6.15673 24.0003H9.94877L9.94014 15.0671L5 11.4668Z" fill="#4285F4"></path> </g></svg>
                    </span>
                    <p className='mx-6'>Entrar com o Google</p>
                </button>
            </div>
        </div>
    )
}

export default LoginForm;