import React from 'react';

import Layout from '../../layouts/main-layout/Layout';
import ProductList from '../../components/product/ProductList';

function Homepage() {
  return (
    <Layout>
      <ProductList />
    </Layout>
  );
}

export default Homepage;
