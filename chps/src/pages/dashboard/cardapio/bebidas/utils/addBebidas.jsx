import { useDispatch } from 'react-redux';
import { createBebida } from '../../../../../services/redux/items/bebidasSlice';
import { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../../../services/firebase/firebase';
import { toast } from 'react-toastify';



function AddBebida() {
    const dispatch = useDispatch();

    const [submiting, setSubmiting] = useState(false);

    const [imageBebida, setImageBebida] = useState('');
    const [pathImageBebida, setPathImageBebida] = useState('');
    const [nomeBebida, setNomeBebida] = useState('');
    const [categoryBebida, setCategoryBebida] = useState('');
    const [valorBebida, setValorBebida] = useState('');

    const resetForm = () => {
        setImageBebida('');
        setNomeBebida('');
        setCategoryBebida('');
        setValorBebida('');
    };

    //FAZ O DISPATCH DOS VALORES PARA O REDUX SALVAR NO FIRESTORE
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmiting(true)
        try {
            const values = {
                imagem: imageBebida,
                caminhoImagem: pathImageBebida,
                nome: nomeBebida,
                categoria: categoryBebida,
                valor: valorBebida
            };
            dispatch(createBebida(values));
            setSubmiting(false)
            resetForm();
        } catch (error) {
            toast.error("Ocorreu um erro ao adiconar a bebida:", error);
        }
    }
    //FUNÇÃO RESPOSAVEL PELO UPLOAD DA IMAGEM... PASSAR A LÓGICA PARA O REDUX
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const bebidaImagesRef = ref(storage, `/items-images/bebidas-images/${file.name + Date.now()}`);
        await uploadBytes(bebidaImagesRef, file).then((snapshot) => {
            //SALVA O CAMINHO DA IMAGEM PARA EXCLUSÃO FUTURA
            setPathImageBebida(snapshot.metadata.fullPath)
            const customId = "custom-id-yes"
            toast.success(`${snapshot.metadata.name} adicionada com sucesso`, { toastId: customId })
        });
        if (file) {
            //BAIXA A URL DA IMAGEM E SETA O VALOR NO STATE
            await getDownloadURL(bebidaImagesRef)
                .then((url) => {
                    setImageBebida(url);
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
                <label htmlFor="imagemBebida">Escolha a imagem da bebida</label>
                <input type="file"
                    name="imagemBebida"
                    id="imagemBebida"
                    onChange={handleImageChange}
                    required
                />


                <label htmlFor="nomeBebida">Nome da Bebida</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="text"
                    name="nomeBebida"
                    id="nomeBebida"
                    onChange={(e) => setNomeBebida(e.target.value)}
                    required
                    value={nomeBebida}
                />


                <label htmlFor="categoriaBebida">Categoria da Bebida</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="text"
                    name="categoriaBebida"
                    id="categoriaBebida"
                    onChange={(e) => setCategoryBebida(e.target.value)}
                    required
                    value={categoryBebida}
                />


                <label htmlFor="valorBebida">Valor da Bebida</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="number"
                    name="valorBebida"
                    id="nomeBebida"
                    onChange={(e) => setValorBebida(e.target.value)}
                    required
                    value={valorBebida}
                />


                <button type="submit" disabled={submiting} className="bg-[#98C379] hover:opacity-75 text-white font-semibold py-2 rounded-md">
                    {submiting ?
                        <div className="spinner-border h-6 w-6" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        : 'Adicionar Bebida'}
                </button>
            </div>
        </form>

    )
}


export default AddBebida;