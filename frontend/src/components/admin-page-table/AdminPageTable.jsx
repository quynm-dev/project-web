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
import { PropTypes } from 'prop-types';
import axiosClient from '../../api/axios';

export default function AdminPageTable({ columns, object, width }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get(`/${object}`)
      .then((res) => {
        setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [object]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRedirectEdit = (id) => {
    navigate(`/admin/${object}/${id}/edit`);
  };

  const handleDelete = (id) => {
    axiosClient
      .delete(`/${object}/${id}`)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box sx={{ width: { width }, margin: 'auto', paddingY: '30px' }}>
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
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        if (column.id === 'edit') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Button
                                sx={{ marginLeft: '-20px', color: 'inherit' }}
                                onClick={() => handleRedirectEdit(row.id)}
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
                                onClick={() => handleDelete(row.id)}
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

AdminPageTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  object: PropTypes.string,
  width: PropTypes.string,
};

AdminPageTable.defaultProps = {
  columns: [],
  object: '',
  width: '',
};
