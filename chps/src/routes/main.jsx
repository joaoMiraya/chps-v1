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


//DASHBOARD ABAIXO
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

import PratosDash from '../pages/dashboard/cardapio/pratos/PratosDash';
import PratosDashDetail from '../pages/dashboard/cardapio/pratos/PratosDashDetail';

import PorcoesDash from '../pages/dashboard/cardapio/porcoes/PorcoesDash';
import PorcoesDashDetail from '../pages/dashboard/cardapio/porcoes/PorcoesDashDetail';

import Usuarios from '../pages/dashboard/usuarios/Usuarios';
import UsuarioDetalhes from '../pages/dashboard/usuarios/UsuarioDetalhes';

import PedidoDetalhes from '../pages/dashboard/pedidos/PedidoDetalhes';
import EntregasDash from '../pages/dashboard/entregas/EntregasDash';


//PAGES DO APP
import Home from '../pages/home/Home';
import Cadastro from '../pages/cadastro/Cadastro';
import Profile from '../pages/profile/Profile';
import Menu from '../pages/cardapio/menu/Menu';
import Promocao from '../pages/promocoes/Promocao';


import Lanche from '@lanches/Lanche';
import TodosLanches from '@lanches/TodosLanches';
import LancheDetalhes from '@lanches/LancheDetalhes';

import Pizza from '@pizzas/Pizza';
import PizzaDetalhes from '@pizzas/PizzaDetalhes';

import Porcao from '@porcoes/Porcao';
import PorcaoDetalhes from '@porcoes/PorcaoDetalhes';

import Prato from "@pratos/Prato";
import PratoDetalhes from "@pratos/PratoDetalhes";

import Bebidas from '@bebidas/Bebidas';
import BebidasDetalhes from '@bebidas/BebidasDetalhes';

//CARRINHO ROUTES
import Cart from '../pages/cart/Cart';
import CartLancheDetalhes from '../pages/cart/detalhes/CartLancheDetalhes';
import CartPizzaDetalhes from '../pages/cart/detalhes/CartPizzaDetalhes';
import CartPorcaoDetalhes from '../pages/cart/detalhes/CartPorcaoDetalhes';
import CartBebidasDetalhes from '../pages/cart/detalhes/CartBebidasDetalhes';
import CartPratosDetalhes from '../pages/cart/detalhes/CartPratosDetalhes';

//GARÇONS ROUTES
import Mesas from '../pages/mesas/Mesas';
import MesaDetalhe from '../pages/mesas/MesaDetalhe';
import LancheMesa from '../pages/mesas/cardapio/LancheMesa';
import PizzaMesa from '../pages/mesas/cardapio/PizzaMesa';
import WaiterApp from '../pages/mesas/WaiterApp';
import WaiterRoute from './WaiterRoute';
import LancheMesaDetalhes from '../pages/mesas/cardapio/detalhes/LancheMesaDetalhes';
import MesaPedir from '../pages/mesas/MesaPedir';

