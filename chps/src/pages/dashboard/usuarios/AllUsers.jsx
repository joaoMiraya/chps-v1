import { useDispatch, useSelector } from "react-redux";
import { lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { fetchUsers } from "@services/redux/users/usersSlice";


const SearchUser = lazy(() => import("./utils/SearchUser"));

function AllUsers() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    const { users } = useSelector(state => state.users);

    const [showWorkers, setShowWorkers] = useState(false);
    const [workers, setWorkers] = useState({});

    useEffect(() => {
        const getWorkers = async () => {
            try {
                const waiter = users.filter(user => user.role === "garçom");
                const motoboy = users.filter(user => user.role == "motoboy");
                const concatenatedWorkers = waiter.concat(motoboy);
                setWorkers(concatenatedWorkers)
            } catch (err) {
                console.log(err);
            }
        };
        getWorkers();
    }, [users]);



    return (
        <div className="flex flex-col items-center w-full px-24">
            <h2 className="text-2xl font-semibold text-center my-6">Todos os {showWorkers ? 'Funcionarios' : 'Usuarios'}</h2>
            <div className="flex w-full justify-between">

                <button onClick={() => setShowWorkers(!showWorkers)} className="shadow-inner border-[1px] border-gray-300 border-solid font-semibold w-[12rem] rounded-2xl px-4">{showWorkers ? "Todos usuarios" : "Funcionarios"}</button>

                <SearchUser users={users} />
            </div>
            <table className="w-full mt-6 text-start">
                <thead>
                    <tr>
                        <th>Data Cadastro</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>UID</th>
                        <th>Função</th>
                    </tr>
                </thead>
                <tbody>
                    {!showWorkers ? users.map((user) => (
                        <tr key={user.id} className="border-2 border-solid border-gray-300">
                            <td className="p-2">{user.date_register}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.uid}</td>
                            <td>{user.role}</td>
                            <td className="text-center underline"><Link to={`/dashboard/usuarios/${user.uid}`} className="">Ver Detalhes</Link></td>
                        </tr>
                    )) : workers.map((user) => (
                        <tr key={user.id} className="border-2 border-solid border-gray-300">
                            <td className="p-2">{user.date_register}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.uid}</td>
                            <td>{user.role}</td>
                            <td className="text-center underline"><Link to={`/dashboard/usuarios/${user.uid}`} className="">Ver Detalhes</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default AllUsers;