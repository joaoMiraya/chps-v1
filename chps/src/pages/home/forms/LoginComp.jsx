import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from 'react-router-dom';
import { userLogin, authGoogle } from '../../../services/redux/users/authSlice';

import { AiOutlineArrowRight } from 'react-icons/ai';

const schema = yup.object().shape({
    emailLogin: yup.string().email("Não é um email válido").required("Campo obrigatório"),
    passwordLogin: yup.string().required("Campo obrigatório"),
});


function LoginComp({ handleChangeForm }) {
    LoginComp.propTypes = {
        handleChangeForm: PropTypes.func.isRequired,
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
                    <div onClick={handleAuthGoogle} className="h-16 w-16 flex xl:pr-2 xl:justify-between justify-center  items-center text-sm  rounded-md xl:w-[18rem] border-[1px] border-solid border-gray-400">
                        <svg className='relative w-16 h-12 top-1' xmlns="http://www.w3.org/2000/svg" aria-label="Gmail" role="img" viewBox="0 0 512 512" width="64px" height="64px" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><rect width="512" height="512" rx="15%" fill="#ffffff"></rect><path d="M158 391v-142l-82-63V361q0 30 30 30" fill="#4285f4"></path><path d="M 154 248l102 77l102-77v-98l-102 77l-102-77" fill="#ea4335"></path><path d="M354 391v-142l82-63V361q0 30-30 30" fill="#34a853"></path><path d="M76 188l82 63v-98l-30-23c-27-21-52 0-52 26" fill="#c5221f"></path><path d="M436 188l-82 63v-98l30-23c27-21 52 0 52 26" fill="#fbbc04"></path></g></svg>
                        <h3 className='hidden xl:inline'>Entre com sua conta Google</h3>
                    </div>
                    <div className="h-16 w-16 flex xl:pr-2 xl:justify-between justify-center items-center text-sm  rounded-md xl:w-[18rem] border-[1px] border-solid border-gray-400">
                        <svg width="64px" height="64px" viewBox="0 0 48.00 48.00" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Facebook-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" strokeWidth="0.00048000000000000007" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-200.000000, -160.000000)" fill="#4460A0"> <path d="M225.638355,208 L202.649232,208 C201.185673,208 200,206.813592 200,205.350603 L200,162.649211 C200,161.18585 201.185859,160 202.649232,160 L245.350955,160 C246.813955,160 248,161.18585 248,162.649211 L248,205.350603 C248,206.813778 246.813769,208 245.350955,208 L233.119305,208 L233.119305,189.411755 L239.358521,189.411755 L240.292755,182.167586 L233.119305,182.167586 L233.119305,177.542641 C233.119305,175.445287 233.701712,174.01601 236.70929,174.01601 L240.545311,174.014333 L240.545311,167.535091 C239.881886,167.446808 237.604784,167.24957 234.955552,167.24957 C229.424834,167.24957 225.638355,170.625526 225.638355,176.825209 L225.638355,182.167586 L219.383122,182.167586 L219.383122,189.411755 L225.638355,189.411755 L225.638355,208 L225.638355,208 Z" id="Facebook"> </path> </g> </g> </g></svg>                    <h3 className='hidden xl:inline'>Entre com sua conta Google</h3>
                    </div>
                    <div className="h-16 w-16 flex xl:pr-2 xl:justify-between justify-center items-center text-sm  rounded-md xl:w-[18rem] border-[1px] border-solid border-gray-400">
                        <svg fill="#000000" width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"></path> </g></svg>
                        <h3 className='hidden xl:inline'>Entre com sua conta Google</h3>
                    </div>
                </div>
            </div>
            <p className="my-4">Ou entre com seu e-mail e senha</p>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="flex flex-col w-screen px-8">
                    <label htmlFor="emailLogin">Email:</label>
                    <input
                        aria-label='Email para login'
                        className=" border-b-[1px] border-solid border-gray-400"
                        type="email"
                        name="emailLogin"
                        id="emailLogin"
                        {...register("emailLogin")}
                    />
                    <p className=' text-sm text-center mt-2 text-red-400'>{errors.emailLogin?.message}</p>
                    <p className=' text-sm text-center mt-2 text-red-400'>{error}</p>

                    <label className="mt-4" htmlFor="passwordLogin">Senha:</label>
                    <input
                        aria-label='Senha para login'
                        className=" border-b-[1px] border-solid border-gray-400"
                        type="password"
                        name="passwordLogin"
                        id="passwordLogin"
                        {...register("passwordLogin")}
                    />
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
                    <div aria-label='Botão para ir para a página de cadastro' onClick={handleChangeForm} className='flex items-center font-semibold underline mt-4 justify-center cursor-pointer'>
                        <span>Ainda não tenho registro</span><AiOutlineArrowRight size={20} />
                    </div>
                </div>
            </form>
        </div>
    )
}


export default LoginComp;