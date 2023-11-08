import { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "@services/firebase/firebase";
import { fetchPorcoes } from "@services/redux/items/porcoesSlice";

const EditPorcoes = lazy(() => import("./utils/EditPorcao"));
const Loading = lazy(() => import("@components/partials/Loading"));

function PorcoesDashDetail() {

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPorcoes());
    }, [dispatch]);

    const { porcoes } = useSelector(state => state.porcoes);
    const porcao = porcoes.find((porcao) => porcao.id === id);

    const [oldImagePath, setOldImagePath] = useState('');

    //AGUARDA O FETCH DO PRATO PARA DESESTRUTURAR O CAMINHO DA IMAGEM
    useEffect(() => {
        if (porcao) {
            const { caminhoImagem } = porcao;
            setOldImagePath(caminhoImagem)
        } else {
            return
        }
    }, [porcao])

    const handleDeletePrato = async () => {
        const oldImageRef = ref(storage, oldImagePath);
        await deleteObject(oldImageRef).then(() => {
        }).catch((error) => {
            console.log(error);
        });
        await deleteDoc(doc(db, "porcoes", id));
        window.history.back();
    };



    if (!porcao) {
        return <Loading />
    }

    return (
        <div className="flex">
            <div className="flex flex-col w-1/3 h-screen p-6 border-r-2 border-gray-300 border-solid shadow-2xl">
                <h2 className="text-xl text-center">Editar a Porção</h2>
                <EditPorcoes id={id} />
            </div>
            <div className="flex flex-col items-center w-full mt-12">
                <h1 className="text-2xl font-semibold text-center">{porcao.nome}</h1>
                <div className="max-w-[20rem]">
                    <img src={porcao.imagem} alt={porcao.nome} />
                </div>
                <p>{porcao.ingredientes}</p>
                <div className="flex justify-around w-full">
                    <p className="font-semibold">Valor:</p>
                    <p>Meia R${porcao.valorM}</p>
                    <p>Inteira R${porcao.valorI}</p>
                </div>
                <button onClick={handleDeletePrato} className="bg-[#DB0007] w-4/5 mt-6 hover:opacity-75 text-white font-semibold py-2 rounded-md">
                    Excluir Porção
                </button>
            </div>
        </div>
    )
}


export default PorcoesDashDetail;