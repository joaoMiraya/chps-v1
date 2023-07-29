import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from 'react-router-dom';
import { userLogin, authGoogle } from '../../../services/redux/users/authSlice';

import { AiOutlineArrowRight } from 'react-icons/ai';
import { BiShowAlt, BiHide } from 'react-icons/bi';

const schema = yup.object().shape({
    emailLogin: yup.string().email("Não é um email válido").required("Campo obrigatório"),
    passwordLogin: yup.string().required("Campo obrigatório"),
});

function LoginComp({ handleShowPassword, showPass }) {
    LoginComp.propTypes = {
        handleShowPassword: PropTypes.func.isRequired,
        showPass: PropTypes.bool.isRequired,
    };

    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.auth);

    //LOGIN COM EMAIL E SENHA
    const { register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        const values = {
            Email: data.emailLogin,
            Password: data.passwordLogin,
        }
        dispatch(userLogin(values));
        isSubmitSuccessful ? reset() : ' ';
    };

    //LOGIN COM O GOOGLE
    const handleAuthGoogle = () => {
        dispatch(authGoogle)
    }

    return (
        <div className="container flex flex-col items-center">
            <Helmet>
                <meta name="referrer" content="no-referrer-when-downgrade" />
            </Helmet>

            <h1 className="mt-20 text-2xl font-bold">Entrar em Chapas</h1>
            <p className="font-semibold">Entrar com:  </p>
            <div className="flex gap-4 mt-4 ">
                <div className="flex xl:flex-col xl:-w xl:flex-grow- gap-4 mt-4 ">
                    <div onClick={handleAuthGoogle} className="h-16 w-[18rem] flex justify-between hover:bg-[#c1c1c130]  items-center text-sm font-semibold rounded-md border-[1px] border-solid border-gray-400">
                        <svg className='relative w-16 h-12 top-1 ' xmlns="http://www.w3.org/2000/svg" aria-label="Gmail" role="img" viewBox="0 0 512 512" width="64px" height="64px" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><rect width="512" height="512" rx="15%" fill="#ffffff"></rect><path d="M158 391v-142l-82-63V361q0 30 30 30" fill="#4285f4"></path><path d="M 154 248l102 77l102-77v-98l-102 77l-102-77" fill="#ea4335"></path><path d="M354 391v-142l82-63V361q0 30-30 30" fill="#34a853"></path><path d="M76 188l82 63v-98l-30-23c-27-21-52 0-52 26" fill="#c5221f"></path><path d="M436 188l-82 63v-98l30-23c27-21 52 0 52 26" fill="#fbbc04"></path></g></svg>
                        <h3 className=' text-center mr-4'>Entre com sua conta Google</h3>
                    </div>
                </div>
            </div>
            <p className="my-4">Ou entre com seu e-mail e senha</p>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="flex flex-col w-screen px-8">
                    <label htmlFor="emailLogin">Email:</label>
                    <input
                        aria-label='Email para login'
                        autoComplete='email'
                        className=" border-b-[1px] border-solid border-gray-400"
                        type="email"
                        name="emailLogin"
                        id="emailLogin"
                        {...register("emailLogin")}
                    />
                    <p className=' text-sm text-center mt-2 text-red-400'>{errors.emailLogin?.message}</p>
                    <p className=' text-sm text-center mt-2 text-red-400'>{error}</p>

                    <label className="mt-4" htmlFor="passwordLogin">Senha:</label>
                    <div className='w-full flex relative'>
                        <input
                            aria-label='Senha para login'
                            autoComplete='current-password'
                            className=" border-b-[1px] border-solid border-gray-400 w-full "
                            type={showPass ? 'text' : 'password'}
                            name="passwordLogin"
                            id="passwordLogin"
                            {...register("passwordLogin")}
                        />
                        {!showPass ?
                            <BiShowAlt
                                aria-label="Mostrar senha"
                                onClick={handleShowPassword}
                                size={30}
                                className='absolute text-gray-400 right-1 bottom-1'
                            /> : <BiHide
                                aria-label="Esconder senha"
                                onClick={handleShowPassword}
                                size={30}
                                className='absolute text-gray-400 right-1 bottom-1'
                            />
                        }
                    </div>
                    <p className=' text-sm text-center mt-2 text-red-400'>{errors.passwordLogin?.message}</p>

                    <Link className='my-4' to={"/redefinir-senha"}><span className="text-red-400 underline ">Esqueceu sua senha?</span></Link>

                    <button aria-label='Botão para fazer o login'
                        type="submit"
                        className="bg-[#D4AA3C] py-3 font-bold text-xl"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ?
                            <div className="spinner-border h-6 w-6" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            : 'Enviar'}
                    </button>
                    <Link to={"/cadastro"} aria-label='Botão para ir para a página de cadastro' className='flex items-center font-semibold underline mt-4 justify-center cursor-pointer'>
                        <span>Ainda não tenho registro</span><AiOutlineArrowRight size={20} />
                    </Link>
                </div>
            </form>
        </div>
    )
}


export default LoginComp;