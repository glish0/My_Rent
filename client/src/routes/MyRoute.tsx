
import { Route, Routes } from 'react-router-dom';
import Register from '../pages/Register';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';

const index = () => {
  return (
    <Routes>
      <Route path="/" element={ < HomePage />} />
      <Route path="/register" element={ < Register />} />
      <Route path="/login" element={ < LoginPage />} />
    </Routes>
  );
}

export default index;
