import { lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChangeLogin, setChangeRegister } from '../../services/redux/app-state/appSlice';

const LoginComp = lazy(() => import("./forms/LoginComp"));
const RegisterComp = lazy(() => import("./forms/RegisterComp"));
const HomeLogged = lazy(() => import("./HomeLogged"));


function Home() {

    const dispatch = useDispatch();

    const formChange = useSelector((state) => state.appState.changeFormHome);
    const { isLogged } = useSelector((state) => state.auth);


    /* FUNÇÃO PARA TROCAR DE FORMULARIO */
    const handleChangeForm = () => {
        if (formChange) {
            dispatch(setChangeRegister())
        } else {
            dispatch(setChangeLogin())
        }
    };

    return (

        isLogged ? <HomeLogged /> :
            <div>
                {
                    formChange ?
                        <LoginComp
                            handleChangeForm={handleChangeForm}
                        /> :
                        <RegisterComp
                            handleChangeForm={handleChangeForm}
                        />
                }

            </div >

    )
}


export default Home;