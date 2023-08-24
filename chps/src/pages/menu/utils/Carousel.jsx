import { storage } from "../../../services/firebase/firebase";
import { setimageCarousel1, setimageCarousel2, setimageCarousel3 } from "../../../services/redux/images/relativeImageSLice";
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, ref } from 'firebase/storage';
import { lazy, useEffect } from 'react';

const Loading = lazy(() => import("../../../components/partials/Loading"));

function Carousel() {
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
        <div id="carouselMenu" className="carousel slide" data-bs-interval="4000" data-bs-ride="carousel">
            <div className="carousel-inner h-[15rem] md:h-[25rem] overflow-hidden">
                <div className="carousel-item active">
                    <img src={imageCarousel1} className="d-block w-100 " alt="carousel-image" />
                </div>
                <div className="carousel-item">
                    <img src={imageCarousel2} className="d-block w-100 " alt="carousel-image" />
                </div>
                <div className="carousel-item">
                    <img src={imageCarousel3} className="d-block w-100 " alt="carousel-image" />
                </div>
            </div>
            <button className="carousel-control-prev mt-12" type="button" data-bs-target="#carouselMenu" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next mt-12" type="button" data-bs-target="#carouselMenu" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Carousel;