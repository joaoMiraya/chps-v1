import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { getUser } from "../../../services/redux/users/authSlice";
import FormaDePagamento from "./FormaDePagamento";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setPedidosEntrega } from "../../../services/redux/pedidos/pedidosSlice";

function NextStepForm({ handleBackStep, cartItems, total }) {
    NextStepForm.propTypes = {
        handleBackStep: PropTypes.func.isRequired,
        cartItems: PropTypes.array.isRequired,
        total: PropTypes.number.isRequired
    };

    const dispatch = useDispatch();

    const [selected, setSelected] = useState(false);
    const [troco, setTroco] = useState('');

    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [nome, setNome] = useState('');
    const [tel, setTel] = useState('');
    const [referencia, setReferencia] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const checkEndress = async () => {
            const user = await getUser();
            if (user.bairro) {
                setBairro(user.bairro)
                setRua(user.rua)
                setNumero(user.numero_casa)
                setNome(user.name)
                setReferencia(user.referencia)
                setTel(user.tel)
                setUserId(user.uid)
            }
        };
        checkEndress()
    }, []);

    function numberGenerator() {
        const numeroAleatorio = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        return numeroAleatorio + Date.now();
    }

    const handleSubmitOrder = () => {
        /* PEGAR A DATA E HORA ATUAL */
        let date = new Date();
        let hora = date.getHours();
        let minutos = date.getMinutes();
        let dia = date.getDate();
        let mes = date.getMonth() + 1;
        let ano = date.getFullYear();
        const formatedDate = dia + '/' + mes + '/' + ano;
        const horaPedido = hora + ':' + minutos;
        const endress = (bairro, rua, numero, nome, tel).length > 3;
        if (!endress) {
            toast.error("Preencha os campos obrigatórios!")
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            if (selected) {
                let order = {
                    itens: cartItems,
                    numero_pedido: numberGenerator(),
                    nome: nome,
                    uid: userId,
                    telefone: tel,
                    bairro: bairro,
                    rua: rua,
                    numero_casa: numero,
                    referencia: referencia.length > 3 ? referencia : 'Sem referência',
                    total: total,
                    pagamento: 'Cartão',
                    data: formatedDate,
                    hora_pedido: horaPedido
                }
                dispatch(setPedidosEntrega(order))
            } else {
                if (troco.length >= 2) {
                    const trocoTo = `Troco para ${troco}`;
                    let order = {
                        itens: cartItems,
                        numero_pedido: numberGenerator(),
                        nome: nome,
                        uid: userId,
                        telefone: tel,
                        bairro: bairro,
                        rua: rua,
                        numero_casa: numero,
                        referencia: referencia.length > 3 ? referencia : 'Sem referência',
                        total: total,
                        pagamento: trocoTo,
                        data: formatedDate,
                        hora_pedido: horaPedido
                    }
                    dispatch(setPedidosEntrega(order))
                } else {
                    toast.error("Informe o troco")
                }
            }
        }

    };

    return (

        <div>
            <form >
                <div className="flex flex-col ">
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
                    />
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
                    <FormaDePagamento
                        selected={selected}
                        setSelected={setSelected}
                        troco={troco}
                        setTroco={setTroco}
                    />

                </div>
            </form>
            <div className=" flex justify-center my-4">
                <button onClick={handleBackStep} aria-label='Voltar' tabIndex={0} className={` py-2 px-6 shadow-inner mr-12 font-semibold border-[1px] border-solid border-gray-300`}>Voltar</button>
                <button onClick={handleSubmitOrder} aria-label='Finalizar o pedido' tabIndex={0} className='py-2 px-6 shadow-inner  font-semibold border-[1px] border-solid border-gray-300 '>
                    Finalizar
                </button>
            </div>
        </div>
    )
}

export default NextStepForm;