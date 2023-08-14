import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { editBebida } from '../../../../../services/redux/items/bebidasSlice';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../../../services/firebase/firebase';


function EditBebida({ id }) {
    EditBebida.propTypes = {
        id: PropTypes.string.isRequired,
    };

    const dispatch = useDispatch();
    const { bebidas } = useSelector(state => state.bebidas);
    const bebida = bebidas.find((bebida) => bebida.id === id);
    const { caminhoImagem, nome, imagem, categoria, valor } = bebida;

    const [submitting, setSubmitting] = useState(false);

    const [editImageBebida, setEditImageBebida] = useState(imagem);
    const [editPathImageBebida, setEditPathImageBebida] = useState(caminhoImagem);
    const [editNomeBebida, setEditNomeBebida] = useState(nome);
    const [editCategoryBebida, setEditCategoryBebida] = useState(categoria);
    const [editValorBebida, setEditValorBebida] = useState(valor);

    const resetForm = () => {
        setEditImageBebida('');
        setEditNomeBebida('');
        setEditCategoryBebida('');
        setEditValorBebida('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const values = {
                id: id, // Replace with the lanche ID you want to edit
                imagem: editImageBebida,
                caminhoImagem: editPathImageBebida,
                nome: editNomeBebida,
                classe: "bebida",
                categoria: editCategoryBebida,
                valor: editValorBebida
            };
            dispatch(editBebida(values));
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
        const bebidaImagesRef = ref(storage, `/items-images/bebidas-images/${file.name + Date.now()}`);
        await uploadBytes(bebidaImagesRef, file).then((snapshot) => {
            //SALVA O CAMINHO DA IMAGEM PARA EXCLUSÃO FUTURA
            setEditPathImageBebida(snapshot.metadata.fullPath)
            const customId = "custom-id-yes"
            toast.success(`${snapshot.metadata.name} adicionada com sucesso`, { toastId: customId })
            console.log(file.name);
        });
        if (file) {
            //BAIXA A URL DA IMAGEM E SETA O VALOR NO STATE
            await getDownloadURL(bebidaImagesRef)
                .then((url) => {
                    setEditImageBebida(url);
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
                <label htmlFor="imagemLanche">Escolha a imagem da bebida</label>
                <input type="file"
                    name="imagemLanche"
                    id="imagemLanche"
                    onChange={handleImageChange}
                />


                <label htmlFor="nomeLanche">Nome da Bebida</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="text"
                    name="nomeLanche"
                    id="nomeLanche"
                    onChange={(e) => setEditNomeBebida(e.target.value)}
                    required
                    value={editNomeBebida}
                    placeholder={bebida.nome}
                />


                <label htmlFor="categoriaLanche">Categoria da Bebida</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="text"
                    name="categoriaLanche"
                    id="categoriaLanche"
                    onChange={(e) => setEditCategoryBebida(e.target.value)}
                    required
                    value={editCategoryBebida}
                    placeholder={bebida.categoria}
                />

                <label htmlFor="valorLanche">Valor da Bebida</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="number"
                    name="valorLanche"
                    id="nomeLanche"
                    onChange={(e) => setEditValorBebida(e.target.value)}
                    required
                    value={editValorBebida}
                    placeholder={bebida.valor}
                />


                <button type="submit" disabled={submitting} className="bg-[#D4AA3C] hover:opacity-75 text-white font-semibold py-2 rounded-md">
                    {submitting ?
                        <div className="spinner-border h-6 w-6" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        : 'Alterar Bebida'}
                </button>
            </div>
        </form>

    )
}


export default EditBebida;