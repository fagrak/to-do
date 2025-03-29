import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  CircularProgress,
  Container
} from '@mui/material';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { Todo } from '../types/todo';
import { todoService } from '../services/todoService';

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await todoService.getAll();
      console.log('Loaded todos:', data);
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
      console.log('Added new todo:', newTodo);
      setTodos(prevTodos => [...prevTodos, newTodo]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleToggleTodo = async (id: number) => {
    try {
      const todo = todos.find(t => t.Id === id);
      console.log('Toggling todo:', todo);
      if (todo) {
        const updatedTodo = await todoService.update({
          Id: todo.Id,
          Title: todo.Title,
          Description: todo.Description,
          IsCompleted: !todo.IsCompleted,
          CreatedDate: todo.CreatedDate
        });
        console.log('Updated todo:', updatedTodo);
        setTodos(prevTodos => prevTodos.map(t =>
          t.Id === id ? updatedTodo : t
        ));
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await todoService.delete(id);
      setTodos(prevTodos => prevTodos.filter(todo => todo.Id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleUpdateTodo = async (todo: Todo) => {
    try {
      console.log('Updating todo:', todo);
      if (!todo.Id) {
        console.error('Cannot update todo: Missing ID');
        return;
      }
      const updatedTodo = await todoService.update({
        Id: todo.Id,
        Title: todo.Title,
        Description: todo.Description,
        IsCompleted: todo.IsCompleted,
        CreatedDate: todo.CreatedDate
      });
      console.log('Updated todo:', updatedTodo);
      setTodos(prevTodos => {
        const newTodos = prevTodos.map(t => t.Id === todo.Id ? updatedTodo : t);
        console.log('New todos state:', newTodos);
        return newTodos;
      });
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Todo List
        </Typography>
        <Paper elevation={3} sx={{ p: 3 }}>
          <TodoForm onSubmit={handleAddTodo} />
          <List>
            {todos.map(todo => (
              <TodoItem
                key={todo.Id}
                todo={todo}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
                onUpdate={handleUpdateTodo}
              />
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
}; 