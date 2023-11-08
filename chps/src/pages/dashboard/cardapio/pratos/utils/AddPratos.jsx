import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';
import { storage } from '@services/firebase/firebase';
import { createPratos } from '@services/redux/items/pratosSlice';



function AddPratos() {
    const dispatch = useDispatch();

    const [submiting, setSubmiting] = useState(false);

    const [imagePratos, setImagePratos] = useState('');
    const [pathImagePratos, setPathImagePratos] = useState('');
    const [nomePratos, setNomePratos] = useState('');
    const [categoryPratos, setCategoryPratos] = useState('');
    const [ingrePratos, setIngrePratos] = useState('');
    const [valorPratos, setValorPratos] = useState('');

    const resetForm = () => {
        setImagePratos('');
        setNomePratos('');
        setCategoryPratos('');
        setIngrePratos('');
        setValorPratos('');
    };

    //FAZ O DISPATCH DOS VALORES PARA O REDUX SALVAR NO FIRESTORE
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmiting(true)
        try {
            const values = {
                imagem: imagePratos,
                caminhoImagem: pathImagePratos,
                nome: nomePratos,
                categoria: categoryPratos,
                classe: "pratos",
                ingredientes: ingrePratos,
                valor: valorPratos
            };
            dispatch(createPratos(values));
            setSubmiting(false)
            resetForm();
        } catch (error) {
            toast.error("Ocorreu um erro ao adiconar o lanche:", error);
        }
    };
    //FUNÇÃO RESPOSAVEL PELO UPLOAD DA IMAGEM... PASSAR A LÓGICA PARA O REDUX
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const pratoImagesRef = ref(storage, `/items-images/pratos-images/${file.name + Date.now()}`);
        await uploadBytes(pratoImagesRef, file).then((snapshot) => {
            //SALVA O CAMINHO DA IMAGEM PARA EXCLUSÃO FUTURA
            setPathImagePratos(snapshot.metadata.fullPath)
            const customId = "custom-id-yes"
            toast.success(`${snapshot.metadata.name} adicionada com sucesso`, { toastId: customId })
        });
        if (file) {
            //BAIXA A URL DA IMAGEM E SETA O VALOR NO STATE
            await getDownloadURL(pratoImagesRef)
                .then((url) => {
                    setImagePratos(url);
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
                <label htmlFor="imagemPrato">Escolha a imagem do prato</label>
                <input type="file"
                    name="imagemPrato"
                    id="imagemPrato"
                    onChange={handleImageChange}
                    required
                />


                <label htmlFor="nomePrato">Nome do Prato</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="text"
                    name="nomePrato"
                    id="nomePrato"
                    onChange={(e) => setNomePratos(e.target.value)}
                    required
                    value={nomePratos}
                />

                <label htmlFor="ingredientesPrato">Ingredientes do Prato</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="text"
                    name="ingredientesPrato"
                    id="ingredientesPrato"
                    onChange={(e) => setIngrePratos(e.target.value)}
                    required
                    value={ingrePratos}
                />

                <label htmlFor="valorPrato">Valor do Prato</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="number"
                    name="valorPrato"
                    id="valorPrato"
                    onChange={(e) => setValorPratos(e.target.value)}
                    required
                    value={valorPratos}
                />

                <button type="submit" disabled={submiting} className="bg-[#98C379] hover:opacity-75 text-white font-semibold py-2 rounded-md">
                    {submiting ?
                        <div className="spinner-border h-6 w-6" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        : 'Adicionar Prato'}
                </button>
            </div>
        </form>

    )
}


export default AddPratos;