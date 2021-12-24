import { Box } from '@mui/material';

import FooterColumn from './FooterColumn';

function Footer() {
  const columns = [
    {
      id: 1,
      title: 'Sản phẩm',
      items: ['Giày nam', 'Giày nữ', 'Thời trang & Phụ kiện', 'Sale-off'],
    },
    {
      id: 2,
      title: 'Về công ty',
      items: ['Dứa tuyển dụng', 'Liên hệ nhượng quyền', 'Về Ananas'],
    },
    {
      id: 3,
      title: 'Hỗ trợ',
      items: [
        'FAQs',
        'Bảo mật thông tin',
        'Chính sách chung',
        'Tra cứu đơn hàng',
      ],
    },
    {
      id: 4,
      title: 'Liên hệ',
      items: ['Email góp ý', 'Hotline', '0974651422'],
    },
  ];

  return (
    <Box
      sx={{ backgroundColor: '#4c4c4c', paddingX: '20px', paddingY: '50px' }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          paddingY: '20px',
        }}
      >
        <Box sx={{ paddingRight: '20px' }}>
          <img src="/images/footer/store.svg" alt="store" />
        </Box>
        {columns.map(({ title, items, id }) => {
          return <FooterColumn title={title} items={items} key={id} />;
        })}
      </Box>
      <Box sx={{ color: '#c4c4c4', textAlign: 'center' }}>
        Copyright © 2021 Ananas. All rights reserved.
      </Box>
    </Box>
  );
}

export default Footer;
