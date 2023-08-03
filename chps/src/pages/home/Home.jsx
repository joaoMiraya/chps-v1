import { lazy, useState } from 'react';
import { useSelector } from 'react-redux';
import PedidoRapido from './forms/PedidoRapido';

const LoginComp = lazy(() => import("./forms/LoginComp"));
const HomeLogged = lazy(() => import("./HomeLogged"));

function Home() {

    const { isLogged } = useSelector((state) => state.auth);
    const [showPass, setShowPass] = useState(false);

    const handleShowPassword = () => {
        if (!showPass) {
            setShowPass(true)
        } else {
            setShowPass(false)
        }
    }

    return (
        isLogged ? <HomeLogged /> :
            <div>
                <PedidoRapido />
                <LoginComp
                    handleShowPassword={handleShowPassword}
                    showPass={showPass}
                />
            </div >
    )
}


export default Home;