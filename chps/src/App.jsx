import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Loading from './components/partials/Loading'
import { Outlet } from "react-router-dom";


import { ref, getDownloadURL } from "firebase/storage";
import { storage } from './services/firebase/firebase'

import { useDispatch } from 'react-redux';
import { setBgHeaderUrl, setLogoHeaderUrl, setBgHomeUrl } from './services/redux/images/imageSlice';
import { setCloseMenu, setOpenMenu } from './services/redux/app-state/appSlice';



import Header from "./components/partials/Header";
import Footer from "./components/partials/Footer";
import MenuHamb from "./components/utils/menus/MenuHamb";
import MenuFixed from "./components/utils/menus/MenuFixed";
import FormFinal from "./components/partials/FormFinal";

function App() {

  const [imageLoaded, setImageLoaded] = useState(false);
  const dispatch = useDispatch();

  /* REQUISIÇÕES DAS IMAGENS ESTÁTICAS DA APLICAÇÃO */
  useEffect(() => {
    const fetchImageUrls = async () => {
      const bgHeaderReference = ref(storage, 'images-app/lanchebg.png');
      const logoHeaderReference = ref(storage, 'images-app/logomarcahamburgueria.png');
      const bgHomeReference = ref(storage, 'images-app/imageBgHome.jpg');
      /* REQUISIÇÃO DA IMAGEM DE FUNDO DO HEADER */
      try {
        const headerBgUrl = await getDownloadURL(bgHeaderReference);
        dispatch(setBgHeaderUrl(headerBgUrl));
      } catch (error) {
        console.error('Erro ao obter a URL da imagem:', error);
      }
      /* REQUISIÇÃO DA LOGO DO HEADER */
      try {
        const headerLogoUrl = await getDownloadURL(logoHeaderReference);
        dispatch(setLogoHeaderUrl(headerLogoUrl));
      } catch (error) {
        console.error('Erro ao obter a URL da imagem:', error);
      }
      /* REQUISIÇÃO DA IMAGEM DE FUNDO DA HOME */
      try {
        const homeBgUrl = await getDownloadURL(bgHomeReference);
        dispatch(setBgHomeUrl(homeBgUrl));
        setImageLoaded(true);
      } catch (error) {
        console.error('Erro ao obter a URL da imagem:', error);
      }
    };
    fetchImageUrls();
  }, [dispatch]);

  // STATE DA APLICAÇÃO, IMAGENS STATICAS E STATE DOS MENUS
  const menu = useSelector((state) => state.appState.openMenu);
  const { bgHeader, logoHeader } = useSelector((state) => state.images);

  /* FUNÇÃO PARA ABRIR/FECHAR O MENU HAMB */
  const menuHambRef = useRef();
  const handleOpenMenu = () => {
    dispatch(setOpenMenu())
  };
  const handleCloseMenu = () => {
    dispatch(setCloseMenu())
  };


  /* FUNÇÃO DO MENU FIXO */
  const menuFixedRef = useRef();
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
    } else if (endY < startY) {
      setTimeout(() => {
        menuFixedRef.current.classList.add('hidden')
      }, 300)
    }
  };


  if (!imageLoaded) {
    return <Loading />;
  }
  return (

    <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} >
      <Header
        handleOpenMenu={handleOpenMenu}
        handleCloseMenu={handleCloseMenu}
        menu={menu}
        bgHeader={bgHeader}
        logoHeader={logoHeader}
      />
      <MenuHamb menu={menu} menuHambRef={menuHambRef} />

      <Outlet> </Outlet>

      <MenuFixed menuFixedRef={menuFixedRef} />

      <FormFinal />
      <Footer />
    </div>
  )
}

export default App;

