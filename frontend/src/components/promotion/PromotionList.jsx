import { Box } from '@mui/material';

import Promotion from './Promotion';

function PromotionList() {
  const promotions = [
    {
      promotionImageUrl: '/images/promotion/promotion-01.jpeg',
      promotionName: 'All man in black',
      promotionDescription:
        'Mặc dù được ứng dụng rất nhiều, nhưng sắc đen lúc nào cũng toát lên một vẻ huyền bí không nhàm chán',
    },
    {
      promotionImageUrl: '/images/promotion/promotion-02.jpeg',
      promotionName: 'Outlet Sale',
      promotionDescription:
        'Danh mục những sản phẩm bán tại "giá tốt hơn" chỉ được bán kênh online - Online Only, chúng đã từng làm mưa làm gió một thời gian và hiện đang rơi vào tình trạng bể size, bể số.',
    },
  ];
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      {promotions.map(
        ({ promotionImageUrl, promotionName, promotionDescription }) => {
          return (
            <Promotion
              promotionImageUrl={promotionImageUrl}
              promotionName={promotionName}
              promotionDescription={promotionDescription}
            />
          );
        },
      )}
    </Box>
  );
}

export default PromotionList;
