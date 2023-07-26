
import { storage } from '../../services/firebase/firebase';

import { set404ImageUrl } from '../../services/redux/images/imageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, ref } from 'firebase/storage';
import { useEffect } from 'react';

const handleGoBack = () => {
    window.history.back();
}

function NotFound() {

    const dispatch = useDispatch();
    const { image404 } = useSelector((state) => state.images);

    useEffect(() => {
        const fetchImageUrl = async () => {
            const image404Reference = ref(storage, 'images-app/image404.png');
            /* REQUISIÇÃO DA IMAGEM DE FUNDO */
            try {
                const image404 = await getDownloadURL(image404Reference);
                dispatch(set404ImageUrl(image404));
            } catch (error) {
                console.error('Erro ao obter a URL da imagem:', error);
            }
        };
        fetchImageUrl();
    }, [dispatch]);


    return (
        <>
            <div className="flex h-screen bg-[#FDF9EE] absolute">
                <img src={image404} alt="404" className=" object-contain" />
            </div>
            <h1 className="absolute top-20 text-center text-3xl font-light text-amber-900">O caminho que você está tentando chegar não leva a nada</h1>
            <div className=" absolute bottom-20 left-1/2">
                <div aria-label='Botão para voltar' onClick={handleGoBack} className=" bg-[#FDF9EE] shadow-xl border-[1px] border-[#b6b0a0] px-8 py-2 font-semibold text-amber-900  ">VOLTAR</div>
            </div>
        </>

    )
}

export default NotFound;