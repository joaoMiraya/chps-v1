import { lazy, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { fetchPedidosFeitos } from "@services/redux/pedidos/pedidosSlice";

const NpsComp = lazy(() => import("@components/nps/NpsComp"));
const PedidosFeitos = lazy(() => import("./comps/PedidosFeitos"));
const Pedidos = lazy(() => import("./comps/Pedidos"));
const Capa = lazy(() => import("./comps/Capa"));
const PerfilPhoto = lazy(() => import("./comps/PerfilPhoto"));
const LogoutBtn = lazy(() => import("../../components/utils/buttons/LogoutBtn"));
const FormEndPerfil = lazy(() => import("./comps/FormEndPerfil"));

function Profile() {

    const user = JSON.parse(Cookies.get("User"));
    const [letter, setLetter] = useState('');

    //RESPONSÁVEL POR CAPTURAR A PRIMEIRA LETRA DO NOME DO USUARIO
    useEffect(() => {
        if (user) {
            const firstLetter = user.name.charAt(0);
            setLetter(firstLetter.toUpperCase());
        } else {
            return
        }
    }, [user]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPedidosFeitos());
    }, [dispatch]);

    const { pedidos_user } = useSelector(state => state.pedidos);

    return (
        <div className="">
            <div className="flex w-full justify-end p-4">
                <LogoutBtn />
            </div>
            <div className="max-w-[24rem]">

                <div className="px-6 relative flex justify-center">
                    <Capa />
                    <PerfilPhoto letter={letter} />
                </div>

                <section className="pt-16 flex justify-center">
                    <Pedidos />
                </section>

                <section className={`${Cookies.get("Nps") || pedidos_user.length === 0 ? 'hidden' : 'flex'} pt-6 flex justify-center`}>
                    <NpsComp />
                </section>

                <section className="pt-16 px-4 flex justify-center">
                    <PedidosFeitos />
                </section>

                <section className="mt-4">
                    <FormEndPerfil />
                </section>

            </div>
        </div>
    )
}


export default Profile;