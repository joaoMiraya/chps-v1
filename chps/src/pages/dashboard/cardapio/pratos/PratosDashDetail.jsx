import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPratos } from "../../../../services/redux/items/pratosSlice";
import { db, storage } from "../../../../services/firebase/firebase";
import { useEffect, useState } from "react";
import Loading from '../../../../components/partials/Loading';
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import EditPratos from "./utils/EditPratos";

function PratosDashDetail() {

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPratos());
    }, [dispatch]);

    const { pratos } = useSelector(state => state.pratos);
    const prato = pratos.find((lanche) => lanche.id === id);

    const [oldImagePath, setOldImagePath] = useState('');

    //AGUARDA O FETCH DO PRATO PARA DESESTRUTURAR O CAMINHO DA IMAGEM
    useEffect(() => {
        if (prato) {
            const { caminhoImagem } = prato;
            setOldImagePath(caminhoImagem)
        } else {
            return
        }
    }, [prato])

    const handleDeletePrato = async () => {
        const oldImageRef = ref(storage, oldImagePath);
        await deleteObject(oldImageRef).then(() => {
        }).catch((error) => {
            console.log(error);
        });
        await deleteDoc(doc(db, "pratos", id));
        window.history.back();
    };



    if (!prato) {
        return <Loading />
    }

    return (
        <div className="flex">
            <div className="flex flex-col w-1/3 h-screen p-6 border-r-2 border-gray-300 border-solid shadow-2xl">
                <h2 className="text-xl text-center">Editar o prato</h2>
                <EditPratos id={id} />
            </div>
            <div className="flex flex-col items-center w-full mt-12">
                <h1 className="text-2xl font-semibold text-center">{prato.nome}</h1>
                <div className="max-w-[20rem]">
                    <img src={prato.imagem} alt={prato.nome} />
                </div>
                <p>{prato.ingredientes}</p>
                <div className="flex justify-around w-full">
                    <p className="font-semibold">Valor:</p>
                    <p>R${prato.valor}</p>
                </div>
                <button onClick={handleDeletePrato} className="bg-[#DB0007] w-4/5 mt-6 hover:opacity-75 text-white font-semibold py-2 rounded-md">
                    Excluir Prato
                </button>
            </div>
        </div>
    )
}


export default PratosDashDetail;