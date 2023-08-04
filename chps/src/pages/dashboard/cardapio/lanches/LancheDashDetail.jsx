import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EditLanche from "./utils/EditLanche";
import { fetchLanches } from "../../../../services/redux/items/itemsSlice";
import { db, storage } from "../../../../services/firebase/firebase";
import { useEffect } from "react";
import Loading from '../../../../components/partials/Loading';
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

function LancheDashDetail() {
    const { id } = useParams();
    const { lanches } = useSelector(state => state.items);
    const snack = lanches.find((lanche) => lanche.id === id);
        const { caminhoImagem } = snack;
    const dispatch = useDispatch();

    const handleDeleteLanche = async () => {
        const oldImageRef = ref(storage, caminhoImagem);
        await deleteObject(oldImageRef).then(() => {
        }).catch((error) => {
            console.log(error);
        });
        await deleteDoc(doc(db, "lanches", id));
        window.history.back();
    };

    useEffect(() => {
        dispatch(fetchLanches());
    }, [dispatch]);

    if (!snack) {
        return <Loading />
    }

    return (
        <div className="flex">
            <div className="flex flex-col w-1/3 h-screen p-6 border-r-2 border-gray-300 border-solid shadow-2xl">
                <h2 className="text-xl text-center">Editar o lanche</h2>
                <EditLanche id={id} />
            </div>
            <div className="flex flex-col items-center w-full mt-12">
                <h1 className="text-2xl font-semibold text-center">{snack.nome}</h1>
                <div className="max-w-[20rem]">
                    <img src={snack.imagem} alt={snack.nome} />
                </div>
                <p>{snack.ingredientes}</p>
                <div className="flex justify-around w-full">
                    <p className="font-semibold">Valor:</p>
                    <p>R${snack.valor}</p>
                </div>
                <button onClick={handleDeleteLanche} className="bg-[#DB0007] w-4/5 mt-6 hover:opacity-75 text-white font-semibold py-2 rounded-md">
                    Excluir Lanche
                </button>
            </div>
        </div>
    )
}


export default LancheDashDetail;