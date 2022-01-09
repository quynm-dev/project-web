import Table from '../../../../components/table/Table';

const columns = [
  { id: 'id', label: 'Order ID' },
  { id: 'name', label: 'Name' },
  { id: 'phone_number', label: 'Phone Number' },
  { id: 'address', label: 'Address' },
  { id: 'total_pricing', label: 'Total Pricing' },
  { id: 'delete', label: 'Delete' },
];

function AdminUser() {
  return <Table columns={columns} object="orders" width="80%" />;
}

export default AdminUser;
