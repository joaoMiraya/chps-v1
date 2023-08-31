import { useDispatch, useSelector } from "react-redux";
import { setAppOnline } from "../../../services/redux/app/appSlice";

function LigarDesligarApp() {

    const dispatch = useDispatch();
    const { appOnline } = useSelector(state => state.app);

    const handleSetAppState = (status) => {
        dispatch(setAppOnline(status))
    };

    return (
        <>
            <h1 className="text-xl text-center my-4 font-semibold">Ligue / Desligue a aplicação</h1>
            <div className="flex w-full justify-around  relative">
                <button onClick={() => handleSetAppState(true)} className={`${JSON.parse(appOnline) ? 'bg-green-600' : ' '} border-[1px] border-solid border-gray-300 hover:bg-green-600 transition-all duration-300 py-2 px-12`}>Ligar</button>
                <button onClick={() => handleSetAppState(false)} className={`${JSON.parse(appOnline) ? '' : ' bg-red-600'} border-[1px] border-solid border-gray-300 hover:bg-red-600  transition-all duration-300 py-2 px-12`}>Desligar</button>
            </div>
        </>
    )
}


export default LigarDesligarApp;