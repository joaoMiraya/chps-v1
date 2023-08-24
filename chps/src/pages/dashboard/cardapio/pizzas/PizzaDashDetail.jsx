import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPizzas } from "../../../../services/redux/items/pizzasSlice";
import { db, storage } from "../../../../services/firebase/firebase";
import { lazy, useEffect, useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const EditPizza = lazy(() => import("./utils/EditPizza"));
const Loading = lazy(() => import("../../../../components/partials/Loading"));

function PizzaDashDetail() {

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPizzas());
    }, [dispatch]);

    const { pizzas } = useSelector(state => state.pizzas);
    const pizza = pizzas.find((pizza) => pizza.id === id);

    const [oldImagePath, setOldImagePath] = useState('');

    //AGUARDA O FETCH DO LANCHE PARA DESESTRUTURAR O CAMINHO DA IMAGEM
    useEffect(() => {
        if (pizza) {
            const { caminhoImagem } = pizza;
            setOldImagePath(caminhoImagem)
        } else {
            return
        }
    }, [pizza])

    const handleDeletePizza = async () => {
        const oldImageRef = ref(storage, oldImagePath);
        await deleteObject(oldImageRef).then(() => {
        }).catch((error) => {
            console.log(error);
        });
        await deleteDoc(doc(db, "pizzas", id));
        window.history.back();
    };

    if (!pizza) {
        return <Loading />
    }

    return (
        <div className="flex">
            <div className="flex flex-col w-1/3 h-screen p-6 border-r-2 border-gray-300 border-solid shadow-2xl">
                <h2 className="text-xl text-center">Editar a Pizza</h2>
                <EditPizza id={id} />
            </div>
            <div className="flex flex-col items-center w-full mt-12">
                <h1 className="text-2xl font-semibold text-center">{pizza.nome}</h1>
                <div className="max-w-[20rem]">
                    <img src={pizza.imagem} alt={pizza.nome} />
                </div>
                <p>{pizza.ingredientes}</p>
                <div className="flex justify-around w-full">
                    <p className="font-semibold">Valor Individual:</p>
                    <p>R${pizza.valorP}</p>
                </div>
                <div className="flex justify-around w-full">
                    <p className="font-semibold">Valor Família:</p>
                    <p>R${pizza.valorF}</p>
                </div>
                <button onClick={handleDeletePizza} className="bg-[#DB0007] w-4/5 mt-6 hover:opacity-75 text-white font-semibold py-2 rounded-md">
                    Excluir Pizza
                </button>
            </div>
        </div>
    )
}


export default PizzaDashDetail;