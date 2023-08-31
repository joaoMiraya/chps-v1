
import { useSelector } from "react-redux";

function AppFechado() {

    const { appOnline } = useSelector(state => state.app);

    return (

        <div className={`${JSON.parse(appOnline) ? ' hidden  ' : ' fixed '} bottom-14 flex items-center justify-center w-full bg-red-500 h-[3rem]`}>
            <h1 className="text-white text-xl font-semibold">Estamos fechados no momento</h1>
        </div>
    )
}


export default AppFechado;