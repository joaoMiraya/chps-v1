import '../styles/global.css';
import '../styles/default.css';

import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';

import { PrivateRoute } from './privateRoute';
import { AdminRoute } from './adminRoute';

import App from '../App';
import NotFound from '../components/partials/NotFound';
import Menu from '../pages/Menu';
import Loading from '../components/partials/Loading';

import { Provider } from 'react-redux';
import { store } from '../services/redux/store';


import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Teste from '../pages/Teste';
import Dashboard from '../pages/dashboard/DashHome';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/teste' element={<Teste />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/dashboard' element={<AdminRoute><Dashboard /></AdminRoute>} />
          <Route path='/' element={<App />}>

            <Route path='/' element={<Home />} />
            <Route path='/menu' element={<Menu />} />

            <Route path='/perfil' element={<PrivateRoute> <Profile /> </PrivateRoute>} />

          </Route>

        </Routes>
      </Suspense>
    </Provider>
  </BrowserRouter>

);
