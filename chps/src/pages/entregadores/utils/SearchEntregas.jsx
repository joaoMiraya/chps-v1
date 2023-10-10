import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { toast } from "react-toastify";
import { AiOutlineSearch } from "react-icons/ai";

function SearchEntregas({ entregas }) {
    SearchEntregas.propTypes = {
        entregas: PropTypes.array.isRequired
    }

    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');

    const getOrder = () => {
        let order = [];
        for (const entrega of entregas) {
            order.push({
                address: entrega.rua + ', ' + entrega.numero_casa,
                orderID: entrega.numero_pedido
            });

        }
        return order;
    };

    const addresses = getOrder().map(address => address.address);




    const handleSearchEntregas = async (e) => {
        e.preventDefault();
        const selectedOrder = entregas.find(entrega => (entrega.rua + ', ' + entrega.numero_casa) === searchValue);
        if (selectedOrder) {
            navigate(`/entregas/${selectedOrder.numero_pedido}`)
        } else {
            toast.error("Endereço não encontrado!")
        }
    };

       return (

        <div className="flex justify-center my-6" >
            <form onSubmit={(e) => handleSearchEntregas(e)}>
                <div className="flex shadow-md items-center border-[1px] border-solid border-gray-300 rounded-xl">
                    <input value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="min-w-[16rem] pl-2"
                        type="search"
                        name="searchAddress"
                        id="searchAddress"
                        placeholder="Procure por um endereço"
                        list="address-list"
                    />
                    <datalist id="address-list">
                        {addresses.map((address) => (
                            <option key={address} value={address} />
                        ))}
                    </datalist>
                    <button type='submit' className="bg-black py-2 px-4 rounded-r-xl text-white"><AiOutlineSearch size={25} /></button>
                </div>
            </form>
        </div>

    )
}

export default SearchEntregas;