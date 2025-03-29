import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  useTheme,
  alpha
} from '@mui/material';
import { Add as AddIcon, Lightbulb as LightbulbIcon } from '@mui/icons-material';

interface TodoFormProps {
  onSubmit: (title: string, description: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const theme = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim(), description.trim());
      setTitle('');
      setDescription('');
      setOpen(false);
    }
  };

  return (
    <>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 3,
          background: alpha(theme.palette.primary.main, 0.04),
          borderRadius: 2,
          border: `1px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: alpha(theme.palette.primary.main, 0.08),
            borderColor: theme.palette.primary.main,
          },
        }}
        onClick={() => setOpen(true)}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              p: 1,
              borderRadius: '50%',
              background: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
            }}
          >
            <AddIcon />
          </Box>
          <Box flex={1}>
            <Typography variant="h6" color="primary" gutterBottom>
              Add New Todo
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Click here to create a new task
            </Typography>
          </Box>
          <LightbulbIcon sx={{ color: 'text.secondary' }} />
        </Box>
      </Paper>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
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
          Create New Todo
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} sx={{ mt: 2 }}>
              <TextField
                autoFocus
                label="Title"
                fullWidth
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
              <Box 
                sx={{ 
                  p: 2, 
                  borderRadius: 2,
                  background: alpha(theme.palette.info.main, 0.04),
                  border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
                }}
              >
                <Typography variant="body2" color="info.main" gutterBottom>
                  💡 Tips for a good todo:
                </Typography>
                <Typography variant="body2" color="text.secondary" component="ul" sx={{ m: 0, pl: 2 }}>
                  <li>Be specific and clear</li>
                  <li>Include relevant details</li>
                  <li>Set realistic expectations</li>
                  <li>Add due dates if needed</li>
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
              onClick={() => setOpen(false)}
              sx={{ 
                borderRadius: 2,
                textTransform: 'none',
              }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              disabled={!title.trim()}
              startIcon={<AddIcon />}
              sx={{ 
                borderRadius: 2,
                textTransform: 'none',
                px: 3,
              }}
            >
              Create Todo
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default TodoForm; 