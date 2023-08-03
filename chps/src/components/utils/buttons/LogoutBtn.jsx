import { AiOutlineLogout } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { logout } from '../../../services/redux/users/authSlice';



function LogoutBtn() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout)
    }


    return (
        <div onClick={handleLogout} aria-label='Botão para sair da conta' className='shadowToLogout z-40 cursor-pointer flex justify-center items-center text-gray-400 border-[1px] border-solid border-gray-200 rounded-full p-2'>
            <AiOutlineLogout size={30} />
        </div>
    )
}

export default LogoutBtn;