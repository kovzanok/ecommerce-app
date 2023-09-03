import { Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/login-page';
import Layout from './components/Layout';
import NotFoundPage from './pages/not-found-page';
import AuthRoute from './components/auth-route';
import MainPage from './pages/main-page';
import Registration from './pages/registration-page';
import CatalogPage from './pages/catalog-page';
import ProductPage from './pages/product-page';
import UserRoute from './components/user-route';
import UserPage from './pages/personal-user-page';
import AddressesUserPage from './pages/addresses-user-page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route element={<AuthRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Registration />} />
          </Route>
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:category" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/user" element={<UserRoute />}>
            <Route path="personal-info" element={<UserPage />} />
            <Route path="addresses" element={<AddressesUserPage />} />
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
