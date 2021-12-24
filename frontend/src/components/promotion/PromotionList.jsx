import { Box } from '@mui/material';

import Promotion from './Promotion';

function PromotionList() {
  const promotions = [
    {
      id: 1,
      promotionImageUrl: '/images/promotion/promotion-01.jpeg',
      promotionName: 'All man in black',
      promotionDescription:
        'Mặc dù được ứng dụng rất nhiều, nhưng sắc đen lúc nào cũng toát lên một vẻ huyền bí không nhàm chán',
    },
    {
      id: 2,
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
        ({ promotionImageUrl, promotionName, promotionDescription, id }) => {
          return (
            <Promotion
              promotionImageUrl={promotionImageUrl}
              promotionName={promotionName}
              promotionDescription={promotionDescription}
              key={id}
            />
          );
        },
      )}
    </Box>
  );
}

export default PromotionList;
