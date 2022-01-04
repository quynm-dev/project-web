import AdminTable from '../../../../components/admin-page-table/AdminPageTable';

const columns = [
  { id: 'name', label: 'Name' },
  { id: 'brand_name', label: 'Brand' },
  { id: 'description', label: 'Description' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'discount', label: 'Discount' },
  { id: 'average_star', label: 'Average Star' },
  { id: 'rate_count', label: 'Rate Count' },
  { id: 'product_image_url', label: 'Product Image Url' },
  { id: 'edit', label: 'Edit' },
  { id: 'delete', label: 'Delete' },
];

function AdminUser() {
  return <AdminTable columns={columns} object="products" width="85%" />;
}

export default AdminUser;
