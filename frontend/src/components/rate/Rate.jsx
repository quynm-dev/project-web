import { useState } from 'react';
import { Box, Button, Menu, MenuItem, Modal, TextField } from '@mui/material';
import { PropTypes } from 'prop-types';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StarRatingComponent from 'react-star-rating-component';

import axiosClient from '../../api/axios';

function Rate({
  username,
  time,
  rateStar,
  comment,
  userId,
  userRateId,
  id,
  reload,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [rating, setRating] = useState(rateStar);
  const [editedComment, setEditedComment] = useState(comment);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const formatDate = new Date(time);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
    handleClose();
  };
  const handleCloseModal = (isAction = false) => {
    setOpenModal(false);
    if (isAction) {
      setRating(rateStar);
      setEditedComment(comment);
    }
  };

  const handleDeleteRate = () => {
    axiosClient
      .delete(`/rates/${id}`)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
    handleClose();
    reload();
    handleCloseModal();
  };

  const onStarClick = (nextValue) => {
    setRating(nextValue);
  };

  const handleEditedCommentChange = (event) => {
    setEditedComment(event.target.value);
  };

  const handleEditRate = () => {
    axiosClient
      .put(`/rates/${id}`, {
        star: rating,
        comment: editedComment,
      })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
    reload();
    handleCloseModal();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '80%',
        margin: 'auto',
        justifyContent: 'space-between',
        paddingY: '20px',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <Box>
          <AccountCircleRoundedIcon sx={{ fontSize: '60px' }} />
        </Box>
        <Box
          sx={{
            width: '100%',
            paddingLeft: '20px',
            paddingRight: '50px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              paddingBottom: '20px',
              alignItems: 'baseline',
            }}
          >
            <Box sx={{ paddingRight: '20px', fontSize: '20px' }}>
              {username}
            </Box>
            <Box sx={{ color: 'gray', fontSize: '13px' }}>
              {formatDate.toLocaleString()}
            </Box>
          </Box>
          <Box>{comment}</Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingX: '10px',
          justifyContent: 'space-between',
          width: '100px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ paddingRight: '5px' }}>{rateStar}</Box>
          <Box>
            <StarOutlinedIcon style={{ color: '#ffbe00' }} />
          </Box>
        </Box>

        <Box sx={{ position: 'relative', left: '20px' }}>
          {userId === userRateId ? (
            <Button
              id="demo-positioned-button"
              aria-controls={open ? 'demo-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreVertRoundedIcon style={{ color: 'black' }} />
            </Button>
          ) : (
            ''
          )}
        </Box>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleOpenModal}>
            <EditIcon /> <span style={{ paddingLeft: '10px' }}>Edit</span>
          </MenuItem>
          <MenuItem onClick={handleDeleteRate}>
            <DeleteIcon /> <span style={{ paddingLeft: '10px' }}>Delete</span>
          </MenuItem>
        </Menu>
      </Box>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box>
            <Box sx={{ paddingBottom: '10px' }}>
              <StarRatingComponent
                name="rating"
                starCount={5}
                value={rating}
                onStarClick={onStarClick}
              />
            </Box>
            <Box>
              <TextField
                label="Comment "
                variant="standard"
                sx={{ width: '100%' }}
                onChange={handleEditedCommentChange}
                value={editedComment}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '30px',
            }}
          >
            <Button variant="outlined" onClick={handleEditRate}>
              Edit Rate
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default Rate;

Rate.propTypes = {
  username: PropTypes.string,
  time: PropTypes.string,
  rateStar: PropTypes.number,
  comment: PropTypes.string,
  userId: PropTypes.number,
  userRateId: PropTypes.number,
  id: PropTypes.number,
  reload: PropTypes.func,
};

Rate.defaultProps = {
  username: '',
  time: '',
  rateStar: 0,
  comment: '',
  userId: 0,
  userRateId: 0,
  id: 0,
  reload: () => {},
};
