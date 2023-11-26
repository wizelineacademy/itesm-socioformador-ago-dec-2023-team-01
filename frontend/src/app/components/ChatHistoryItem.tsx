import React, { useEffect, useRef, useState } from 'react';
import {
  Typography, Button, IconButton, MenuItem, TextField, Menu, Box, Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import { editConversationTitle, deleteConversation } from '../../services/chatService';

export default function ChatHistoryItem({
  chatInfo, handleChatItemClick, getChatHistory, conversationId,
}: { chatInfo: { title: string, id: number }; handleChatItemClick: (id: number) => void; getChatHistory: () => Promise<void>; conversationId: number; }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editedTitle, setEditedTitle] = useState<string>(chatInfo.title);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOnItem = () => {
    if (isEditing) return;
    handleChatItemClick(chatInfo.id);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    handleClose();
    setEditedTitle(chatInfo.title);
  };

  const handleSaveClick = () => {
    // Handle save changes
    // You may want to perform an update here with the editedTitle
    chatInfo.title = editedTitle;
    editConversationTitle(chatInfo.id, editedTitle);
    setIsEditing(false);
    handleClose();
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    handleClose();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleDeleteButtonClick = () => {
    setConfirmationModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    // Call your endpoint with the selectedChatId for deletion
    // After successful deletion, update your chatHistory state accordingly
    await deleteConversation(chatInfo.id);
    await getChatHistory();
    handleChatItemClick(0);
    setConfirmationModalOpen(false);
    handleClose();
  };

  const handleCancelDelete = () => {
    // Close the confirmation modal without performing any deletion
    handleClose();
    setConfirmationModalOpen(false);
  };
  return (
    <>
      <Button
        onClick={() => {
          handleClickOnItem();
        }}
        sx={{ width: '100%', padding: 0 }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{
            width: '100%',
            marginBottom: '10px',
            border: '1.5px solid #4D545D',
            borderRadius: '10px',
            paddingY: '8px',
            // padding: '5px 10px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            backgroundColor: conversationId === chatInfo.id ? '#4D545D' : 'transparent',
          }}
        >
          {isEditing ? (
            <TextField
              value={editedTitle}
              onChange={handleTitleChange}
              variant="outlined"
              size="small"
              autoFocus
              fullWidth
              sx={{
                marginLeft: '10px',
              }}
              InputProps={{
                sx: {
                  color: 'white',
                  flexGrow: 1,
                  marginRight: '10px',
                  overflow: 'hidden',
                  textTransform: 'capitalize',
                  textAlign: 'start',
                  paddingLeft: '10px',
                  alignItems: 'center',
                  display: 'flex',
                  backgroundColor: '#4D545D',
                  '& fieldset': {
                    borderColor: '#7c8187',
                  },
                },
              }}
            />
          ) : (
            <Typography
              variant="body1"
              noWrap
              sx={{
                color: 'white',
                flexGrow: 1,
                marginRight: '10px',
                overflow: 'hidden',
                whiteSpace: 'nowrap', // Add this line for the ellipsis
                textTransform: 'capitalize',
                textAlign: 'start',
                paddingLeft: '10px',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              {chatInfo.title}
            </Typography>
          )}
          <IconButton
            size="small"
            sx={{ color: conversationId === chatInfo.id ? '#111823' : '#4D545D' }}
            onClick={(event) => {
              event.stopPropagation(); // Prevent the click event from reaching the parent Button
              handleClick(event);
            }}
          >
            {isEditing ? <CheckIcon /> : <EditIcon />}
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {isEditing ? (
              <>
                <MenuItem onClick={(event) => { event.stopPropagation(); handleSaveClick(); }}>Save Changes</MenuItem>
                <MenuItem onClick={(event) => { event.stopPropagation(); handleCancelClick(); }}>Cancel</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={(event) => {
                  event.stopPropagation();
                  handleEditClick();
                }}
                >
                  Edit
                </MenuItem>
                <MenuItem onClick={(event) => {
                  event.stopPropagation();
                  handleDeleteButtonClick();
                }}
                >
                  Delete
                </MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </Button>
      <Dialog
        open={isConfirmationModalOpen}
        onClose={handleCancelDelete}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this conversation?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
