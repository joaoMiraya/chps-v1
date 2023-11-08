import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { fetchBebidas } from "@services/redux/items/bebidasSlice";
import { db, storage } from "@services/firebase/firebase";


const EditBebida = lazy(() => import("./utils/EditBebidas"));
const Loading = lazy(() => import("@components/partials/Loading"));

function BebidasDashDetail() {

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBebidas());
    }, [dispatch]);

    const { bebidas } = useSelector(state => state.bebidas);
    const bebida = bebidas.find((bebida) => bebida.id === id);

    const [oldImagePath, setOldImagePath] = useState('');

    //AGUARDA O FETCH DA BEBIDA PARA DESESTRUTURAR O CAMINHO DA IMAGEM
    useEffect(() => {
        if (bebida) {
            const { caminhoImagem } = bebida;
            setOldImagePath(caminhoImagem)
        } else {
            return
        }
    }, [bebida])

    const handleDeleteBebida = async () => {
        const oldImageRef = ref(storage, oldImagePath);
        await deleteObject(oldImageRef).then(() => {
        }).catch((error) => {
            console.log(error);
        });
        await deleteDoc(doc(db, "bebidas", id));
        window.history.back();
    };



    if (!bebida) {
        return <Loading />
    }

    return (
        <div className="flex">
            <div className="flex flex-col w-1/3 h-screen p-6 border-r-2 border-gray-300 border-solid shadow-2xl">
                <h2 className="text-xl text-center">Editar a bebida</h2>
                <EditBebida id={id} />
            </div>
            <div className="flex flex-col items-center w-full mt-12">
                <h1 className="text-2xl font-semibold text-center">{bebida.nome}</h1>
                <div className="max-w-[20rem]">
                    <img src={bebida.imagem} alt={bebida.nome} />
                </div>
                <p>{bebida.ingredientes}</p>
                <div className="flex justify-around w-full">
                    <p className="font-semibold">Valor:</p>
                    <p>R${bebida.valor}</p>
                </div>
                <button onClick={handleDeleteBebida} className="bg-[#DB0007] w-4/5 mt-6 hover:opacity-75 text-white font-semibold py-2 rounded-md">
                    Excluir bebida
                </button>
            </div>
        </div>
    )
}


export default BebidasDashDetail;