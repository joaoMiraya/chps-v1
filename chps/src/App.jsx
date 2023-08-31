import { Helmet } from 'react-helmet';
import { lazy, useRef } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Header = lazy(() => import("./components/partials/Header"));
const Footer = lazy(() => import("./components/partials/Footer"));
const MenuHamb = lazy(() => import("./components/utils/menus/MenuHamb"));
const TempoEntrega = lazy(() => import("./components/utils/components/TempoEntrega"));
const AppFechado = lazy(() => import("./components/utils/components/AppFechado"));
const MenuFixed = lazy(() => import("./components/utils/menus/MenuFixed"));
const GoBackBtn = lazy(() => import("./components/utils/buttons/GoBackBtn"));
const FormFinal = lazy(() => import("./components/partials/FormFinal"));


function App() {


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

  return (
    <>
      <Helmet>
        <title>Chapa's Lanches - Álvares Machado</title>
        <meta name="description"
          content="Faça pedidos no Chapa's Lanches direto do seu celular. Entregamos em Álvares Machado e regiões proximas. Deliciosos lanches, hambúrgueres artesanais, pizzas e mais, entregues na sua porta. Peça agora e saboreie nossas opções de dar água na boca!" />
        <meta name="keywords"
          content="Lanche, Artesanais, Hamburgueria, Álvares Machado, Lanches, Pizzas, porções, choop, chop, pizzas, Álvares Machado, Presidente Prudente, Presidente Bernardes, Alfredo Marcondes, sucos, cerveja" />
      </Helmet>

      <Header
        handleOpen={() => toggleHambMenu(true)}
        handleClose={() => toggleHambMenu(false)}
        menuHambRef={menuHambRef}
        openMenuHambRef={openMenuHambRef}
        closeMenuHambRef={closeMenuHambRef}
      />

      <div className="relative" >
        <MenuHamb menuHambRef={menuHambRef} />
        <ToastContainer position="top-right" autoClose={3000} />
        <GoBackBtn />
        <TempoEntrega />
        <AppFechado />
        <Outlet> </Outlet>

        <FormFinal />
        <Footer />
      </div>
      <MenuFixed />
    </>
  )
}

export default App;

