import PropTypes from 'prop-types';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SearchUser({ users }) {
    SearchUser.propsType = {
        users: PropTypes.array.isRequired
    };
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');

    const getEmails = () => {
        let emails = [];
        for (const user of users) {
            emails.push(user.email);
        }
        return emails;
    };

    const handleSearchUser = async (e) => {
        e.preventDefault()
        const userFinded = await users.find(usuario => usuario.email == searchValue);
        if (userFinded) {
            navigate(`/dashboard/usuarios/${userFinded.uid}`)
        } else {
            toast.error("Usuario não encontrado, digite um e-mail válido")
        }
    };

    return (
        <div >
            <form onSubmit={(e) => handleSearchUser(e)}>
                <div className="flex shadow-md items-center border-[1px] border-solid border-gray-300 rounded-xl">
                    <input value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="min-w-[16rem] pl-2"
                        type="search"
                        name="searchUser"
                        id="searchUser"
                        placeholder="Procure por um e-mail"
                        list="email-list"
                    />
                    <datalist id="email-list">
                        {getEmails().map((email, i) => (
                            <option key={email + i} value={email} />
                        ))}
                    </datalist>
                    <button type='submit' className="bg-black py-2 px-4 rounded-r-xl text-white"><AiOutlineSearch size={25} /></button>
                </div>
            </form>
        </div>
    )
}

export default SearchUser;