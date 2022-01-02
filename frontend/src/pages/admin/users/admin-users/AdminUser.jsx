import { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Box,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../../../api/axios';

const columns = [
  { id: 'name', label: 'Name' },
  { id: 'username', label: 'Username' },
  { id: 'role', label: 'Role' },
  { id: 'edit', label: 'Edit' },
  { id: 'delete', label: 'Delete' },
];

export default function AdminProduct() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get('/users')
      .then((res) => {
        setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRedirectEditUser = (id) => {
    navigate(`/admin/users/${id}/edit`);
  };

  const handleDeleteUser = (id) => {
    axiosClient
      .delete(`/users/${id}`)
      .then(() => {
        setRefresh(refresh + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box sx={{ width: '70%', margin: 'auto', paddingY: '30px' }}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        if (column.id === 'edit') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Button
                                sx={{ marginLeft: '-20px', color: 'inherit' }}
                                onClick={() => handleRedirectEditUser(row.id)}
                              >
                                <EditIcon />
                              </Button>
                            </TableCell>
                          );
                        }
                        if (column.id === 'delete') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Button
                                sx={{ marginLeft: '-10px', color: 'inherit' }}
                                onClick={() => handleDeleteUser(row.id)}
                              >
                                <DeleteIcon />
                              </Button>
                            </TableCell>
                          );
                        }
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
