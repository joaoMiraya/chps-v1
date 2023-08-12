import '../styles/global.css';
import '../styles/default.css';

import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';

import { Provider } from 'react-redux';
import { store } from '../services/redux/store';

import { PrivateRoute } from './privateRoute';
import { AdminRoute } from './adminRoute';

import App from '../App';
import NotFound from '../components/partials/NotFound';
import Loading from '../components/partials/Loading';
import RedefinePassword from '../components/utils/components/RedefinePassword';
import TermosEPoliticas from '../components/partials/TermosEPoliticas';
import Teste from '../pages/Teste';


import Home from '../pages/home/Home';
import Cadastro from '../pages/cadastro/Cadastro';
import Menu from '../pages/menu/Menu';

import Lanche from '../pages/lanche/Lanche';
import LancheDetalhes from '../pages/lanche/LancheDetalhes';

import Pizza from '../pages/pizza/Pizza';
import PizzaDetalhes from '../pages/pizza/PizzaDetalhes';

import Porcao from '../pages/porcao/Porcao';
import BebidasDetalhes from '../components/utils/cards/detalhes/BebidasDetalhes';
import Cart from '../pages/cart/Cart';
import CartDetalhes from '../pages/cart/detalhes/CartDetalhes';
import Profile from '../pages/profile/Profile';

import DashApp from '../pages/dashboard/DashApp';
import Dashboard from '../pages/dashboard/Dashboard';
import AcrescimosDash from '../pages/dashboard/cardapio/acrescimos/AcrescimosDash';
import AcrescimosEdit from '../pages/dashboard/cardapio/acrescimos/EditAcrescimo';

import BebidasDash from '../pages/dashboard/cardapio/bebidas/BebidasDash';
import BebidasDashDetail from '../pages/dashboard/cardapio/bebidas/BebidaDashDetail';

import LanchesDash from '../pages/dashboard/cardapio/lanches/LanchesDash';
import LancheDashDetail from '../pages/dashboard/cardapio/lanches/LancheDashDetail';
import PizzasDash from '../pages/dashboard/cardapio/pizzas/PizzasDash';
import PizzaDashDetail from '../pages/dashboard/cardapio/pizzas/PizzaDashDetail';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/teste' element={<Teste />} />
          <Route path='*' element={<NotFound />} />
  
          <Route path='/dashboard' element={<AdminRoute><DashApp /></AdminRoute>}>
            <Route path='/dashboard' element={<Dashboard />} />
            
            <Route path='/dashboard/acrescimos' element={<AcrescimosDash />} />
            <Route path='/dashboard/acrescimos/:id' element={<AcrescimosEdit />} />
            
            <Route path='/dashboard/bebidas' element={<BebidasDash />} />
            <Route path='/dashboard/bebidas/:id' element={<BebidasDashDetail />} />
            
            
            <Route path='/dashboard/lanches' element={<LanchesDash />} />
            <Route path='/dashboard/lanches/:id' element={<LancheDashDetail />} />

            <Route path='/dashboard/pizzas' element={<PizzasDash />} />
            <Route path='/dashboard/pizzas/:id' element={<PizzaDashDetail />} />
          </Route>

          <Route path='/' element={<App />}>
            <Route path='/redefinir-senha' element={<RedefinePassword />} />
            <Route path='/termos-e-politicas' element={<TermosEPoliticas />} />

            <Route path='/' element={<Home />} />
            <Route path='/cadastro' element={<Cadastro />} />
            <Route path='/menu' element={<Menu />} />

            <Route path='/menu/lanches' element={<Lanche />} />
            <Route path='/menu/lanches/:id' element={<LancheDetalhes />} />

            <Route path='/menu/pizzas' element={<Pizza />} />
            <Route path='/menu/pizzas/:id' element={<PizzaDetalhes />} />


            <Route path='/menu/porcoes' element={<Porcao />} />

            <Route path='/menu/bebidas' element={<Porcao />} />
            <Route path='/menu/bebidas/:id' element={<BebidasDetalhes />} />



            <Route path='/carrinho' element={<Cart />} />
            <Route path='/carrinho/:id' element={<CartDetalhes />} />

            <Route path='/perfil' element={<PrivateRoute> <Profile /> </PrivateRoute>} />

          </Route>

        </Routes>
      </Suspense>
    </Provider>
  </BrowserRouter>

);
