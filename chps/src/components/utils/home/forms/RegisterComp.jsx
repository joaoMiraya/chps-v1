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
        <div className="container flex flex-col items-center py-14">
            <h1 className=" text-2xl font-bold">Fazer registro no Chapas</h1>
            <p className="font-semibold">Registrar-se com:  </p>
            <div className="flex gap-4 mt-4 ">
                <div className="h-16 w-16 rounded-md border-[1px] border-solid border-gray-400"></div>
                <div className="h-16 w-16 rounded-md border-[1px] border-solid border-gray-400"></div>
                <div className="h-16 w-16 rounded-md border-[1px] border-solid border-gray-400"></div>
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