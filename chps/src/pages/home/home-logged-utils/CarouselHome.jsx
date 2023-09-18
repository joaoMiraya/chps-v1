import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../../../services/firebase/firebase";
import { getDownloadURL, ref } from 'firebase/storage';
import { setChoppImageUrl } from "../../../services/redux/images/imageSlice";
import Carousel from "../../../components/utils/components/Carousel";


function CarouselHome() {

    const dispatch = useDispatch();
    const { choppImage } = useSelector((state) => state.images);


    useEffect(() => {
        if (!choppImage) {
            const fetchImageUrl = async () => {
                const chopImageReference = ref(storage, 'images-app/chop-image.jpg');
                try {
                    const choppImage = await getDownloadURL(chopImageReference);
                    dispatch(setChoppImageUrl(choppImage));
                } catch (error) {
                    console.error('Erro ao obter a URL da imagem:', error);
                }
            };
            fetchImageUrl();
        } else {
            return
        }
    }, [dispatch]);

    return (
        <Carousel image1={choppImage} image2={choppImage} image3={choppImage} />
    )
};


export default CarouselHome;