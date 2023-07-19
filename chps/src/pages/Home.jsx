
import { useDispatch, useSelector } from 'react-redux';
import { setChangeLogin, setChangeRegister } from '../services/redux/app-state/appSlice';

import FormCadastro from '../components/utils/forms/formCadastro';
import LoginForm from '../components/utils/forms/formLogin';
import HomeLogged from '../components/utils/home/HomeLogged';

function Home() {

    const dispatch = useDispatch();
    const formChange = useSelector((state) => state.appState.changeFormHome);
    const { bgHome } = useSelector((state) => state.images);
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
    const addStylingToInput = (inputElement) => {
        inputElement.classList.add('inputSelected');
    };

    const removeStylingFromInput = (inputElement) => {
        inputElement.classList.remove('inputSelected');
    };

    const handleFocusInput = (ref) => {
        if (ref.current) {
            addStylingToInput(ref.current);
        }
    };

    const handleBlur = (ref) => {
        if (ref.current) {
            removeStylingFromInput(ref.current);
        }
    };

    return (

        isLogged ? <HomeLogged /> :
            < div className=' flex h-screen ' >
                <img src={bgHome} className='h-full sm:hidden absolute' alt="background-image" />
                {
                    formChange ?
                        <LoginForm
                            handleChangeForm={handleChangeForm}
                            handleFocusInput={handleFocusInput}
                            handleBlur={handleBlur}
                        /> :
                        <FormCadastro
                            handleChangeForm={handleChangeForm}
                            handleFocusInput={handleFocusInput}
                            handleBlur={handleBlur}
                        />
                }

            </div >

    )
}


export default Home;