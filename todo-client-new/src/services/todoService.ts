import axios from 'axios';
import { Todo } from '../types/todo';

const API_URL = 'http://localhost:5093/api/Todo';

export const todoService = {
  getAll: async (): Promise<Todo[]> => {
    const response = await axios.get(API_URL);
    console.log('Get all todos response:', response.data);
    // Ensure the data is in the correct format
    return response.data.map((todo: any) => ({
      Id: todo.id || todo.Id,
      Title: todo.title || todo.Title || '',
      Description: todo.description || todo.Description || '',
      IsCompleted: todo.isCompleted || todo.IsCompleted || false,
      CreatedDate: todo.createdDate || todo.CreatedDate || new Date().toISOString()
    }));
  },

  create: async (title: string, description: string): Promise<Todo> => {
    const response = await axios.post(API_URL, { 
      Title: title, 
      Description: description, 
      IsCompleted: false,
      CreatedDate: new Date().toISOString()
    });
    console.log('Create todo response:', response.data);
    return {
      Id: response.data.id || response.data.Id,
      Title: response.data.title || response.data.Title || '',
      Description: response.data.description || response.data.Description || '',
      IsCompleted: response.data.isCompleted || response.data.IsCompleted || false,
      CreatedDate: response.data.createdDate || response.data.CreatedDate || new Date().toISOString()
    };
  },

  update: async (todo: Todo): Promise<Todo> => {
    console.log('Updating todo:', todo);
    if (!todo.Id) {
      console.error('Todo object:', todo);
      throw new Error('Todo ID is required for update');
    }
    const response = await axios.put(`${API_URL}/${todo.Id}`, {
      Id: todo.Id,
      Title: todo.Title,
      Description: todo.Description,
      IsCompleted: todo.IsCompleted,
      CreatedDate: todo.CreatedDate
    });
    console.log('Update todo response:', response.data);
    return {
      Id: response.data.id || response.data.Id,
      Title: response.data.title || response.data.Title || '',
      Description: response.data.description || response.data.Description || '',
      IsCompleted: response.data.isCompleted || response.data.IsCompleted || false,
      CreatedDate: response.data.createdDate || response.data.CreatedDate || new Date().toISOString()
    };
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  }
}; 