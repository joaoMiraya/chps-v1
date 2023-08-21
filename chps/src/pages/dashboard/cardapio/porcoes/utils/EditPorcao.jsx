import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../../../services/firebase/firebase';
import { editPorcoes } from '../../../../../services/redux/items/porcoesSlice';


function EditPorcoes({ id }) {
    EditPorcoes.propTypes = {
        id: PropTypes.string.isRequired,
    };

    const dispatch = useDispatch();
    const { porcoes } = useSelector(state => state.porcoes);
    const porcao = porcoes.find((porcao) => porcao.id === id);
    const { caminhoImagem, imagem, nome, valorM, valorI, ingredientes } = porcao;

    const [submitting, setSubmitting] = useState(false);

    const [editImagePorcao, setEditImagePorcao] = useState(imagem);
    const [editPathImagePorcao, setEditPathImagePorcao] = useState(caminhoImagem);
    const [editNomePorcao, setEditNomePorcao] = useState(nome);
    const [editIngrePorcao, setEditIngrePorcao] = useState(ingredientes);
    const [editValorPorcaoM, setEditValorPorcaoM] = useState(valorM);
    const [editValorPorcaoI, setEditValorPorcaoI] = useState(valorI);

    const resetForm = () => {
        setEditImagePorcao('');
        setEditNomePorcao('');
        setEditIngrePorcao('');
        setEditValorPorcaoM('');
        setEditValorPorcaoI('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const values = {
                id: id, // Replace with the lanche ID you want to edit
                imagem: editImagePorcao,
                caminhoImagem: editPathImagePorcao,
                nome: editNomePorcao,
                classe: "porcao",
                ingredientes: editIngrePorcao,
                valorM: editValorPorcaoM,
                valorI: editValorPorcaoI
            };
            dispatch(editPorcoes(values));
            setSubmitting(false);
            resetForm();
        } catch (error) {
            toast.error("Ocorreu um erro ao editar a porção: " + error);
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
        const porcaoImagesRef = ref(storage, `/items-images/porcoes-images/${file.name + Date.now()}`);
        await uploadBytes(porcaoImagesRef, file).then((snapshot) => {
            //SALVA O CAMINHO DA IMAGEM PARA EXCLUSÃO FUTURA
            setEditPathImagePorcao(snapshot.metadata.fullPath)
            const customId = "custom-id-yes"
            toast.success(`${snapshot.metadata.name} adicionada com sucesso`, { toastId: customId })
            console.log(file.name);
        });
        if (file) {
            //BAIXA A URL DA IMAGEM E SETA O VALOR NO STATE
            await getDownloadURL(porcaoImagesRef)
                .then((url) => {
                    setEditImagePorcao(url);
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
                <label htmlFor="imagemPrato">Escolha a imagem da Porção</label>
                <input type="file"
                    name="imagemPrato"
                    id="imagemPrato"
                    onChange={handleImageChange}
                />


                <label htmlFor="nomePrato">Nome da Porção</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="text"
                    name="nomePrato"
                    id="nomePrato"
                    onChange={(e) => setEditNomePorcao(e.target.value)}
                    required
                    value={editNomePorcao}
                    placeholder={porcao.nome}
                />

                <label htmlFor="ingredientesPrato">Ingredientes da Porção</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="text"
                    name="ingredientesPrato"
                    id="ingredientesPrato"
                    onChange={(e) => setEditIngrePorcao(e.target.value)}
                    required
                    value={editIngrePorcao}
                    placeholder={porcao.ingredientes}
                />

                <label htmlFor="valorPorcaoM">Valor da Porção Meia</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="number"
                    name="valorPorcaoM"
                    id="valorPorcaoM"
                    onChange={(e) => setEditValorPorcaoM(e.target.value)}
                    required
                    value={editValorPorcaoM}
                />

                <label htmlFor="valorPorcaoI">Valor da Porção Inteira</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="number"
                    name="valorPorcaoI"
                    id="valorPorcaoI"
                    onChange={(e) => setEditValorPorcaoI(e.target.value)}
                    required
                    value={editValorPorcaoI}
                />


                <button type="submit" disabled={submitting} className="bg-[#D4AA3C] hover:opacity-75 text-white font-semibold py-2 rounded-md">
                    {submitting ?
                        <div className="spinner-border h-6 w-6" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        : 'Alterar Porção'}
                </button>
            </div>
        </form>

    )
}


export default EditPorcoes;