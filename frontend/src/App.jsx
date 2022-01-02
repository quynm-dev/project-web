import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layout from './layouts/main-layout/Layout';
import Homepage from './pages/homepage/Homepage';
import Login from './pages/login/Login';
import Product from './pages/products/Product';
import ShoppingCart from './pages/shopping-cart/ShoppingCart';
import ProductDetail from './pages/product-detail/ProductDetail';
import Register from './pages/register/Register';
import NotFound from './pages/not-found/NotFound';
import AdminProduct from './pages/admin/products/admin-products/AdminProduct';
import AdminUser from './pages/admin/users/admin-users/AdminUser';
import AdminUserEdit from './pages/admin/users/admin-user-edit/AdminUserEdit';

const App = () => {
  const token = useSelector((state) => {
    return state.user ? state.user.token : '';
  });

  const role = useSelector((state) => {
    return state.user.role;
  });

  return (
    <Router>
      <Layout>
        <Routes>
          {token ? (
            <>
              <Route path="/" element={<Homepage />} />
              <Route path="/products" element={<Product />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/shopping-cart" element={<ShoppingCart />} />
            </>
          ) : (
            ''
          )}

          {role === 'admin' ? (
            <>
              <Route path="/admin/products" element={<AdminProduct />} />
              <Route path="/admin/users" element={<AdminUser />} />
              <Route path="/admin/users/:id/edit" element={<AdminUserEdit />} />
            </>
          ) : (
            ''
          )}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
