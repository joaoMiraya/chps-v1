import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPromoImageUrl } from "../../../services/redux/images/imageSlice";
import { storage } from "../../../services/firebase/firebase";
import { Link } from "react-router-dom";

function PromoComp() {

    const { promoImage } = useSelector((state) => state.images);

    const [user, setUser] = useState('');

    useEffect(() => {
        if (sessionStorage.getItem("User")) {
            const user = JSON.parse(sessionStorage.getItem("User"))
            setUser(user.name)
        } else if (localStorage.getItem("User")) {
            const user = JSON.parse(localStorage.getItem("User"))
            setUser(user.name)
        }
    }, []);

    const dispatch = useDispatch();
    /* REQUISIÇÕES DAS IMAGENS ESTÁTICAS DA APLICAÇÃO */
    useEffect(() => {
        const fetchImageUrls = async () => {
            const imagePromoReference = ref(storage, 'images-app/hamburguer.png');
            /* REQUISIÇÃO DA IMAGEM DE FUNDO DO HEADER */
            try {
                const headerBgUrl = await getDownloadURL(imagePromoReference);
                dispatch(setPromoImageUrl(headerBgUrl));
            } catch (error) {
                console.error('Erro ao obter a URL da imagem:', error);
            }
        };
        fetchImageUrls();
    }, [dispatch]);

    return (
        <div className=" bg-gradient-to-t from-[#FFDD86] to-[#D4AA3C] pt-12 flex flex-col items-center">
            <h1 className="text-2xl text-center font-semibold">Boa noite, {user ? user : 'Usuario'}!</h1>
            <div className="w-[375px] h-[375px]">
                <Link aria-label="Navegar para promoções" to={"/promocoes"} className="relative flex flex-col items-center  drop-shadow-2xl">
                    <h3 className="text-2xl font-semibold top-1/3 left-14 absolute">Ver Promoções</h3>
                    <svg className="" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#FFFFE0" d="M44.2,-37C58.4,-30,71.8,-15,69,-2.7C66.3,9.5,47.4,19,33.2,28.4C19,37.7,9.5,46.9,-6.2,53.1C-21.9,59.3,-43.8,62.5,-58.6,53.1C-73.3,43.8,-81,21.9,-81.7,-0.7C-82.4,-23.3,-76.2,-46.7,-61.5,-53.7C-46.7,-60.8,-23.3,-51.6,-4.2,-47.4C15,-43.2,30,-44.1,44.2,-37Z" transform="translate(100 100)" />
                    </svg>
                    <p className=" bottom-6 mt-4 text-center text-sm absolute">Fique por dentro de nossas promoções</p>
                    <img className="absolute bottom-2 drop-shadow-xl left-4 w-[12rem]" src={promoImage} alt="Promoção" />
                </Link>
            </div>
        </div>
    )
}


export default PromoComp;