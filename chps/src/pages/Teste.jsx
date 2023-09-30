import { print } from "../../server/qz/print";
import { getUser } from "../services/redux/users/authSlice";

function Teste() {


    const handleClick = async () => {
        const user = await getUser();
        console.log(user);
    };
    return (

        <>
            <div className="flex h-screen justify-center items-center">
                <button onClick={handleClick}>print</button>
            </div>
        </>
    )
}

export default Teste;