//ENTREGADORES ROUTES
import MotoboyRoute from './MotoboyRoute';
import EntregaApp from '../pages/entregadores/EntregaApp';
import Entregas from '../pages/entregadores/Entregas';
import EntregaDetalhes from '../pages/entregadores/EntregaDetalhes';
import UserEntregas from '../pages/entregadores/UserEntregas';
import EntregaMotoDetalhes from '../pages/dashboard/entregas/EntregaMotoDetalhes';
import PorcaoMesa from '../pages/mesas/cardapio/PorcaoMesa';
import PratosMesa from '../pages/mesas/cardapio/PratosMesa';
import MesaLancheDetalhes from '../pages/mesas/detalhes/MesaLancheDetalhes';
import MesaPedidos from '../pages/mesas/comps/MesaPedidos';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <Routes>

          <Route path='/teste' element={<Teste />} />
          <Route path='*' element={<NotFound />} />

          {/* DASHBOARD ROUTES */}
          <Route path='/dashboard' element={<AdminRoute> <DashApp /> </AdminRoute>}>
            <Route path='/dashboard' element={<Dashboard />} />

            <Route path='/dashboard/pedidos/:id' element={<PedidoDetalhes />} />

            <Route path='/dashboard/usuarios' element={<Usuarios />} />
            <Route path='/dashboard/usuarios/:id' element={<UsuarioDetalhes />} />

            <Route path='/dashboard/entregas' element={<EntregasDash />} />
            <Route path='/dashboard/entregas/:id' element={<EntregaMotoDetalhes />} />

            <Route path='/dashboard/acrescimos' element={<AcrescimosDash />} />
            <Route path='/dashboard/acrescimos/:id' element={<AcrescimosEdit />} />

            <Route path='/dashboard/bebidas' element={<BebidasDash />} />
            <Route path='/dashboard/bebidas/:id' element={<BebidasDashDetail />} />

            <Route path='/dashboard/lanches' element={<LanchesDash />} />
            <Route path='/dashboard/lanches/:id' element={<LancheDashDetail />} />

            <Route path='/dashboard/pizzas' element={<PizzasDash />} />
            <Route path='/dashboard/pizzas/:id' element={<PizzaDashDetail />} />

            <Route path='/dashboard/pratos' element={<PratosDash />} />
            <Route path='/dashboard/pratos/:id' element={<PratosDashDetail />} />

            <Route path='/dashboard/porcoes' element={<PorcoesDash />} />
            <Route path='/dashboard/porcoes/:id' element={<PorcoesDashDetail />} />
          </Route>

          {/* MESAS ROUTES */}
          <Route path='/mesas' element={<WaiterRoute> <WaiterApp /> </WaiterRoute>}>

            <Route path='/mesas' element={<Mesas />} />
            <Route path='/mesas/:id' element={<MesaDetalhe />} />
            <Route path='/mesas/:id/pedidos' element={<MesaPedidos />} />
            <Route path='/mesas/:id/lanche/:cat' element={<MesaLancheDetalhes />} />
            <Route path='/mesas/:id/pedir' element={<MesaPedir />} />

            <Route path='/mesas/:id/pedido/lanches' element={<LancheMesa />} />
            <Route path='/mesas/:id/pedido/lanches/:cat' element={<LancheMesaDetalhes />} />

            <Route path='/mesas/:id/pedido/pizzas' element={<PizzaMesa />} />
            <Route path='/mesas/:id/pedido/porcoes' element={<PorcaoMesa />} />
            <Route path='/mesas/:id/pedido/pratos' element={<PratosMesa />} />
          </Route>

          {/* ENTREGAS ROUTES */}
          <Route path='/entregas' element={<MotoboyRoute> <EntregaApp /></MotoboyRoute>}>
            <Route path='/entregas' element={<Entregas />} />
            <Route path='/entregas/:id' element={<EntregaDetalhes />} />
            <Route path='/entregas/andamento/:id' element={<UserEntregas />} />
          </Route>

          {/* DETALHES DOS ITENS NO MENU */}
          <Route path='/menu/lanches/:id' element={<LancheDetalhes />} />
          <Route path='/menu/pizzas/:id' element={<PizzaDetalhes />} />
          <Route path='/menu/porcoes/:id' element={<PorcaoDetalhes />} />
          <Route path='/menu/pratos/:id' element={<PratoDetalhes />} />
          <Route path='/menu/bebidas/:id' element={<BebidasDetalhes />} />
          {/* DETALHES DOS ITENS NO CARRINHO */}
          <Route path='/carrinho/lanche/:id' element={<CartLancheDetalhes />} />
          <Route path='/carrinho/pizza/:id' element={<CartPizzaDetalhes />} />
          <Route path='/carrinho/porcao/:id' element={<CartPorcaoDetalhes />} />
          <Route path='/carrinho/pratos/:id' element={<CartPratosDetalhes />} />
          <Route path='/carrinho/bebida/:id' element={<CartBebidasDetalhes />} />

          {/* APP ROUTES */}
          <Route path='/' element={<App />}>
            <Route path='/redefinir-senha' element={<RedefinePassword />} />
            <Route path='/termos-e-politicas' element={<TermosEPoliticas />} />

            <Route path='/' element={<Home />} />
            <Route path='/promocoes' element={<Promocao />} />
            <Route path='/cadastro' element={<Cadastro />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/perfil' element={<PrivateRoute> <Profile /> </PrivateRoute>} />

            <Route path='/menu/lanches' element={<Lanche />} />
            <Route path='/menu/lanches/ver-todos/:cat' element={<TodosLanches />} />
            <Route path='/menu/pizzas' element={<Pizza />} />
            <Route path='/menu/porcoes' element={<Porcao />} />
            <Route path='/menu/pratos' element={<Prato />} />
            <Route path='/menu/bebidas' element={<Bebidas />} />

            <Route path='/carrinho' element={<Cart />} />



          </Route>

        </Routes>
      </Suspense>
    </Provider>
  </BrowserRouter>

);
