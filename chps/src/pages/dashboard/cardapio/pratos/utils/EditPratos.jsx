import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { editLanche } from '../../../../../services/redux/items/lanchesSlice';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../../../services/firebase/firebase';


function EditPratos({ id }) {
    EditPratos.propTypes = {
        id: PropTypes.string.isRequired,
    };

    const dispatch = useDispatch();
    const { pratos } = useSelector(state => state.pratos);
    const prato = pratos.find((prato) => prato.id === id);
    const { caminhoImagem, imagem, nome, valor, ingredientes } = prato;

    const [submitting, setSubmitting] = useState(false);

    const [editImagePrato, setEditImagePrato] = useState(imagem);
    const [editPathImagePrato, setEditPathImagePrato] = useState(caminhoImagem);
    const [editNomePrato, setEditNomePrato] = useState(nome);
    const [editIngrePrato, setEditIngrePrato] = useState(ingredientes);
    const [editValorPrato, setEditValorPrato] = useState(valor);

    const resetForm = () => {
        setEditImagePrato('');
        setEditNomePrato('');
        setEditIngrePrato('');
        setEditValorPrato('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const values = {
                id: id, // Replace with the lanche ID you want to edit
                imagem: editImagePrato,
                caminhoImagem: editPathImagePrato,
                nome: editNomePrato,
                classe: "pratos",
                ingredientes: editIngrePrato,
                valor: editValorPrato
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
        const pratosImagesRef = ref(storage, `/items-images/pratos-images/${file.name + Date.now()}`);
        await uploadBytes(pratosImagesRef, file).then((snapshot) => {
            //SALVA O CAMINHO DA IMAGEM PARA EXCLUSÃO FUTURA
            setEditPathImagePrato(snapshot.metadata.fullPath)
            const customId = "custom-id-yes"
            toast.success(`${snapshot.metadata.name} adicionada com sucesso`, { toastId: customId })
            console.log(file.name);
        });
        if (file) {
            //BAIXA A URL DA IMAGEM E SETA O VALOR NO STATE
            await getDownloadURL(pratosImagesRef)
                .then((url) => {
                    setEditImagePrato(url);
                    console.log(url);
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
                <label htmlFor="imagemPrato">Escolha a imagem do Prato</label>
                <input type="file"
                    name="imagemPrato"
                    id="imagemPrato"
                    onChange={handleImageChange}
                />


                <label htmlFor="nomePrato">Nome do Prato</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="text"
                    name="nomePrato"
                    id="nomePrato"
                    onChange={(e) => setEditNomePrato(e.target.value)}
                    required
                    value={editNomePrato}
                    placeholder={prato.nome}
                />

                <label htmlFor="ingredientesPrato">Ingredientes do Prato</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="text"
                    name="ingredientesPrato"
                    id="ingredientesPrato"
                    onChange={(e) => setEditIngrePrato(e.target.value)}
                    required
                    value={editIngrePrato}
                    placeholder={prato.ingredientes}
                />

                <label htmlFor="valorPrato">Valor do Prato</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="number"
                    name="valorPrato"
                    id="valorPrato"
                    onChange={(e) => setEditValorPrato(e.target.value)}
                    required
                    value={editValorPrato}
                    placeholder={prato.valor}
                />


                <button type="submit" disabled={submitting} className="bg-[#D4AA3C] hover:opacity-75 text-white font-semibold py-2 rounded-md">
                    {submitting ?
                        <div className="spinner-border h-6 w-6" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        : 'Alterar Prato'}
                </button>
            </div>
        </form>

    )
}


export default EditPratos;