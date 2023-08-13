import { Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/login-page';
import Layout from './components/Layout';
import NotFoundPage from './pages/not-found-page';
import Registration from './pages/registration-page';
import AuthRoute from './components/AuthRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index />
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
