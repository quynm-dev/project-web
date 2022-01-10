import Table from '../../../../components/table/Table';

const columns = [
  { id: 'id', label: 'Option ID' },
  { id: 'name', label: 'Product Name' },
  { id: 'product_image_url', label: 'Product Image' },
  { id: 'size', label: 'Size' },
  { id: 'quantity', label: 'Quantity' },
  { id: 'edit', label: 'Edit' },
  { id: 'delete', label: 'Delete' },
];

function AdminUser() {
  return <Table columns={columns} object="options" width="80%" />;
}

export default AdminUser;
