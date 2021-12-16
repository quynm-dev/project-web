import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './layouts/main-layout/Layout';
import Homepage from './pages/homepage/Homepage';
import Login from './pages/login/Login';
import Product from './pages/products/Product';
import ShoppingCart from './pages/shopping-cart/ShoppingCart';
import ProductDetail from './pages/product-detail/ProductDetail';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
