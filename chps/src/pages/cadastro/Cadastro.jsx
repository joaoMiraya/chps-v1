import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { AiOutlineArrowRight } from 'react-icons/ai';
import { BiShowAlt, BiHide } from 'react-icons/bi';

import { userRegister } from '@services/redux/users/registerSlice';
import { getDate, telFormater } from '@javascript/main';




const schema = yup.object().shape({
    nameRegister: yup.string().required("Campo obrigatório"),
    emailRegister: yup.string().email("Insira um e-mail válido").required("Campo obrigatório"),
    confirmEmailRegister: yup.string().email("Insira um e-mail válido").required("Campo obrigatório").oneOf([yup.ref("emailRegister"), null], "Email estão diferentes"),
    passwordRegister: yup.string().min(8, 'Sua senha deve conter no minímo 8 caracteres').max(32).required("Campo obrigatório").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{6,15}$/, " A senha dever conter: 1 letra grande 1 pequena e 1 número"),
    confirmPasswordRegister: yup.string().required("Campo obrigatório").oneOf([yup.ref("passwordRegister"), null], "Senhas estão diferentes"),
    tel: yup.string("Apenas números são permitidos").min(11, "Seu telefone tem poucos digítos").max(11, "Seu telefone tem muitos números").required("Campo obrigatório"),
});

