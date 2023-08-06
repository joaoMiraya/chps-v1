import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { editPizza } from '../../../../../services/redux/items/pizzasSlice';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../../../services/firebase/firebase';


function EditPizza({ id }) {
    EditPizza.propTypes = {
        id: PropTypes.string.isRequired,
    };

    const dispatch = useDispatch();
    const { pizzas } = useSelector(state => state.pizzas);
    const pizza = pizzas.find((Pizza) => Pizza.id === id);
    const { caminhoImagem } = pizza;

    const [submitting, setSubmitting] = useState(false);

    const [editImagePizza, setEditImagePizza] = useState('');
    const [editPathImagePizza, setEditPathImagePizza] = useState('');
    const [editNomePizza, setEditNomePizza] = useState('');
    const [editIngrePizza, setEditIngrePizza] = useState('');
    const [editValorPizzaP, setEditValorPizzaP] = useState('');
    const [editValorPizzaF, setEditValorPizzaF] = useState('');

    const resetForm = () => {
        setEditImagePizza('');
        setEditNomePizza('');
        setEditIngrePizza('');
        setEditValorPizzaP('');
        setEditValorPizzaF('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const values = {
                id: id,
                imagem: editImagePizza,
                caminhoImagem: editPathImagePizza,
                nome: editNomePizza,
                ingredientes: editIngrePizza,
                valorP: editValorPizzaP,
                valorF: editValorPizzaF
            };
            dispatch(editPizza(values));
            setSubmitting(false);
            resetForm();
        } catch (error) {
            toast.error("Ocorreu um erro ao editar o Pizza: " + error);
        }
    };
    //FUNÇÃO RESPOSAVEL PELA EXCLUSÃO DA IMAGEM ANTIGA E UPLOAD DA IMAGEM NOVA... 
    const handleImageChange = async (e) => {
        const oldImageRef = ref(storage, caminhoImagem);
        await deleteObject(oldImageRef).then(() => {
            //EXCLUÍ A IMAGEM ANTIGA NO STORAGE
            toast.warn("imagem antiga excluida")
        }).catch((error) => {
            // Uh-oh, an error occurred!
            console.log(error);
        });
        const file = e.target.files[0];
        const pizzaImagesRef = ref(storage, `/items-images/pizza-images/${file.name + Date.now()}`);
        await uploadBytes(pizzaImagesRef, file).then((snapshot) => {
            //SALVA O CAMINHO DA IMAGEM PARA EXCLUSÃO FUTURA
            setEditPathImagePizza(snapshot.metadata.fullPath)
            const customId = "custom-id-yes"
            toast.success(`${snapshot.metadata.name} adicionada com sucesso`, { toastId: customId })
            console.log(file.name);
        });
        if (file) {
            //BAIXA A URL DA IMAGEM E SETA O VALOR NO STATE
            await getDownloadURL(pizzaImagesRef)
                .then((url) => {
                    setEditImagePizza(url);
                })
                .catch((error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/object-not-found':
                            console.log("Arquivo inválido ou inexistente");
                            break;
                        case 'storage/unauthorized':
                            console.log("Usuario sem permissão");
                            break;
                        case 'storage/canceled':
                            console.log("Ação cancelada");
                            break;
                        // ...
                        case 'storage/unknown':
                            console.log("Error no servidor");
                            break;
                    }
                });
        }
    };

    return (

        <form onSubmit={handleSubmit} >
            <div className="flex flex-col gap-2 mt-6">
                <label htmlFor="imagemPizza">Escolha a imagem da pizza</label>
                <input type="file"
                    name="imagemPizza"
                    id="imagemPizza"
                    onChange={handleImageChange}
                />


                <label htmlFor="nomePizza">Nome do Pizza</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="text"
                    name="nomePizza"
                    id="nomePizza"
                    onChange={(e) => setEditNomePizza(e.target.value)}
                    required
                    value={editNomePizza}
                    placeholder={pizza.nome}
                />

                <label htmlFor="ingredientesPizza">Ingredientes do Pizza</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="text"
                    name="ingredientesPizza"
                    id="ingredientesPizza"
                    onChange={(e) => setEditIngrePizza(e.target.value)}
                    required
                    value={editIngrePizza}
                    placeholder={pizza.ingredientes}
                />

                <label htmlFor="valorPizza">Valor do Pizza Individual</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="text"
                    name="valorPizza"
                    id="nomePizza"
                    onChange={(e) => setEditValorPizzaP(e.target.value)}
                    required
                    value={editValorPizzaP}
                    placeholder={pizza.valorP}
                />

                <label htmlFor="valorPizza">Valor do Pizza Família</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="text"
                    name="valorPizza"
                    id="nomePizza"
                    onChange={(e) => setEditValorPizzaF(e.target.value)}
                    required
                    value={editValorPizzaF}
                    placeholder={pizza.valorF}
                />


                <button type="submit" disabled={submitting} className="bg-[#D4AA3C] hover:opacity-75 text-white font-semibold py-2 rounded-md">
                    {submitting ?
                        <div className="spinner-border h-6 w-6" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        : 'Alterar Pizza'}
                </button>
            </div>
        </form>

    )
}


export default EditPizza;