import { useEffect, useState } from "react";
import LogoutBtn from "../../components/utils/buttons/LogoutBtn";
import Capa from "./comps/Capa";
import Perfil from "./comps/Perfil";

function Profile() {



    const user = JSON.parse(localStorage.getItem("User"))
    const [letter, setLetter] = useState('');


    useEffect(() => {
        if (user.name) {
            const user = JSON.parse(localStorage.getItem("User"))
            const firstLetter = user.name.charAt(0);
            setLetter(firstLetter)
        } else {
            setLetter('U')
        }
    }, [user])

    return (
        <div className=" flex flex-col ">
            <div className="flex w-full justify-end p-4">
                <LogoutBtn />
            </div>
            <div className="px-6 relative flex justify-center">
                <Capa />
                <Perfil letter={letter} />
            </div>

        </div>
    )
}


export default Profile;