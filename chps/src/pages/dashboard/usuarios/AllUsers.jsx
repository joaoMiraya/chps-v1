import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../services/redux/users/authSlice";
import { useEffect } from "react";

function AllUsers() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);


    const { users } = useSelector(state => state.auth);
    console.log(users);
    return (
        <>
            {users.map((user) => {
                return (
                    <div key={user.id}>
                        <h1>{user.id}</h1>
                    </div>
                )
            })}
        </>
    )
}

export default AllUsers;