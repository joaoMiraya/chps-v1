import { useParams } from "react-router-dom";
import { fetchUsers, setUserRole } from "../../../services/redux/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loading from "../../../components/partials/Loading";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../services/firebase/firebase";


function UsuarioDetalhes() {

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const { users } = useSelector(state => state.users);
    const user = users?.find(user => user.uid === id)

    const handleSetRole = async (role) => {
        try {
            const values = {
                id: user.id,
                role: role
            }
            dispatch(setUserRole(values));
        }
        catch (err) {
            console.log(err);
        }
    };

    const handleDeleteUser = async () => {
        await deleteDoc(doc(db, "usuarios", user.id));
        window.history.back();
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

                    </tr>
                </tbody>
            </table>
            <div className="flex flex-col mt-6">
                <h2 className="text-2xl font-semibold text-center">Conceda permissão ao usuario</h2>
                <div className="flex justify-center gap-4 p-2">
                    <button onClick={() => handleSetRole('garçom')} className={`border-green-600 hover:bg-green-600 transition-all duration-300 hover:text-white border-solid border-2 text-green-600 py-2 px-6`}>Garçom</button>
                    <button onClick={() => handleSetRole('motoboy')} className={`border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 border-solid border-2 text-blue-600 py-2 px-6`}>Motoqueiro</button>
                    <button onClick={() => handleSetRole('cliente')} className="border-yellow-600 hover:bg-yellow-600 hover:text-white  transition-all duration-300 text-yellow-500 border-solid border-2 bg py-2 px-6">Cliente</button>
                </div>
                <hr className="my-6" />
                <button onClick={handleDeleteUser} className="border-red-600 hover:bg-red-600 hover:text-white  transition-all duration-300 text-red-600 border-solid border-2 bg py-2 px-6">Excluir</button>
            </div>


        </div>
    )
}


export default UsuarioDetalhes;