function Cadastro() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, success } = useSelector((state) => state.register);

    const [showPass, setShowPass] = useState(false);
    const [submiting, setSubmiting] = useState(false);

    //FUNÇÃO PARA VER A SENHA
    const handleShowPassword = () => {
        if (!showPass) {
            setShowPass(true)
        } else {
            setShowPass(false)
        }
    }

    const { register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        setSubmiting(true)

        try {
            const values = {
                Name: data.nameRegister,
                Email: data.emailRegister,
                Password: data.passwordRegister,
                Tel: await telFormater(data.tel),
                Date: await getDate()
            };
            // Faça a chamada assíncrona para criar o usuário
            dispatch(userRegister(values));
            // Resete o formulário se a submissão for bem-sucedida
            reset({
                nameRegister: "",
                emailRegister: "",
                confirmEmailRegister: "",
                passwordRegister: "",
                confirmPasswordRegister: "",
                tel: ""
            });
        } catch (error) {
            console.error("Ocorreu um erro ao criar o usuário:", error);
        }
    };
    useEffect(() => {
        if (success || error) {
            setSubmiting(false)
        }
    }, [success, error])

    if (success) {
        setTimeout(() => {
            navigate("/")
            window.location.reload();
        }, 2500)
    }

    return (
        <div className="container flex flex-col  items-center pt-16">
            <h1 className=" text-2xl font-bold">Fazer registro no Chapas</h1>
            <p className="font-semibold">Registrar-se com:  </p>
            <div className="flex xl:flex-col gap-4 mt-4 ">
                <div className="h-16 w-[18rem] flex justify-between hover:bg-[#c1c1c130]  items-center text-sm font-semibold rounded-md border-[1px] border-solid border-gray-400">
                    <svg className='relative w-16 h-12 top-1 ' xmlns="http://www.w3.org/2000/svg" aria-label="Gmail" role="img" viewBox="0 0 512 512" width="64px" height="64px" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><rect width="512" height="512" rx="15%" fill="#ffffff"></rect><path d="M158 391v-142l-82-63V361q0 30 30 30" fill="#4285f4"></path><path d="M 154 248l102 77l102-77v-98l-102 77l-102-77" fill="#ea4335"></path><path d="M354 391v-142l82-63V361q0 30-30 30" fill="#34a853"></path><path d="M76 188l82 63v-98l-30-23c-27-21-52 0-52 26" fill="#c5221f"></path><path d="M436 188l-82 63v-98l30-23c27-21 52 0 52 26" fill="#fbbc04"></path></g></svg>
                    <h3 className=' text-center mr-4'>Registre-se com sua conta Google</h3>
                </div>
            </div>
            <p className="my-4">Ou faça seu registro com e-mail e senha</p>

            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="flex flex-col w-screen px-8 md:max-w-[50rem]">
                    <label htmlFor="nameRegister">Nome:</label>
                    <input
                        aria-label='Seu nome para o cadastro'
                        autoComplete="name"
                        className=" border-b-[1px] border-solid border-gray-400"
                        type="text"
                        name="nameRegister"
                        id="nameRegister"
                        {...register("nameRegister")}
                    />
                    <p className=' text-sm text-center  text-red-400'>{errors.nameRegister?.message}</p>

                    <label className='mt-2' htmlFor="emailRegister">Email:</label>
                    <input
                        aria-label='Email para o registro'
                        autoComplete='email'
                        className=" border-b-[1px] border-solid border-gray-400"
                        type="email"
                        name="emailRegister"
                        id="emailRegister"
                        {...register("emailRegister")}
                    />
                    <p className=' text-sm text-center  text-red-400'>{errors.emailRegister?.message}</p>
                    <p className=' text-sm text-center mt-2 '>{error}</p>

                    <label className='mt-2' htmlFor="confirmEmailRegister">Confirme seu e-mail:</label>
                    <input
                        aria-label='Confirme seu email para o registro'
                        autoComplete='email'
                        className=" border-b-[1px] border-solid border-gray-400"
                        type="email"
                        name="confirmEmailRegister"
                        id="confirmEmailRegister"
                        {...register("confirmEmailRegister")}
                    />
                    <p className=' text-sm text-center  text-red-400'>{errors.confirmEmailRegister?.message}</p>

                    <label className="mt-2" htmlFor="passwordRegister">Senha:</label>
                    <div className='w-full flex relative'>
                        <input
                            aria-label='Sua senha para o registro'
                            autoComplete='current-password'
                            className=" border-b-[1px] border-solid border-gray-400 w-full"
                            type={showPass ? 'text' : 'password'}
                            name="passwordRegister"
                            id="passwordRegister"
                            {...register("passwordRegister")}
                        />
                        {!showPass ?
                            <BiShowAlt
                                onClick={handleShowPassword}
                                aria-label='Mostrar senha'
                                tabIndex={0}
                                size={30}
                                className='absolute text-gray-400 right-1 bottom-1'
                            /> : <BiHide
                                onClick={handleShowPassword}
                                aria-label='Esconder senha'
                                size={30}
                                tabIndex={0}
                                className='absolute text-gray-400 right-1 bottom-1'
                            />
                        }
                    </div>
                    <p className=' text-sm text-center  text-red-400'>{errors.passwordRegister?.message}</p>

                    <label className='mt-2' htmlFor="confirmPasswordRegister">Confirme sua senha:</label>
                    <div className='w-full flex relative'>
                        <input
                            aria-label='Confirme sua senha para o registro'
                            autoComplete='current-password'
                            className=" border-b-[1px] border-solid border-gray-400 w-full"
                            type={showPass ? 'text' : 'password'}
                            name="confirmPasswordRegister"
                            id="confirmPasswordRegister"
                            {...register("confirmPasswordRegister")}
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
                    <p className=' text-sm text-center  text-red-400'>{errors.confirmPasswordRegister?.message}</p>

                    <label className='mt-2' htmlFor="tel">Telefone:</label>
                    <input
                        aria-label='Confirme sua senha para o registro'
                        autoComplete='tel'
                        className=" border-b-[1px] border-solid border-gray-400"
                        type="text"
                        name="tel"
                        placeholder="XX XXXXX XXXX"
                        id="tel"
                        {...register("tel")}
                    />
                    <p className=' text-sm text-center  text-red-400'>{errors.tel?.message}</p>

                    <button
                        tabIndex={0}
                        aria-label='Botão para fazer o registro'
                        type="submit"
                        className={`bg-[#D4AA3C] py-3 w-full font-bold text-xl my-4 ${submiting ? 'opacity-70' : ''} `}
                        disabled={submiting}
                    >
                        {submiting ?
                            <div className="spinner-border h-6 w-6" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            : 'Registrar-se'}
                    </button>

                    <Link to={"/"} tabIndex={0} aria-label='Botão para ir para a página de login' className='flex items-center font-semibold underline cursor-pointer justify-center'>
                        <span>Já possuo registro</span><AiOutlineArrowRight size={20} />
                    </Link>
                </div>
            </form>
        </div>
    )
}


export default Cadastro;