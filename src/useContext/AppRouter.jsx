import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutPage from './AboutPage';
import HomePage from './HomePage';
import LoginPage from './LoginPage';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
