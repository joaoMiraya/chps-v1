import motoboySvg from '../../../assets/images/motoboy.svg';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMotoboys } from "../../../services/redux/users/usersSlice";
import { Link } from "react-router-dom";

function EntregasDash() {
    const dispatch = useDispatch();
    const { motoboys } = useSelector(state => state.users)

    useEffect(() => {
        dispatch(getMotoboys());
    }, [dispatch]);
    

    return (

        <>
            <div className="flex flex-col gap-4 justify-center items-center">
                <h1 className="text-center font-semibold mt-6 text-2xl">Selecione o entregador</h1>

                <div className="flex gap-4">
                    {motoboys?.map((motoboy) => {
                        return (
                            <Link to={`/dashboard/entregas/${motoboy.uid}`} key={motoboy.uid} className=" shadow-xl cursor-pointer hover:scale-105 p-6 rounded-xl text-center ">
                                <div className="w-[10rem] flex flex-col">
                                    <img src={motoboySvg} alt="motoboy" />
                                    <p className="font-semibold">{motoboy.name}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>

            </div>

        </>

    )
}

export default EntregasDash;