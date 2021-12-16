import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from './pages/homepage/Homepage';
import Login from './pages/login/Login';
import Product from './pages/products/Product';
import ShoppingCart from './pages/shopping-cart/ShoppingCart';
import ProductDetail from './pages/product-detail/ProductDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
      </Routes>
    </Router>
  );
};

export default App;
