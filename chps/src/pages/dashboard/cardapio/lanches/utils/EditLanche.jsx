import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { editLanche } from '../../../../../services/redux/items/lanchesSlice';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../../../services/firebase/firebase';


function EditLanche({ id }) {
    EditLanche.propTypes = {
        id: PropTypes.string.isRequired,
    };

    const dispatch = useDispatch();
    const { lanches } = useSelector(state => state.lanches);
    const snack = lanches.find((lanche) => lanche.id === id);
    const { caminhoImagem } = snack;

    const [submitting, setSubmitting] = useState(false);

    const [editImageLanche, setEditImageLanche] = useState('');
    const [editPathImageLanche, setEditPathImageLanche] = useState('');
    const [editNomeLanche, setEditNomeLanche] = useState('');
    const [editCategoryLanche, setEditCategoryLanche] = useState('');
    const [editIngreLanche, setEditIngreLanche] = useState('');
    const [editValorLanche, setEditValorLanche] = useState('');

    const resetForm = () => {
        setEditImageLanche('');
        setEditNomeLanche('');
        setEditCategoryLanche('');
        setEditIngreLanche('');
        setEditValorLanche('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const values = {
                id: id, // Replace with the lanche ID you want to edit
                imagem: editImageLanche,
                caminhoImagem: editPathImageLanche,
                nome: editNomeLanche,
                categoria: editCategoryLanche,
                ingredientes: editIngreLanche,
                valor: editValorLanche
            };
            dispatch(editLanche(values));
            setSubmitting(false);
            resetForm();
        } catch (error) {
            toast.error("Ocorreu um erro ao editar o lanche: " + error);
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
        const lancheImagesRef = ref(storage, `/items-images/lanche-images/${file.name + Date.now()}`);
        await uploadBytes(lancheImagesRef, file).then((snapshot) => {
            //SALVA O CAMINHO DA IMAGEM PARA EXCLUSÃO FUTURA
            setEditPathImageLanche(snapshot.metadata.fullPath)
            const customId = "custom-id-yes"
            toast.success(`${snapshot.metadata.name} adicionada com sucesso`, { toastId: customId })
            console.log(file.name);
        });
        if (file) {
            //BAIXA A URL DA IMAGEM E SETA O VALOR NO STATE
            await getDownloadURL(lancheImagesRef)
                .then((url) => {
                    setEditImageLanche(url);
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
                <label htmlFor="imagemLanche">Escolha a imagem do lanche</label>
                <input type="file"
                    name="imagemLanche"
                    id="imagemLanche"
                    onChange={handleImageChange}
                />


                <label htmlFor="nomeLanche">Nome do Lanche</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="text"
                    name="nomeLanche"
                    id="nomeLanche"
                    onChange={(e) => setEditNomeLanche(e.target.value)}
                    required
                    value={editNomeLanche}
                    placeholder={snack.nome}
                />


                <label htmlFor="categoriaLanche">Categoria do Lanche</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="text"
                    name="categoriaLanche"
                    id="categoriaLanche"
                    onChange={(e) => setEditCategoryLanche(e.target.value)}
                    required
                    value={editCategoryLanche}
                    placeholder={snack.categoria}
                />


                <label htmlFor="ingredientesLanche">Ingredientes do Lanche</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="text"
                    name="ingredientesLanche"
                    id="ingredientesLanche"
                    onChange={(e) => setEditIngreLanche(e.target.value)}
                    required
                    value={editIngreLanche}
                    placeholder={snack.ingredientes}
                />


                <label htmlFor="valorLanche">Valor do Lanche</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="number"
                    name="valorLanche"
                    id="nomeLanche"
                    onChange={(e) => setEditValorLanche(e.target.value)}
                    required
                    value={editValorLanche}
                    placeholder={snack.valor}
                />


                <button type="submit" disabled={submitting} className="bg-[#D4AA3C] hover:opacity-75 text-white font-semibold py-2 rounded-md">
                    {submitting ?
                        <div className="spinner-border h-6 w-6" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        : 'Alterar Lanche'}
                </button>
            </div>
        </form>

    )
}


export default EditLanche;