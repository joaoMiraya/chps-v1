import { useEffect, useState } from "react";


function HomeLogged() {

    const [user, setUser] = useState('');

    useEffect(() => {
        if (sessionStorage.getItem("User")) {
            const user = JSON.parse(sessionStorage.getItem("User"))
            setUser(user.name)
        } else if (localStorage.getItem("User")) {
            const user = JSON.parse(localStorage.getItem("User"))
            setUser(user.name)
        }
    }, [])


    return (
        <div className="pt-12">
            <h1 className="text-2xl text-center font-semibold">Olá, {user ? user : 'Usuario'}</h1>
            <div>

            </div>
        </div>
    )
}

export default HomeLogged;