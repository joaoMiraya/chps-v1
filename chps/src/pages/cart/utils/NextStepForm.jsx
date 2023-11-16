import PropTypes from 'prop-types';
import { lazy, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getUser } from "@services/redux/users/usersSlice";
import { setPedidos } from "@services/redux/pedidos/pedidosSlice";
import { getDate, getHours, numberGenerator } from "@javascript/main";
import { clearCart } from "@services/redux/cart/cartSlice";
import { converterStringToFloat, telFormater } from '../../../javascript/main';
import ToggleRetirada from './ToggleRetirada';

const FormaDePagamento = lazy(() => import("./FormaDePagamento"));
const ToggleEndress = lazy(() => import("./ToggleEndress"));

function NextStepForm({ handleBackStep, cartItems, total }) {
    NextStepForm.propTypes = {
        handleBackStep: PropTypes.func.isRequired,
        cartItems: PropTypes.array.isRequired,
        total: PropTypes.number.isRequired
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [disabled, setDisabled] = useState(false);
    const [retirar, setRetirar] = useState(false);
    const [selected, setSelected] = useState(false);
    const [autoEnd, setAutoEnd] = useState(false);
    const [troco, setTroco] = useState('');

    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [nome, setNome] = useState('');
    const [tel, setTel] = useState('');
    const [referencia, setReferencia] = useState('');

    const { isLogged, isAnonymous } = useSelector((state) => state.auth);
    const { appOnline } = useSelector((state) => state.app);

    //PREENCHER CAMPOS COM ENDEREÇO PADRAO
    const checkEndress = async () => {
        if (isLogged) {
            const user = await getUser();
            if (user.bairro) {
                setAutoEnd(!autoEnd);
                if (autoEnd) {
                    resetAddressFields();
                } else {
                    setUserData(user);
                }
            }
            else {
                toast.error("Você precisa adicionar um endereço como padrão. Vá em perfil para fazer isso!")
                navigator.vibrate(200);
                return
            }
        }
    };

    const resetAddressFields = () => {
        setBairro('');
        setRua('');
        setNumero('');
        setNome('');
        setReferencia('');
        setTel('');
    };

    const setUserData = (user) => {
        setBairro(user.bairro);
        setRua(user.rua);
        setNumero(user.numero_casa);
        setNome(user.name);
        setReferencia(user.referencia);
        setTel(user.tel);
    };

    const handleSubmitOrder = async () => {
        setDisabled(true)
        const user = (isAnonymous || !isLogged ? '' : await getUser());
        const endress = (bairro, rua, nome).length > 3 && tel.length >= 10;
        const retirarInfo = (nome.length > 3 && tel.length >= 10);
        let order = {
            itens: cartItems,
            numero_pedido: numberGenerator(),
            nome: nome,
            uid: isAnonymous || !isLogged ? 'Usuario anônimo' : user.uid,
            telefone: tel,
            total: total.toFixed(2),
            data: getDate(),
            hora_pedido: getHours(),
        }
        //CASO FOR RETIRADA
        if (retirar) {
            if (retirarInfo) {
                order = {
                    ...order,
                    retirar: true
                }
                dispatch(setPedidos(order))
                dispatch(clearCart())
                toast.success('Pedido enviado com sucesso!');
                setTimeout(() => {
                    navigate('/perfil');
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }, 3000);
            } else {
                setDisabled(false);
                toast.error("Preencha os campos obrigatórios!");
                navigator.vibrate(200);
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        } else { //CASO ENTREGAR
            if (!endress || numero < 1) {
                setDisabled(false);
                navigator.vibrate(200);
                toast.error("Preencha os campos obrigatórios!")
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                if (selected) { //CASO O PAGAMENTO FOR CARTÃO
                    order = {
                        ...order,
                        bairro: bairro,
                        rua: rua,
                        numero_casa: numero,
                        referencia: referencia.length > 3 ? referencia : 'Sem referência',
                        pagamento: 'Cartão',
                        status: 50,
                    }
                    dispatch(setPedidos(order))
                    dispatch(clearCart())
                    toast.success('Pedido enviado com sucesso!')
                    setTimeout(() => {
                        navigate('/perfil');
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    }, 3000);

                } else {    //SE NÃO O PAGAMENTO SERA  DINHEIRO
                    if (troco.length >= 2) {
                        const trocoFormated = converterStringToFloat(troco);
                        if (trocoFormated > total) {
                            order = {
                                ...order,
                                bairro: bairro,
                                rua: rua,
                                numero_casa: numero,
                                referencia: referencia.length > 3 ? referencia : 'Sem referência',
                                pagamento: trocoFormated,
                                status: 50
                            }
                            dispatch(clearCart())
                            dispatch(setPedidos(order))
                            toast.success('Pedido enviado com sucesso!')
                            setTimeout(() => {
                                navigate('/perfil');
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth'
                                });
                            }, 3000);
                        } else {   //CASO O TROCO FOR MENOR QUE O VALOR TOTAL
                            setDisabled(false);
                            navigator.vibrate(200);
                            toast.error("O troco deve ser maior que o valor total!");
                        }
                    } else {
                        setDisabled(false);
                        navigator.vibrate(200);
                        toast.error("Informe o troco");
                    }
                }
            }
        }
    };


    return (

        <div>
            <ToggleRetirada retirar={retirar} setRetirar={setRetirar} />
            <h3 className='text-center font-semibold text-xl my-4'>Dados para {retirar ? 'retirada' : 'entrega'}</h3>
            <div className={`${retirar ? 'hidden' : 'flex'} justify-end`}>
                <div className="flex flex-col items-center gap-2 text-center w-[180px]">
                    <span className="text-sm">Deseja preencher com seu endereço salvo?!</span>
                    <ToggleEndress autoEnd={autoEnd} setAutoEnd={checkEndress} />
                </div>
            </div>
            <form>
                <div className="flex flex-col">
                    <label className="text-gray-400 ml-4" htmlFor="nome">Seu nome</label>
                    <input
                        aria-label="Insira seu nome"
                        className="pl-2 border-b-[1px] border-solid border-gray-300"
                        name="nome"
                        id="nome"
                        required
                        type="text"
                        onChange={(e) => setNome(e.target.value)}
                        value={nome}
                        placeholder='Digite o seu nome'
                    />
                    <label className="text-gray-400 ml-4" htmlFor="tel">Seu telefone</label>
                    <input
                        aria-label="Insira seu telefone"
                        className="pl-2 border-b-[1px] border-solid border-gray-300"
                        name="tel"
                        id="tel"
                        required
                        type="text"
                        onChange={(e) => setTel(e.target.value)}
                        value={tel}
                        placeholder='Digite com DDD e sem espaços'
                    />
                    <div className={`${retirar ? 'hidden' : 'flex'}  flex-col`}>
                        <label className="text-gray-400 ml-4" htmlFor="bairro">Bairro</label>
                        <input
                            aria-label="Insira seu bairro"
                            className="pl-2 border-b-[1px] border-solid border-gray-300"
                            name="bairro"
                            id="bairro"
                            required
                            type="text"
                            onChange={(e) => setBairro(e.target.value)}
                            value={bairro}
                        />
                        <label className="text-gray-400 ml-4" htmlFor="rua">Rua</label>
                        <input
                            aria-label="Insira sua rua"
                            className="pl-2 border-b-[1px] border-solid border-gray-300"
                            name="rua"
                            id="rua"
                            required
                            type="text"
                            onChange={(e) => setRua(e.target.value)}
                            value={rua}
                        />
                        <label className="text-gray-400 ml-4" htmlFor="nmrCasa">Numero Casa</label>
                        <input
                            aria-label="Insira seu numero da casa"
                            className="pl-2 border-b-[1px] border-solid border-gray-300"
                            name="nmrCasa"
                            id="nmrCasa"
                            required
                            type="text"
                            onChange={(e) => setNumero(e.target.value)}
                            value={numero}
                        />
                        <label className="text-gray-400 ml-4" htmlFor="referencia">Referência: <span className="text-sm">{'(Opcional)'}</span></label>
                        <input
                            aria-label="Insira seu numero da casa"
                            className="pl-2 border-b-[1px] border-solid border-gray-300"
                            name="referencia"
                            id="referencia"
                            required
                            type="text"
                            onChange={(e) => setReferencia(e.target.value)}
                            value={referencia}
                        />
                    </div>
                    <FormaDePagamento
                        selected={selected}
                        setSelected={setSelected}
                        troco={troco}
                        setTroco={setTroco}
                    />

                </div>
            </form>
            <div className=" flex justify-around items-center my-4">
                <button onClick={handleBackStep} aria-label='Voltar' tabIndex={0} className={` py-2 px-6 font-semibold bg-[#292929] text-white rounded-lg drop-shadow-md hover:scale-105`}>Voltar</button>
                <button disabled={disabled} onClick={handleSubmitOrder} aria-label='Finalizar o pedido' tabIndex={0} className={`${!disabled ? '' : 'opacity-60'} hover:scale-105 py-2 px-6 font-semibold bg-green-600 text-white rounded-lg drop-shadow-md`}>
                    {disabled ?
                        <div className="spinner-border h-6 w-6" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> :
                        'Finalizar'}
                </button>
            </div>
            <span className={`${appOnline ? 'hidden' : 'flex'} justify-center text-red-400`}>Abriremos às 18:00 horas</span>
        </div>
    )
}

export default NextStepForm;