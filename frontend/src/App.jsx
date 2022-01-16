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
import AdminProduct from './pages/admin/products/admin-products/AdminProducts';
import AdminProductEdit from './pages/admin/products/admin-product-edit/AdminProductEdit';
import AdminProductAdd from './pages/admin/products/admin-product-add/AdminProductAdd';
import AdminUser from './pages/admin/users/admin-users/AdminUsers';
import AdminUserEdit from './pages/admin/users/admin-user-edit/AdminUserEdit';
import AdminOption from './pages/admin/options/admin-options/AdminOptions';
import AdminOptionEdit from './pages/admin/options/admin-option-edit/AdminOptionEdit';
import AdminOptionAdd from './pages/admin/options/admin-option-add/AdminOptionAdd';
import AdminOrder from './pages/admin/orders/admin-orders/AdminOrder';
import AdminRate from './pages/admin/rates/admin-rates/AdminRate';
import Profile from './pages/profile/Profile';
import Order from './pages/order/Order';
import OrderDetail from './pages/order-detail/OrderDetail';
import Search from './pages/search/Search';

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
              {role === 'user' ? (
                <>
                  <Route path="/products" element={<Product />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/shopping-cart" element={<ShoppingCart />} />
                  <Route path="/orders" element={<Order />} />
                  <Route path="/search" element={<Search />} />
                </>
              ) : (
                <>
                  <Route path="/admin/products" element={<AdminProduct />} />
                  <Route
                    path="/admin/products/:id/edit"
                    element={<AdminProductEdit />}
                  />
                  <Route
                    path="/admin/products/add"
                    element={<AdminProductAdd />}
                  />

                  <Route path="/admin/users" element={<AdminUser />} />
                  <Route
                    path="/admin/users/:id/edit"
                    element={<AdminUserEdit />}
                  />

                  <Route path="/admin/orders" element={<AdminOrder />} />

                  <Route path="/admin/options" element={<AdminOption />} />
                  <Route
                    path="/admin/options/add"
                    element={<AdminOptionAdd />}
                  />
                  <Route
                    path="/admin/options/:id/edit"
                    element={<AdminOptionEdit />}
                  />
                  <Route path="/admin/rates" element={<AdminRate />} />
                </>
              )}

              <Route path="/profile" element={<Profile />} />
              <Route path="/orders/:id" element={<OrderDetail />} />
            </>
          ) : (
            ''
          )}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Homepage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
