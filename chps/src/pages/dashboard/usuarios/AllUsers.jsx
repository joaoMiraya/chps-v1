import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../services/redux/users/usersSlice";
import { useEffect } from "react";

import { Link } from "react-router-dom";
import SearchUser from "./utils/SearchUser";

function AllUsers() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    const { users } = useSelector(state => state.users);



    return (
        <div className="flex flex-col items-center w-full px-24">
            <h2 className="text-2xl font-semibold text-center my-6">Todos os Usuarios</h2>
            <SearchUser users={users} />
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
                    {users.map((user) => (
                        <tr key={user.id} className="border-2 border-solid border-gray-300">
                            <td className="p-2">{user.date_register}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.uid}</td>
                            <td className="text-center underline"><Link to={`/dashboard/usuarios/${user.uid}`} className="">Ver Detalhes</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default AllUsers;