import { lazy, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchAcrescimo, editAcrescimo } from '../../../../services/redux/items/acrescimosSlice';
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../services/firebase/firebase";
import { converterStringToFloat } from "../../../../javascript/main";

const Loading = lazy(() => import("../../../../components/partials/Loading"));


function EditAcrescimos() {
    const dispatch = useDispatch();

    const { id } = useParams();
    const { acrescimos } = useSelector(state => state.acrescimos);
    const acrescimo = acrescimos.find((lanche) => lanche.id === id);
    const [submitting, setSubmitting] = useState(false);
    const [nomeAcrEdit, setNomeAcrEdit] = useState('');
    const [valorAcrEdit, setValorAcrEdit] = useState('');

    const resetForm = () => {
        setNomeAcrEdit('');
        setValorAcrEdit('');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const values = {
                id: id,
                nome: nomeAcrEdit,
                valor: converterStringToFloat(valorAcrEdit)
            };
            dispatch(editAcrescimo(values));
            setSubmitting(false);
            resetForm();
        } catch (error) {
            toast.error("Ocorreu um erro ao editar o lanche: " + error);
        }
    };

    const handleDeleteLanche = async () => {
        await deleteDoc(doc(db, "acrescimos", id));
        window.history.back();
    };

    useEffect(() => {
        dispatch(fetchAcrescimo());
    }, [dispatch]);

    if (!acrescimo) {
        return <Loading />
    }
    return (
        <div className="flex p-6">
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="nomeAcrEdit">Altere o nome do Acréscimo</label>
                        <input className="border-b-[1px] border-solid border-gray-300 "
                            type="text"
                            name="nomeAcrEdit"
                            id="nomeAcrEdit"
                            onChange={(e) => setNomeAcrEdit(e.target.value)}
                            value={nomeAcrEdit}
                        />

                        <label htmlFor="valorAcrEdit">Altere o valor do Acréscimo</label>
                        <input className="border-b-[1px] border-solid border-gray-300 "
                            type="string"
                            name="valorAcrEdit"
                            id="valorAcrEdit"
                            onChange={(e) => setValorAcrEdit(e.target.value)}
                            value={valorAcrEdit}
                        />
                        <button type="submit" disabled={submitting} className=" bg-[#D4AA3C] py-2 rounded-lg">Alterar</button>
                    </div>
                </form>
            </div>
            <div className="flex flex-col items-center justify-center w-1/2 mt-6">
                <div className="flex flex-col p-8 border-[1px] border-solid border-gray-200 min-w-[16rem]">
                    <p className="font-semibold">{acrescimo.nome}</p>
                    <p className="font-semibold">R$  {Number(acrescimo.valor).toFixed(2).replace('.', ',')}</p>
                </div>
                <button onClick={handleDeleteLanche} className="bg-[#DB0007] py-2 min-w-[16rem] font-semibold text-white mt-2">Excluir</button>
            </div>

        </div>
    )
}

export default EditAcrescimos;