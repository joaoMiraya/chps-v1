import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { createAcrescimo } from '@services/redux/items/acrescimosSlice';
import { converterStringToFloat } from '@javascript/main';


function AcrescimosAdd() {
    const dispatch = useDispatch();

    const [submiting, setSubmiting] = useState(false);


    const [nomeAcrescimo, setNomeAcrescimo] = useState('');
    const [valorAcrescimo, setValorAcrescimo] = useState('');

    const resetForm = () => {
        setValorAcrescimo('');
        setNomeAcrescimo('');
    };

    //FAZ O DISPATCH DOS VALORES PARA O REDUX SALVAR NO FIRESTORE
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmiting(true)
        try {
            const values = {
                nome: nomeAcrescimo,
                valor: converterStringToFloat(valorAcrescimo)
            };
            dispatch(createAcrescimo(values));
            setSubmiting(false)
            resetForm();
        } catch (error) {
            toast.error("Ocorreu um erro ao adiconar o lanche:", error);
        }
    }


    return (

        <form onSubmit={handleSubmit} >
            <div className="flex flex-col gap-2 mt-6">

                <label htmlFor="nomeAcrescimo">Nome do Acréscimo</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="text"
                    name="nomeAcrescimo"
                    id="nomeAcrescimo"
                    onChange={(e) => setNomeAcrescimo(e.target.value)}
                    required
                    value={nomeAcrescimo}
                />

                <label htmlFor="valorAcrescimo">Valor do Acréscimo</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="number"
                    name="valorAcrescimo"
                    id="valorAcrescimo"
                    onChange={(e) => setValorAcrescimo(e.target.value)}
                    required
                    value={valorAcrescimo}
                />

                <button type="submit" disabled={submiting} className="bg-[#98C379] hover:opacity-75 text-white font-semibold py-2 rounded-md">
                    {submiting ?
                        <div className="spinner-border h-6 w-6" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        : 'Adicionar Acréscimo'}
                </button>
            </div>
        </form>

    )
}


export default AcrescimosAdd;