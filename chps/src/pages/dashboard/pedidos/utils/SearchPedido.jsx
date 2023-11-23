import PropTypes from 'prop-types';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SearchPedido({ order }) {
    SearchPedido.propsType = {
        order: PropTypes.array.isRequired
    };
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');

    const getOrderNumber = () => {
        let numbers = [];
        for (const pedido of order) {
            numbers.push(pedido.numero_pedido);
        }
        return numbers;
    };

    const handleSearchOrder = async (e) => {
        e.preventDefault()
        const orderFinded = await order.find(pedido => pedido.numero_pedido == searchValue);
        if (orderFinded) {
            navigate(`/dashboard/pedidos/${searchValue}`)
        } else {
            toast.error("Pedido não encontrado, digite um número válido")
        }
    };

    return (
        <div >
            <form onSubmit={(e) => handleSearchOrder(e)}>
                <div className="flex shadow-md max-w-[20rem] my-4 items-center border-[1px] border-solid border-gray-300 rounded-xl">
                    <input value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="min-w-[16rem] pl-2 w-full"
                        type="search"
                        name="searchOrder"
                        id="searchOrder"
                        placeholder="Procure por um número de pedido"
                        list="order-list"
                    />
                    <datalist id="order-list">
                        {getOrderNumber().map((number, i) => (
                            <option key={i} value={number} />
                        ))}
                    </datalist>
                    <button type='submit' className="bg-black py-2 px-4 rounded-r-xl text-white"><AiOutlineSearch size={25} /></button>
                </div>
            </form>
        </div>
    )
}

export default SearchPedido;