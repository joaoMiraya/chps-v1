import { lazy, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ref, getDownloadURL } from "firebase/storage";
import { storage } from './services/firebase/firebase'

import { useDispatch } from 'react-redux';
import { setBgHeaderUrl } from './services/redux/images/imageSlice';


const Header = lazy(() => import("./components/partials/Header"));
const Footer = lazy(() => import("./components/partials/Footer"));
const MenuHamb = lazy(() => import("./components/utils/menus/MenuHamb"));
const MenuFixed = lazy(() => import("./components/utils/menus/MenuFixed"));
const GoBackBtn = lazy(() => import("./components/utils/buttons/GoBackBtn"));
const FormFinal = lazy(() => import("./components/partials/FormFinal"));


function App() {

  const dispatch = useDispatch();
  /* REQUISIÇÕES DAS IMAGENS ESTÁTICAS DA APLICAÇÃO */
  useEffect(() => {
    const fetchImageUrls = async () => {
      const bgHeaderReference = ref(storage, 'images-app/lanchebg.png');
      /* REQUISIÇÃO DA IMAGEM DE FUNDO DO HEADER */
      try {
        const headerBgUrl = await getDownloadURL(bgHeaderReference);
        dispatch(setBgHeaderUrl(headerBgUrl));
      } catch (error) {
        console.error('Erro ao obter a URL da imagem:', error);
      }
    };
    fetchImageUrls();
  }, [dispatch]);

  /* FUNÇÃO PARA ABRIR/FECHAR O MENU HAMB */
  const menuHambRef = useRef();
  const openMenuHambRef = useRef();
  const closeMenuHambRef = useRef();
  const handleOpen = () => {
    menuHambRef.current.classList.add('openMenu')
    menuHambRef.current.classList.remove('hiddeMenu')
    openMenuHambRef.current.classList.add('hidden')
    closeMenuHambRef.current.classList.remove('hidden')
  };
  const handleClose = () => {
    menuHambRef.current.classList.remove('openMenu')
    menuHambRef.current.classList.add('hiddeMenu')
    closeMenuHambRef.current.classList.add('hidden')
    openMenuHambRef.current.classList.remove('hidden')
  };

  /* FUNÇÃO DO ESCONDER/MOSTRAR O MENU FIXO E O BOTÃO DE VOLTAR */
  const menuFixedRef = useRef();
  const goBackRef = useRef();
  const [startY, setStartY] = useState(null);
  const [endY, setEndY] = useState(null);
  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
  };
  const handleTouchMove = (e) => {
    setEndY(e.touches[0].clientY);
  };
  const handleTouchEnd = () => {
    if (endY > startY) {
      menuFixedRef.current.classList.remove('hidden')
      goBackRef.current.classList.remove('hidden')
    } else if (endY < startY) {
      setTimeout(() => {
        menuFixedRef.current.classList.add('hidden')
        goBackRef.current.classList.add('hidden')
      }, 300)
    }
  };

  return (
    <>
      <Header
        handleOpen={handleOpen}
        handleClose={handleClose}
        menuHambRef={menuHambRef}
        openMenuHambRef={openMenuHambRef}
        closeMenuHambRef={closeMenuHambRef}
      />
      <div className="relative" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} >
        <MenuHamb menuHambRef={menuHambRef} />
        <ToastContainer position="top-right" autoClose={3000} />
        <GoBackBtn goBackRef={goBackRef} />

        <Outlet> </Outlet>

        <MenuFixed menuFixedRef={menuFixedRef} />

        <FormFinal />
        <Footer />
      </div>
    </>
  )
}

export default App;

