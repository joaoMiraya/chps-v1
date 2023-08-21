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
  //TRECHO RESPONSAVEL POR ABRIR E FECHAR O MENU LATERAL
  const menuHambRef = useRef();
  const openMenuHambRef = useRef();
  const closeMenuHambRef = useRef();
  const toggleHambMenu = (open) => {
    menuHambRef.current.classList.toggle('openMenu', open);
    menuHambRef.current.classList.toggle('hiddeMenu', !open);
    openMenuHambRef.current.classList.toggle('hidden', open);
    closeMenuHambRef.current.classList.toggle('hidden', !open);
  };


  //TRECHO RESPONSAVEL POR ABRIR E FECHAR O MENU FIXO
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
  const [menuHide, setMenuHide] = useState(false);

  const handleTouchEnd = () => {
    if (endY > startY) {
      setMenuHide(false)
    } else if (endY < startY) {
      setTimeout(() => {
        setMenuHide(true)
      }, 300);
    }
  };



  return (
    <>
      <Header
        handleOpen={() => toggleHambMenu(true)}
        handleClose={() => toggleHambMenu(false)}
        menuHambRef={menuHambRef}
        openMenuHambRef={openMenuHambRef}
        closeMenuHambRef={closeMenuHambRef}
      />
      <MenuFixed menuHide={menuHide} menuFixedRef={menuFixedRef} />

      <div className="relative" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} >
        <MenuHamb menuHambRef={menuHambRef} />
        <ToastContainer position="top-right" autoClose={3000} />
        <GoBackBtn menuHide={menuHide} goBackRef={goBackRef} />

        <Outlet> </Outlet>
        
        <FormFinal />
        <Footer />
      </div>
    </>
  )
}

export default App;

