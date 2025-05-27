import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Summary from '../pages/Summary';
import NotFound from '../pages/NotFound'; 

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/summary" element={<Summary />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
