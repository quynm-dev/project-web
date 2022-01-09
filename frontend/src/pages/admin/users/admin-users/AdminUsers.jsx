import Table from '../../../../components/table/Table';

const columns = [
  { id: 'name', label: 'Name' },
  { id: 'username', label: 'Username' },
  { id: 'role', label: 'Role' },
  { id: 'edit', label: 'Edit' },
  { id: 'delete', label: 'Delete' },
];

function AdminUser() {
  return <Table columns={columns} object="users" width="70%" />;
}

export default AdminUser;
