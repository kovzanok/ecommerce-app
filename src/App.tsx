import { Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/login-page';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
