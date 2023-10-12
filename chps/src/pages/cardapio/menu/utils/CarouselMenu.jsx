import { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from "@services/firebase/firebase";
import { setimageCarousel1, setimageCarousel2, setimageCarousel3 } from "@services/redux/images/relativeImageSLice";

import Carousel from "@components/utils/components/Carousel";

const Loading = lazy(() => import("@components/partials/Loading"));

function CarouselMenu() {

    const dispatch = useDispatch();
    const { imageCarousel1, imageCarousel2, imageCarousel3 } = useSelector((state) => state.relativeImages);
    const carouselImages = [imageCarousel1, imageCarousel2, imageCarousel3]
    //FAZ A REQUISIÇÃO DAS IMAGENS DO CAROUSEL
    useEffect(() => {
        if (!imageCarousel1 && !imageCarousel2 && !imageCarousel3) {
            const fetchImageUrl = async () => {
                const imageCarousel1Reference = ref(storage, 'images-relative/batataCarousel.jpg');
                const imageCarousel2Reference = ref(storage, 'images-relative/lancheCarousel.jpg');
                const imageCarousel3Reference = ref(storage, 'images-relative/pizzaCarousel.jpg');
                try {
                    const imageCarousel1 = await getDownloadURL(imageCarousel1Reference);
                    dispatch(setimageCarousel1(imageCarousel1));
                } catch (error) {
                    console.error('Erro ao obter a URL da imagem:', error);
                }
                try {
                    const imageCarousel2 = await getDownloadURL(imageCarousel2Reference);
                    dispatch(setimageCarousel2(imageCarousel2));
                } catch (error) {
                    console.error('Erro ao obter a URL da imagem:', error);
                }
                try {
                    const imageCarousel3 = await getDownloadURL(imageCarousel3Reference);
                    dispatch(setimageCarousel3(imageCarousel3));
                } catch (error) {
                    console.error('Erro ao obter a URL da imagem:', error);
                }
            };
            fetchImageUrl();
        } else {
            return
        }
    }, [dispatch]);

    if (!carouselImages) {
        return <Loading />
    }

    return (
        <Carousel image1={imageCarousel1} image2={imageCarousel2} image3={imageCarousel3} />
    )
}

export default CarouselMenu;