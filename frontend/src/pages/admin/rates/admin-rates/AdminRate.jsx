import Table from '../../../../components/table/Table';

const columns = [
  { id: 'id', label: 'ID' },
  { id: 'product_name', label: 'Product Name' },
  { id: 'product_image_url', label: 'Product Image' },
  { id: 'comment', label: 'Comment' },
  { id: 'star', label: 'Star' },
  { id: 'user_name', label: 'User Name' },
  { id: 'delete', label: 'Delete' },
];

function AdminRates() {
  return <Table columns={columns} object="rates" width="85%" />;
}

export default AdminRates;
