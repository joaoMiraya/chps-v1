import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { AiOutlineArrowRight } from 'react-icons/ai';

import { userRegister } from '../../../../services/redux/users/registerSlice';



const schema = yup.object().shape({
    nameRegister: yup.string().required("Campo obrigatório"),
    emailRegister: yup.string().email().required("Campo obrigatório"),
    confirmEmailRegister: yup.string().email().required("Campo obrigatório").oneOf([yup.ref("emailRegister"), null], "Email estão diferentes"),
    passwordRegister: yup.string().min(8, 'Sua senha deve conter no minímo 8 caracteres').max(32).required("Campo obrigatório").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{6,15}$/, " A senha dever conter: 1 letra grande 1 pequena e 1 número"),
    confirmPasswordRegister: yup.string().required("Campo obrigatório").oneOf([yup.ref("passwordRegister"), null], "Senhas estão diferentes"),
    tel: yup.string().min(8, "Telefone inválido").max(11, "Seu telefone tem muitos números").required("Campo obrigatório"),
});

function RegisterComp({ handleChangeForm }) {
    RegisterComp.propTypes = {
        handleChangeForm: PropTypes.func.isRequired,
    };

    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.register);


    /* PEGAR A DATA ATUAL */
    let dataAtual = new Date();
    let dia = dataAtual.getDate();
    let mes = dataAtual.getMonth() + 1;
    let ano = dataAtual.getFullYear();
    const formatedDate = dia + '/' + mes + '/' + ano;


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
                Name: data.nameRegister,
                Email: data.emailRegister,
                Password: data.passwordRegister,
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
        <div className="container flex flex-col  items-center pt-16">
            <h1 className=" text-2xl font-bold">Fazer registro no Chapas</h1>
            <p className="font-semibold">Registrar-se com:  </p>
            <div className="flex xl:flex-col xl:-w xl:flex-grow- gap-4 mt-4 ">
                <div className="h-16 w-16 flex xl:pr-2 xl:justify-between justify-center  items-center text-sm  rounded-md xl:w-[18rem] border-[1px] border-solid border-gray-400">
                    <svg className='relative w-16 h-12 top-1' xmlns="http://www.w3.org/2000/svg" aria-label="Gmail" role="img" viewBox="0 0 512 512" width="64px" height="64px" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><rect width="512" height="512" rx="15%" fill="#ffffff"></rect><path d="M158 391v-142l-82-63V361q0 30 30 30" fill="#4285f4"></path><path d="M 154 248l102 77l102-77v-98l-102 77l-102-77" fill="#ea4335"></path><path d="M354 391v-142l82-63V361q0 30-30 30" fill="#34a853"></path><path d="M76 188l82 63v-98l-30-23c-27-21-52 0-52 26" fill="#c5221f"></path><path d="M436 188l-82 63v-98l30-23c27-21 52 0 52 26" fill="#fbbc04"></path></g></svg>
                    <h3 className='hidden xl:inline'>Entre com sua conta Google</h3>
                </div>
                <div className="h-16 w-16 flex xl:pr-2 xl:justify-between justify-center items-center text-sm  rounded-md xl:w-[18rem] border-[1px] border-solid border-gray-400">
                    <svg width="64px" height="64px" viewBox="0 0 48.00 48.00" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Facebook-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" strokeWidth="0.00048000000000000007" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-200.000000, -160.000000)" fill="#4460A0"> <path d="M225.638355,208 L202.649232,208 C201.185673,208 200,206.813592 200,205.350603 L200,162.649211 C200,161.18585 201.185859,160 202.649232,160 L245.350955,160 C246.813955,160 248,161.18585 248,162.649211 L248,205.350603 C248,206.813778 246.813769,208 245.350955,208 L233.119305,208 L233.119305,189.411755 L239.358521,189.411755 L240.292755,182.167586 L233.119305,182.167586 L233.119305,177.542641 C233.119305,175.445287 233.701712,174.01601 236.70929,174.01601 L240.545311,174.014333 L240.545311,167.535091 C239.881886,167.446808 237.604784,167.24957 234.955552,167.24957 C229.424834,167.24957 225.638355,170.625526 225.638355,176.825209 L225.638355,182.167586 L219.383122,182.167586 L219.383122,189.411755 L225.638355,189.411755 L225.638355,208 L225.638355,208 Z" id="Facebook"> </path> </g> </g> </g></svg>
                    <h3 className='hidden xl:inline'>Entre com seu Facebook</h3>
                </div>
                <div className="h-16 w-16 flex xl:pr-2 xl:justify-between justify-center items-center text-sm  rounded-md xl:w-[18rem] border-[1px] border-solid border-gray-400">
                    <svg fill="#000000" width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"></path> </g></svg>
                    <h3 className='hidden xl:inline '>Entre com sua conta Apple</h3>
                </div>
            </div>
            <p className="my-4">Ou faça seu registro com e-mail e senha</p>

            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="flex flex-col w-screen px-8">
                    <label htmlFor="nameRegister">Nome:</label>
                    <input
                        aria-label='Seu nome para o cadastro'
                        className=" border-b-[1px] border-solid border-gray-400"
                        type="text"
                        name="nameRegister"
                        id="nameRegister"
                        {...register("nameRegister")}
                    />
                    <p className=' text-sm text-center w-2/3 text-red-400'>{errors.nameRegister?.message}</p>

                    <label className='mt-2' htmlFor="emailRegister">Email:</label>
                    <input
                        aria-label='Email para o registro'
                        className=" border-b-[1px] border-solid border-gray-400"
                        type="email"
                        name="emailRegister"
                        id="emailRegister"
                        {...register("emailRegister")}
                    />
                    <p className=' text-sm text-center w-2/3 text-red-400'>{errors.emailRegister?.message}</p>
                    <p className=' text-sm text-center mt-2 '>{error}</p>

                    <label className='mt-2' htmlFor="confirmEmailRegister">Confirme seu e-mail:</label>
                    <input
                        aria-label='Confirme seu email para o registro'
                        className=" border-b-[1px] border-solid border-gray-400"
                        type="email"
                        name="confirmEmailRegister"
                        id="confirmEmailRegister"
                        {...register("confirmEmailRegister")}
                    />
                    <p className=' text-sm text-center w-2/3 text-red-400'>{errors.confirmEmailRegister?.message}</p>

                    <label className="mt-2" htmlFor="passwordRegister">Senha:</label>
                    <input
                        aria-label='Sua senha para o registro'
                        className=" border-b-[1px] border-solid border-gray-400"
                        type="password"
                        name="passwordRegister"
                        id="passwordRegister"
                        {...register("passwordRegister")}
                    />
                    <p className=' text-sm text-center w-2/3 text-red-400'>{errors.passwordRegister?.message}</p>

                    <label className='mt-2' htmlFor="confirmPasswordRegister">Confirme sua senha:</label>
                    <input
                        aria-label='Confirme sua senha para o registro'
                        className=" border-b-[1px] border-solid border-gray-400"
                        type="password"
                        name="confirmPasswordRegister"
                        id="confirmPasswordRegister"
                        {...register("confirmPasswordRegister")}
                    />
                    <p className=' text-sm text-center w-2/3 text-red-400'>{errors.confirmPasswordRegister?.message}</p>

                    <label className='mt-2' htmlFor="tel">Telefone:</label>
                    <input
                        aria-label='Confirme sua senha para o registro'
                        className=" border-b-[1px] border-solid border-gray-400"
                        type="text"
                        name="tel"
                        id="tel"
                        {...register("tel")}
                    />
                    <p className=' text-sm text-center w-2/3 text-red-400'>{errors.tel?.message}</p>

                    <button
                        aria-label='Botão para fazer o registro'
                        type="submit"
                        className="bg-[#D4AA3C] py-3 w-full font-bold text-xl my-4 "
                        disabled={formState.isSubmitting}
                    >
                        {formState.isSubmitting ?
                            <div className="spinner-border h-6 w-6" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            : 'Registrar-se'}
                    </button>

                    <div onClick={handleChangeForm} className='flex items-center font-semibold underline  justify-center'>
                        <span>Já possuo registro</span><AiOutlineArrowRight size={20} />
                    </div>
                </div>
            </form>
        </div>
    )
}


export default RegisterComp;