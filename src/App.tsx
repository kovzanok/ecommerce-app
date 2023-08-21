import { Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/login-page';
import Layout from './components/Layout';
import NotFoundPage from './pages/not-found-page';
import AuthRoute from './components/auth-route';
import MainPage from './pages/main-page';
import Registration from './pages/registration-page';

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
          <Route path="/*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
