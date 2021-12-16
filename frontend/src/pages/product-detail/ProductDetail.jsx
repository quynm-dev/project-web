import {
  Box,
  Typography,
  Breadcrumbs,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Button,
} from '@mui/material';

import BestSeller from '../../components/best-seller/BestSeller';
import Layout from '../../layouts/main-layout/Layout';

function ProductDetail() {
  const product = {
    productImageUrl: '/images/product-detail/product-01.jpeg',
    productBrand: 'Botanist Green',
    productPrice: '1.190.000 VND',
    productName: 'Track 6 Class E - Low Top',
    productDescription:
      'Dễ dàng mix & match với nhiều loại trang phục và phong cách thời trang khác nhau, mũ bóng chày có thiết kế cổ điển cùng hoạ tiết thêu đơn giản chính là món phụ kiện không thể thiếu trong tủ đồ nhà bạn.',
  };
  return (
    <Layout>
      <Box>
        <Box
          sx={{
            width: '90%',
            margin: 'auto',
            borderBottom: '1px dashed #979797',
            paddingBottom: '100px',
          }}
        >
          <Box
            sx={{
              borderBottom: '2px solid black',
              marginBottom: '30px',
              paddingBottom: '5px',
            }}
          >
            <Breadcrumbs aria-label="breadcrumb">
              <Typography color="text.primary">
                {product.productBrand}
              </Typography>
              <Typography color="text.primary">
                {product.productName}
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{ width: '50%', paddingRight: '20px', paddingTop: '20px' }}
            >
              <img
                src={product.productImageUrl}
                alt={product.productName}
                style={{ width: '100%' }}
              />
            </Box>
            <Box
              sx={{
                width: '50%',
                paddingLeft: '20px',
                paddingTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ fontWeight: 'bold', fontSize: '30px' }}>
                {product.productName}
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Box>Tình trạng:</Box>
                <Box sx={{ paddingX: '5px', fontWeight: '600' }}>Còn hàng</Box>
              </Box>
              <Box
                sx={{ fontSize: '20px', color: '#f15e2c', fontWeight: 'bold' }}
              >
                {product.productPrice}
              </Box>
              <Box
                sx={{
                  lineHeight: '1.5',
                  borderTop: '1px dashed #979797',
                  borderBottom: '1px dashed #979797',
                  paddingY: '20px',
                }}
              >
                {product.productDescription}
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ paddingRight: '50px' }}>
                  <Box sx={{ width: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="size-label">Size</InputLabel>
                      <Select labelId="size-label" label="Size">
                        <MenuItem value={38}>38</MenuItem>
                        <MenuItem value={39}>39</MenuItem>
                        <MenuItem value={40}>40</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <Box>
                  <Box sx={{ width: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="quantity-label">Số lượng</InputLabel>
                      <Select labelId="quantity-label" label="quantity">
                        <MenuItem value={100}>100</MenuItem>
                        <MenuItem value={200}>200</MenuItem>
                        <MenuItem value={300}>300</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
              <Button variant="contained" sx={{ marginBottom: '5px' }}>
                THÊM VÀO GIỎ HÀNG
              </Button>
            </Box>
          </Box>
        </Box>
        <BestSeller />
      </Box>
    </Layout>
  );
}

export default ProductDetail;
