import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

function SearchItems({ items, cat }) {
    SearchItems.propTypes = {
        items: PropTypes.array.isRequired
    };

    const [searchValue, setSearchValue] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const getItems = () => {
        let itemsName = [];
        for (const item of items) {
            itemsName.push(item.nome);
        }
        return itemsName;
    };

    const handleSearchItem = async (e) => {
        e.preventDefault()
        const itemFinded = await items.find(item => item.nome == searchValue);
        if (itemFinded) {
            navigate(`/mesas/${id}/pedido/${cat}/${itemFinded.id}`)
        } else {
            toast.error("Item não encontrado, digite um nome válido")
        }
    };

    return (

        <>
            <div className='flex justify-center pt-12'>
                <input
                    className='pl-2 rounded-l-md shadow-md'
                    type="search"
                    name="searchItems"
                    id="searchItems"
                    placeholder="Busque um item..."
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                    list="items-list"
                />
                <datalist id="items-list">
                    {getItems().map((item, i) => (
                        <option key={i} value={item} />
                    ))}
                </datalist>
                <button onClick={(e) => handleSearchItem(e)} className='bg-black p-2 rounded-r-md'><BsSearch color='white' size={25} /></button>
            </div>
        </>
    )
}

export default SearchItems;