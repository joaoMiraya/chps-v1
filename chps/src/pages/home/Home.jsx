import { lazy, useState } from 'react';
import {/*  useDispatch, */ useSelector } from 'react-redux';
/* import { setChangeLogin, setChangeRegister } from '../../services/redux/app-state/appSlice';
 */
const LoginComp = lazy(() => import("./forms/LoginComp"));
/* const RegisterComp = lazy(() => import("./forms/RegisterComp")) */
const HomeLogged = lazy(() => import("./HomeLogged"));


function Home() {

   /*  const dispatch = useDispatch(); */
    const [showPass, setShowPass] = useState(false);

/*     const formChange = useSelector((state) => state.appState.changeFormHome); */
    const { isLogged } = useSelector((state) => state.auth);

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
                <LoginComp
                    handleShowPassword={handleShowPassword}
                    showPass={showPass}
                />
            </div >

    )
}


export default Home;