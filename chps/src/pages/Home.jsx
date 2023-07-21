
import { useDispatch, useSelector } from 'react-redux';
import { setChangeLogin, setChangeRegister } from '../services/redux/app-state/appSlice';

// COMPONENTES DE LOGIN BETA
/* import FormCadastro from '../components/utils/forms/formCadastro';
import LoginForm from '../components/utils/forms/formLogin'; */

import LoginComp from '../components/utils/home/forms/LoginComp';
import RegisterComp from '../components/utils/home/forms/RegisterComp';
import HomeLogged from '../components/utils/home/HomeLogged';

function Home() {

    const dispatch = useDispatch();
    /* const { bgHome } = useSelector((state) => state.images); */
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
    /* 
        const handleFocusInput = (ref) => {
            if (ref.current) {
                ref.current.classList.toggle('inputSelected');
            }
        };
     */


    return (

        isLogged ? <HomeLogged /> :
            < div className=' flex h-screen ' >
                {/*  <img src={bgHome} className='h-full sm:hidden absolute' alt="background-image" /> */}
                {
                    formChange ?
                       /*  <LoginForm
                            handleChangeForm={handleChangeForm}
                        /> */  <LoginComp
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