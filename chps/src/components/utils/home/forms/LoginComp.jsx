import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { userLogin, authGoogle } from '../../../../services/redux/users/authSlice';

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
                <div onClick={handleAuthGoogle} className="h-16 w-16 rounded-md border-[1px] border-solid border-gray-400">G</div>
                <div className="h-16 w-16 rounded-md border-[1px] border-solid border-gray-400">F</div>
                <div className="h-16 w-16 rounded-md border-[1px] border-solid border-gray-400">A</div>
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

                    <span className="text-red-400 underline my-4">Esqueceu sua senha?</span>
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
                    <div onClick={handleChangeForm} className='flex items-center font-semibold underline mt-4 justify-center'>
                        <span>Ainda não tenho registro</span><AiOutlineArrowRight size={20} />
                    </div>
                </div>
            </form>
        </div>
    )
}


export default LoginComp;