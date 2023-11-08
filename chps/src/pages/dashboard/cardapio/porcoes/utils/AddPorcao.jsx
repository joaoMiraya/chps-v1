import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@services/firebase/firebase';
import { toast } from 'react-toastify';
import { createPorcoes } from '@services/redux/items/porcoesSlice';




function AddPorcoes() {
    const dispatch = useDispatch();

    const [submiting, setSubmiting] = useState(false);

    const [imagePorcoes, setImagePorcoes] = useState('');
    const [pathImagePorcoes, setPathImagePorcoes] = useState('');
    const [nomePorcoes, setNomePorcoes] = useState('');
    const [ingrePorcoes, setIngrePorcoes] = useState('');
    const [valorPorcoesM, setValorPorcoesM] = useState('');
    const [valorPorcoesI, setValorPorcoesI] = useState('');

    const resetForm = () => {
        setImagePorcoes('');
        setNomePorcoes('');
        setIngrePorcoes('');
        setValorPorcoesM('');
        setValorPorcoesI('');
    };

    //FAZ O DISPATCH DOS VALORES PARA O REDUX SALVAR NO FIRESTORE
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmiting(true)
        try {
            const values = {
                imagem: imagePorcoes,
                caminhoImagem: pathImagePorcoes,
                nome: nomePorcoes,
                classe: "porcao",
                ingredientes: ingrePorcoes,
                valorM: valorPorcoesM,
                valorI: valorPorcoesI
            };
            dispatch(createPorcoes(values));
            setSubmiting(false)
            resetForm();
        } catch (error) {
            toast.error("Ocorreu um erro ao adiconar a porção:", error);
        }
    };
    //FUNÇÃO RESPOSAVEL PELO UPLOAD DA IMAGEM... PASSAR A LÓGICA PARA O REDUX
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const PorcaoImagesRef = ref(storage, `/items-images/porcoes-images/${file.name + Date.now()}`);
        await uploadBytes(PorcaoImagesRef, file).then((snapshot) => {
            //SALVA O CAMINHO DA IMAGEM PARA EXCLUSÃO FUTURA
            setPathImagePorcoes(snapshot.metadata.fullPath)
            const customId = "custom-id-yes"
            toast.success(`${snapshot.metadata.name} adicionada com sucesso`, { toastId: customId })
        });
        if (file) {
            //BAIXA A URL DA IMAGEM E SETA O VALOR NO STATE
            await getDownloadURL(PorcaoImagesRef)
                .then((url) => {
                    setImagePorcoes(url);
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
                <label htmlFor="imagemPorcao">Escolha a imagem da Porção</label>
                <input type="file"
                    name="imagemPorcao"
                    id="imagemPorcao"
                    onChange={handleImageChange}
                    required
                />


                <label htmlFor="nomePorcao">Nome da Porção</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="text"
                    name="nomePorcao"
                    id="nomePorcao"
                    onChange={(e) => setNomePorcoes(e.target.value)}
                    required
                    value={nomePorcoes}
                />

                <label htmlFor="ingredientesPorcao">Ingredientes da Porção</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="text"
                    name="ingredientesPorcao"
                    id="ingredientesPorcao"
                    onChange={(e) => setIngrePorcoes(e.target.value)}
                    required
                    value={ingrePorcoes}
                />

                <label htmlFor="valorPorcaoM">Valor da Porção Meia</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="number"
                    name="valorPorcaoM"
                    id="valorPorcaoM"
                    onChange={(e) => setValorPorcoesM(e.target.value)}
                    required
                    value={valorPorcoesM}
                />

                <label htmlFor="valorPorcaoI">Valor da Porção Inteira</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="number"
                    name="valorPorcaoI"
                    id="valorPorcaoI"
                    onChange={(e) => setValorPorcoesI(e.target.value)}
                    required
                    value={valorPorcoesI}
                />

                <button type="submit" disabled={submiting} className="bg-[#98C379] hover:opacity-75 text-white font-semibold py-2 rounded-md">
                    {submiting ?
                        <div className="spinner-border h-6 w-6" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        : 'Adicionar Porção'}
                </button>
            </div>
        </form>

    )
}


export default AddPorcoes;