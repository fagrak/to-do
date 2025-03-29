import React, { useState, useEffect } from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const [editedTodo, setEditedTodo] = useState<Todo>({
    Id: todo.Id,
    Title: todo.Title,
    Description: todo.Description,
    IsCompleted: todo.IsCompleted,
    CreatedDate: todo.CreatedDate
  });

  useEffect(() => {
    setEditedTodo({
      Id: todo.Id,
      Title: todo.Title,
      Description: todo.Description,
      IsCompleted: todo.IsCompleted,
      CreatedDate: todo.CreatedDate
    });
  }, [todo]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditedTodo({
      Id: todo.Id,
      Title: todo.Title,
      Description: todo.Description,
      IsCompleted: todo.IsCompleted,
      CreatedDate: todo.CreatedDate
    });
  };

  const handleSave = async () => {
    if (editedTodo.Id) {
      try {
        await onUpdate(editedTodo);
        handleClose();
      } catch (error) {
        console.error('Error saving todo:', error);
      }
    }
  };

  return (
    <>
      <Paper elevation={1} sx={{ mb: 1, cursor: 'pointer' }} onClick={handleClickOpen}>
        <ListItem>
          <Checkbox
            edge="start"
            checked={todo.IsCompleted}
            onChange={(e) => {
              e.stopPropagation();
              onToggle(todo.Id);
            }}
            color="primary"
          />
          <ListItemText
            primary={todo.Title || ''}
            secondary={todo.Description || ''}
            sx={{
              textDecoration: todo.IsCompleted ? 'line-through' : 'none',
              color: todo.IsCompleted ? 'text.secondary' : 'text.primary'
            }}
          />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="edit"
              onClick={(e) => {
                e.stopPropagation();
                handleClickOpen();
              }}
              sx={{ mr: 1 }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(todo.Id);
              }}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </Paper>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} sx={{ mt: 2 }}>
            <TextField
              label="Title"
              fullWidth
              value={editedTodo.Title || ''}
              onChange={(e) => setEditedTodo({ ...editedTodo, Title: e.target.value })}
              size="small"
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={editedTodo.Description || ''}
              onChange={(e) => setEditedTodo({ ...editedTodo, Description: e.target.value })}
              size="small"
            />
            <Box display="flex" alignItems="center" gap={1}>
              <Checkbox
                checked={editedTodo.IsCompleted}
                onChange={(e) => setEditedTodo({ ...editedTodo, IsCompleted: e.target.checked })}
                color="primary"
              />
              <span>Mark as completed</span>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TodoItem; 