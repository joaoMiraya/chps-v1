import { useParams } from "react-router-dom";
import { fetchUsers, setWaiter } from "../../../services/redux/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loading from "../../../components/partials/Loading";


function UsuarioDetalhes() {

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const { users } = useSelector(state => state.users);
    const user = users?.find(user => user.uid === id)

    const handleSetWaiter = async () => {
        try {
            const value = await user.email;
            dispatch(setWaiter(value));
        } catch (error) {
            console.log(error);
        }
    };

    if (!user) {
        return <Loading />
    }
    return (

        <div className="px-24 pt-6">
            <table className="w-full mt-6 text-start">
                <thead>
                    <tr>
                        <th>Data Cadastro</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>UID</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-2 border-solid border-gray-300">
                        <td className="p-2">{user.date_register}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.uid}</td>
                        <td>
                            <div className="flex flex-col gap-4 p-2">
                                <button onClick={handleSetWaiter} className={`border-green-600 border-solid border-2 text-green-600 py-2 px-6`}>Garçom</button>
                                <button className={`border-green-600 border-solid border-2 text-green-600 py-2 px-6`}>Motoqueiro</button>
                                <button className="border-red-600 text-red-600 border-solid border-2 bg py-2 px-6">Excluir</button>
                            </div>
                        </td>
                        <td></td>
                    </tr>
                </tbody>
            </table>


        </div>
    )
}


export default UsuarioDetalhes;