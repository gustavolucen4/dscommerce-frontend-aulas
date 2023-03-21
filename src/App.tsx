import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Catalog from './routes/ClientHome/Catalog';
import ClientHome from './routes/ClientHome';
import ProductDetails from './routes/ClientHome/ProductDetails';
import Cart from './routes/ClientHome/Cart';
import { useEffect, useState } from 'react';
import { ContextCartCount } from './utils/context-cart';
import Login from './routes/ClientHome/Login';
import Admin from './routes/Admin';
import AdminHome from './routes/Admin/AdminHome';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { history } from './utils/history';
import { PrivateRoute } from './components/PrivateRoute';
import * as authService from './service/auth-service'
import { AccessTokenPayloadDTO } from './models/auth';
import { ContextToken } from './utils/context-token';
import Confirmation from './routes/ClientHome/Confirmation';

function App() {

    const [contextCartCount, setContextCartCount] = useState<number>(0);

    const [contextTokenPayload, setContextTokenPayload] = useState<AccessTokenPayloadDTO>();

    useEffect(() => {
        if (authService.isAuthenticated()) {
            const payload = authService.getAccessTokenPayload();
            setContextTokenPayload(payload);
        }
    }, []);

    return (
        <ContextToken.Provider value={{ contextTokenPayload, setContextTokenPayload }}>
            <ContextCartCount.Provider value={{ contextCartCount, setContextCartCount }}>
                <HistoryRouter history={history}>
                    <Routes>
                        <Route path='/' element={<ClientHome />}>
                            <Route index element={<Catalog />} />
                            <Route path='catalog' element={<Catalog />} />
                            <Route path='product-details/:productId' element={<ProductDetails />} />
                            <Route path='cart' element={<Cart />} />
                            <Route path='login' element={<Login />} />
                            <Route path='confirmation/:orderId' element={<Confirmation />} />
                        </Route>
                        <Route path='/admin/' element={<PrivateRoute roles={['ROLE_ADMIN']} ><Admin /></PrivateRoute>}>
                            <Route index element={<AdminHome />} />
                        </Route>
                        <Route path='*' element={<Navigate to={'/'} />} />
                    </Routes>
                </HistoryRouter>
            </ContextCartCount.Provider>
        </ContextToken.Provider>
    );
}

export default App
