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
  Box,
  Typography,
  useTheme,
  alpha
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Star as StarIcon } from '@mui/icons-material';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const [editedTodo, setEditedTodo] = useState<Todo>(todo);
  const theme = useTheme();

  useEffect(() => {
    setEditedTodo(todo);
  }, [todo]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditedTodo(todo);
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
      <Paper 
        elevation={1} 
        sx={{ 
          mb: 2, 
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme.shadows[4],
            backgroundColor: alpha(theme.palette.primary.main, 0.04),
          },
          borderRadius: 2,
          overflow: 'hidden',
        }} 
        onClick={handleClickOpen}
      >
        <ListItem 
          sx={{ 
            py: 2,
            px: 3,
            borderLeft: `4px solid ${todo.IsCompleted ? theme.palette.success.main : theme.palette.primary.main}`,
          }}
        >
          <Checkbox
            edge="start"
            checked={todo.IsCompleted}
            onChange={(e) => {
              e.stopPropagation();
              onToggle(todo.Id);
            }}
            color="primary"
            sx={{
              '&.Mui-checked': {
                color: theme.palette.success.main,
              },
            }}
          />
          <ListItemText
            primary={
              <Typography
                variant="subtitle1"
                component="div"
                sx={{
                  fontWeight: 500,
                  textDecoration: todo.IsCompleted ? 'line-through' : 'none',
                  color: todo.IsCompleted ? 'text.secondary' : 'text.primary',
                }}
              >
                {todo.Title || 'Untitled Todo'}
              </Typography>
            }
            secondary={
              <>
                <Typography
                  variant="body2"
                  component="span"
                  color="text.secondary"
                  sx={{
                    textDecoration: todo.IsCompleted ? 'line-through' : 'none',
                    display: 'block',
                    mb: 0.5,
                  }}
                >
                  {todo.Description || 'No description'}
                </Typography>
                <Typography
                  variant="caption"
                  component="span"
                  color="text.secondary"
                  sx={{ display: 'block' }}
                >
                  Created: {new Date(todo.CreatedDate).toLocaleDateString()}
                </Typography>
              </>
            }
          />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="edit"
              onClick={(e) => {
                e.stopPropagation();
                handleClickOpen();
              }}
              sx={{ 
                mr: 1,
                color: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                },
              }}
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
              sx={{
                color: theme.palette.error.main,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.error.main, 0.1),
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </Paper>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle sx={{ 
          borderBottom: `1px solid ${theme.palette.divider}`,
          pb: 2,
        }}>
          Edit Todo
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} sx={{ mt: 2 }}>
            <TextField
              label="Title"
              fullWidth
              value={editedTodo.Title || ''}
              onChange={(e) => setEditedTodo({ ...editedTodo, Title: e.target.value })}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={editedTodo.Description || ''}
              onChange={(e) => setEditedTodo({ ...editedTodo, Description: e.target.value })}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            <Box 
              display="flex" 
              alignItems="center" 
              gap={1}
              sx={{
                p: 1,
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.primary.main, 0.04),
              }}
            >
              <Checkbox
                checked={editedTodo.IsCompleted}
                onChange={(e) => setEditedTodo({ ...editedTodo, IsCompleted: e.target.checked })}
                color="primary"
                sx={{
                  '&.Mui-checked': {
                    color: theme.palette.success.main,
                  },
                }}
              />
              <Typography variant="body2" color="text.secondary">
                Mark as completed
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          borderTop: `1px solid ${theme.palette.divider}`,
          pt: 2,
          px: 3,
        }}>
          <Button 
            onClick={handleClose}
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            variant="contained" 
            color="primary"
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TodoItem; 