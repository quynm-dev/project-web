import { Box } from '@mui/material';

import FooterColumn from './FooterColumn';

function Footer() {
  const columns = [
    {
      title: 'Sản phẩm',
      items: ['Giày nam', 'Giày nữ', 'Thời trang & Phụ kiện', 'Sale-off'],
    },
    {
      title: 'Về công ty',
      items: ['Dứa tuyển dụng', 'Liên hệ nhượng quyền', 'Về Ananas'],
    },
    {
      title: 'Hỗ trợ',
      items: [
        'FAQs',
        'Bảo mật thông tin',
        'Chính sách chung',
        'Tra cứu đơn hàng',
      ],
    },
    {
      title: 'Liên hệ',
      items: ['Email góp ý', 'Hotline', '0974651422'],
    },
  ];
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#4c4c4c',
        paddingX: '20px',
        paddingY: '50px',
      }}
    >
      <Box sx={{ paddingRight: '20px' }}>
        <img src="/images/footer/store.svg" alt="store" />
      </Box>
      {columns.map((column) => {
        return <FooterColumn title={column.title} items={column.items} />;
      })}
    </Box>
  );
}

export default Footer;
