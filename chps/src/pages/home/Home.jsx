import { lazy, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const PedidoRapido = lazy(() => import("./forms/PedidoRapido"));
const LoginComp = lazy(() => import("./forms/LoginComp"));
const HomeLogged = lazy(() => import("./HomeLogged"));

function Home() {

    const { isLogged, success } = useSelector((state) => state.auth);
    const [showPass, setShowPass] = useState(false);

    const handleShowPassword = () => {
        if (!showPass) {
            setShowPass(true)
        } else {
            setShowPass(false)
        }
    };
    useEffect(() => {
        if (success) {
            setInterval(() => {
                window.location.reload();
            }, 500)
        } else return
    }, [success]);

    return (
        isLogged ? <HomeLogged /> :
            <div className='px-4'>
                <PedidoRapido />
                <div className='flex justify-between items-center my-2'>
                    <span className='w-full bg-[#292929] h-[1px]'></span>
                    <p className='px-4 font-light'>Ou</p>
                    <span className='w-full bg-[#292929]  h-[1px]'></span>
                </div>
                <LoginComp
                    handleShowPassword={handleShowPassword}
                    showPass={showPass}
                />
            </div >
    )
}


export default Home;