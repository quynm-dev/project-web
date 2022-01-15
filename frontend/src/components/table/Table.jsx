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
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { useNavigate, useLocation } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import axiosClient from '../../api/axios';

export default function AdminPageTable({ columns, object, width }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const userId = useSelector((state) => {
    return state.user.id;
  });

  useEffect(() => {
    if (location.pathname === '/orders') {
      axiosClient
        .get(`users/${userId}/orders`)
        .then((res) => {
          setRows(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axiosClient
        .get(`/${object}`)
        .then((res) => {
          setRows(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [object, userId, location]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRedirectEditPage = (id) => {
    navigate(`/admin/${object}/${id}/edit`);
  };

  const handleRedirectAddPage = () => {
    if (object !== 'users') {
      navigate(`/admin/${object}/add`);
      return;
    }
    navigate('/register');
  };

  const handleRedirectOrderDetail = (id) => {
    navigate(`/orders/${id}`);
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
    <Box>
      {object !== 'orders' && object !== 'rates' ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '30px',
          }}
        >
          <Button onClick={handleRedirectAddPage}>
            <AddCircleOutlineRoundedIcon
              sx={{ color: 'black', fontSize: '25px' }}
            />
          </Button>
        </Box>
      ) : (
        ''
      )}

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
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                        onClick={
                          object === 'orders'
                            ? () => handleRedirectOrderDetail(row.id)
                            : undefined
                        }
                        sx={
                          object === 'orders'
                            ? { cursor: 'pointer' }
                            : undefined
                        }
                      >
                        {columns.map((column) => {
                          if (column.id === 'edit') {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Button
                                  sx={{ marginLeft: '-20px', color: 'inherit' }}
                                  onClick={() => handleRedirectEditPage(row.id)}
                                >
                                  <EditIcon />
                                </Button>
                              </TableCell>
                            );
                          }

                          if (column.id.includes('image')) {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <img
                                  src={row[column.id]}
                                  alt="product"
                                  style={{ width: '200px' }}
                                />
                              </TableCell>
                            );
                          }

                          if (column.id === 'delete') {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Button
                                  sx={{
                                    marginLeft: '-10px',
                                    color: 'inherit',
                                  }}
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    handleDelete(row.id);
                                  }}
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
                                : value}{' '}
                              {column.id.toLowerCase().includes('pricing')
                                ? ' $'
                                : ''}
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
