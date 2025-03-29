import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  CircularProgress,
  Container,
  Fade,
  useTheme,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { Todo } from '../types/todo';
import { todoService } from '../services/todoService';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await todoService.getAll();
      setTodos(data);
    } catch (error) {
      console.error('Error loading todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (title: string, description: string) => {
    try {
      const newTodo = await todoService.create(title, description);
      setTodos(prevTodos => [...prevTodos, newTodo]);
      window.location.reload();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleToggleTodo = async (id: number) => {
    try {
      const todo = todos.find(t => t.Id === id);
      if (todo) {
        const updatedTodo = await todoService.update({
          Id: todo.Id,
          Title: todo.Title,
          Description: todo.Description,
          IsCompleted: !todo.IsCompleted,
          CreatedDate: todo.CreatedDate
        });
        setTodos(prevTodos => prevTodos.map(t =>
          t.Id === id ? updatedTodo : t
        ));
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await todoService.delete(id);
      setTodos(prevTodos => prevTodos.filter(todo => todo.Id !== id));
      window.location.reload();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleUpdateTodo = async (todo: Todo) => {
    try {
      if (!todo.Id) return;
      const updatedTodo = await todoService.update({
        Id: todo.Id,
        Title: todo.Title,
        Description: todo.Description,
        IsCompleted: todo.IsCompleted,
        CreatedDate: todo.CreatedDate
      });
      setTodos(prevTodos => prevTodos.map(t => 
        t.Id === todo.Id ? updatedTodo : t
      ));
      window.location.reload();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        sx={{
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        }}
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          py: 4,
        }}
      >
        <Container maxWidth="sm">
          <Fade in timeout={1000}>
            <Box sx={{ my: 4 }}>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                align="center"
                sx={{
                  color: 'primary.main',
                  fontWeight: 'bold',
                  mb: 4,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                ✨ Todo List
              </Typography>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 4,
                  borderRadius: 4,
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <TodoForm onSubmit={handleAddTodo} />
                <List sx={{ mt: 2 }}>
                  {todos.map((todo, index) => (
                    <Fade in timeout={500} key={`fade-${todo.Id}`} style={{ transitionDelay: `${index * 100}ms` }}>
                      <Box>
                        <TodoItem
                          todo={todo}
                          onToggle={handleToggleTodo}
                          onDelete={handleDeleteTodo}
                          onUpdate={handleUpdateTodo}
                        />
                      </Box>
                    </Fade>
                  ))}
                </List>
              </Paper>
            </Box>
          </Fade>
        </Container>
      </Box>
    </ThemeProvider>
  );
}; 