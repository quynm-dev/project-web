import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from './pages/homepage/Homepage';
import Login from './pages/login/Login';
import Product from './pages/products/Product';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Product />} />
      </Routes>
    </Router>
  );
};

export default App;
