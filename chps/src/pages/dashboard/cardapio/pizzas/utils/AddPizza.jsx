import { useDispatch } from 'react-redux';
import { createPizza } from '../../../../../services/redux/items/pizzasSlice';
import { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../../../services/firebase/firebase';
import { toast } from 'react-toastify';



function AddPizza() {
    const dispatch = useDispatch();

    const [submiting, setSubmiting] = useState(false);

    const [imagePizza, setImagePizza] = useState('');
    const [pathImagePizza, setPathImagePizza] = useState('');
    const [nomePizza, setNomePizza] = useState('');
    const [ingrePizza, setIngrePizza] = useState('');
    const [valorPizzaP, setValorPizzaP] = useState('');
    const [valorPizzaF, setValorPizzaF] = useState('');

    const resetForm = () => {
        setImagePizza('');
        setNomePizza('');
        setIngrePizza('');
        setValorPizzaP('');
        setValorPizzaF('');
    };

    //FAZ O DISPATCH DOS VALORES PARA O REDUX SALVAR NO FIRESTORE
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmiting(true)
        try {
            const values = {
                imagem: imagePizza,
                caminhoImagem: pathImagePizza,
                nome: nomePizza,
                classe: 'pizza',
                ingredientes: ingrePizza,
                valorP: valorPizzaP,
                valorF: valorPizzaF
            };
            dispatch(createPizza(values));
            setSubmiting(false)
            resetForm();
        } catch (error) {
            toast.error("Ocorreu um erro ao adiconar a pizza:", error);
        }
    }
    //FUNÇÃO RESPOSAVEL PELO UPLOAD DA IMAGEM... PASSAR A LÓGICA PARA O REDUX
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const pizzaImagesRef = ref(storage, `/items-images/pizza-images/${file.name + Date.now()}`);
        await uploadBytes(pizzaImagesRef, file).then((snapshot) => {
            //SALVA O CAMINHO DA IMAGEM PARA EXCLUSÃO FUTURA
            setPathImagePizza(snapshot.metadata.fullPath)
            const customId = "custom-id-yes"
            toast.success(`${snapshot.metadata.name} adicionada com sucesso`, { toastId: customId })
        });
        if (file) {
            //BAIXA A URL DA IMAGEM E SETA O VALOR NO STATE
            await getDownloadURL(pizzaImagesRef)
                .then((url) => {
                    setImagePizza(url);
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
                <label htmlFor="imagemPizza">Escolha a imagem da Pizza</label>
                <input type="file"
                    name="imagemPizza"
                    id="imagemPizza"
                    onChange={handleImageChange}
                    required
                />


                <label htmlFor="nomePizza">Nome da Pizza</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="text"
                    name="nomePizza"
                    id="nomePizza"
                    onChange={(e) => setNomePizza(e.target.value)}
                    required
                    value={nomePizza}
                />

                <label htmlFor="ingredientesPizza">Ingredientes da Pizza</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="text"
                    name="ingredientesPizza"
                    id="ingredientesPizza"
                    onChange={(e) => setIngrePizza(e.target.value)}
                    required
                    value={ingrePizza}
                />

                <label htmlFor="valorPizzaP">Valor da Pizza Individual</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="text"
                    name="valorPizzaP"
                    id="valorPizzaP"
                    onChange={(e) => setValorPizzaP(e.target.value)}
                    required
                    value={valorPizzaP}
                />

                <label htmlFor="valorPizzaF">Valor da Pizza Família</label>
                <input className="border-b-[1px] border-gray-400 border-solid"
                    type="text"
                    name="valorPizzaF"
                    id="valorPizzaF"
                    onChange={(e) => setValorPizzaF(e.target.value)}
                    required
                    value={valorPizzaF}
                />


                <button type="submit" disabled={submiting} className="bg-[#98C379] hover:opacity-75 text-white font-semibold py-2 rounded-md">
                    {submiting ?
                        <div className="spinner-border h-6 w-6" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        : 'Adicionar Pizza'}
                </button>
            </div>
        </form>

    )
}


export default AddPizza;