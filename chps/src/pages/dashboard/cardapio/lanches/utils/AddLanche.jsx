import { useDispatch } from 'react-redux';
import { createLanche } from '../../../../../services/redux/items/lanchesSlice';
import { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../../../services/firebase/firebase';
import { toast } from 'react-toastify';



function AddLanche() {
    const dispatch = useDispatch();

    const [submiting, setSubmiting] = useState(false);

    const [imageLanche, setImageLanche] = useState('');
    const [pathImageLanche, setPathImageLanche] = useState('');
    const [nomeLanche, setNomeLanche] = useState('');
    const [categoryLanche, setCategoryLanche] = useState('');
    const [ingreLanche, setIngreLanche] = useState('');
    const [valorLanche, setValorLanche] = useState('');

    const resetForm = () => {
        setImageLanche('');
        setNomeLanche('');
        setCategoryLanche('');
        setIngreLanche('');
        setValorLanche('');
    };

    //FAZ O DISPATCH DOS VALORES PARA O REDUX SALVAR NO FIRESTORE
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmiting(true)
        try {
            const values = {
                imagem: imageLanche,
                caminhoImagem: pathImageLanche,
                nome: nomeLanche,
                categoria: categoryLanche,
                classe: "lanche",
                ingredientes: ingreLanche,
                valor: valorLanche
            };
            dispatch(createLanche(values));
            setSubmiting(false)
            resetForm();
        } catch (error) {
            toast.error("Ocorreu um erro ao adiconar o lanche:", error);
        }
    }
    //FUNÇÃO RESPOSAVEL PELO UPLOAD DA IMAGEM... PASSAR A LÓGICA PARA O REDUX
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const lancheImagesRef = ref(storage, `/items-images/lanche-images/${file.name + Date.now()}`);
        await uploadBytes(lancheImagesRef, file).then((snapshot) => {
            //SALVA O CAMINHO DA IMAGEM PARA EXCLUSÃO FUTURA
            setPathImageLanche(snapshot.metadata.fullPath)
            const customId = "custom-id-yes"
            toast.success(`${snapshot.metadata.name} adicionada com sucesso`, { toastId: customId })
        });
        if (file) {
            //BAIXA A URL DA IMAGEM E SETA O VALOR NO STATE
            await getDownloadURL(lancheImagesRef)
                .then((url) => {
                    setImageLanche(url);
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
                    required
                />


                <label htmlFor="nomeLanche">Nome do Lanche</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="text"
                    name="nomeLanche"
                    id="nomeLanche"
                    onChange={(e) => setNomeLanche(e.target.value)}
                    required
                    value={nomeLanche}
                />


                <label htmlFor="categoriaLanche">Categoria do Lanche</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="text"
                    name="categoriaLanche"
                    id="categoriaLanche"
                    onChange={(e) => setCategoryLanche(e.target.value)}
                    required
                    value={categoryLanche}
                />

                <label htmlFor="ingredientesLanche">Ingredientes do Lanche</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="text"
                    name="ingredientesLanche"
                    id="ingredientesLanche"
                    onChange={(e) => setIngreLanche(e.target.value)}
                    required
                    value={ingreLanche}
                />


                <label htmlFor="valorLanche">Valor do Lanche</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="number"
                    name="valorLanche"
                    id="valorLanche"
                    onChange={(e) => setValorLanche(e.target.value)}
                    required
                    value={valorLanche}
                />


                <button type="submit" disabled={submiting} className="bg-[#98C379] hover:opacity-75 text-white font-semibold py-2 rounded-md">
                    {submiting ?
                        <div className="spinner-border h-6 w-6" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        : 'Adicionar Lanche'}
                </button>
            </div>
        </form>

    )
}


export default AddLanche;