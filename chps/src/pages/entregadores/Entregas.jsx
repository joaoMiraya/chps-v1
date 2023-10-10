import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchPedidosAndamento, getEntregasOnCourse } from "../../services/redux/pedidos/pedidosSlice";
import SearchEntregas from "./utils/SearchEntregas";
import { auth } from "../../services/firebase/firebase";
import { getUser } from "../../services/redux/users/usersSlice";
import { AiFillCaretRight } from "react-icons/ai";

function Entregas() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPedidosAndamento());
    }, [dispatch]);

    const { entregas } = useSelector(state => state.pedidos);

    const entregasFiltred = getEntregasOnCourse(entregas);

    const [userEntregas, setUserEntregas] = useState(false);
    const [user, setUser] = useState('');

    useEffect(() => {
        const handleFetchUserEntregas = async () => {
            const user = await getUser();
            setUser(user.uid)
            for (const entrega of entregasFiltred) {
                if (entrega.motoboy == user.uid) {
                    setUserEntregas(true);
                }
            }
        };
        handleFetchUserEntregas();
    }, [entregasFiltred]);

    console.log(userEntregas);

    return (
        <>
            <h2 className="text-2xl font-semibold text-center mt-6">Selecione suas entregas</h2>
            <div className={` justify-end pr-6 my-6 ${userEntregas ? 'flex' : 'hidden'}`}>
                <Link to={`/entregas/andamento/${user}`} className="py-2 pr-3 shadow-md pl-6 font-semibold text-white bg-red-900 rounded-xl flex items-center">Ver suas entregas
                    <AiFillCaretRight size={25} />
                </Link>
            </div>
            <SearchEntregas entregas={entregas} />
            <div className="flex justify-center flex-wrap gap-4 px-12">
                {entregas?.map((entrega) => {
                    return (
                        <Link to={`/entregas/${entrega.numero_pedido}`} key={entrega.key} className="flex flex-col shadow-xl p-4 rounded-xl hover:scale-105 cursor-pointer">
                            {entrega.itens.map((item, i) => {
                                return (
                                    <ul key={i}>
                                        <li className="font-semibold">{item.nome}</li>
                                    </ul>
                                )
                            })}
                            <p>Cliente: {entrega.nome}</p>
                            <p>Bairro: {entrega.bairro}</p>
                            <p>Rua: {entrega.rua + ',' + ' ' + entrega.numero_casa}</p>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}

export default Entregas;