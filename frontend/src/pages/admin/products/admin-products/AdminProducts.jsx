import Table from '../../../../components/table/Table';

const columns = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Name' },
  { id: 'brand_name', label: 'Brand' },
  { id: 'description', label: 'Description' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'discount', label: 'Discount' },
  { id: 'product_image_url', label: 'Product Image Url' },
  { id: 'edit', label: 'Edit' },
  { id: 'delete', label: 'Delete' },
];

function AdminUser() {
  return <Table columns={columns} object="products" width="85%" />;
}

export default AdminUser;
