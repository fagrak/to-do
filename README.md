# Todo List Application

A full-stack Todo List application built with React and .NET Core.

## Features

- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Edit todo details
- Responsive design with Material-UI

## Tech Stack

### Frontend
- React
- TypeScript
- Material-UI
- Axios for API calls

### Backend
- .NET Core
- Entity Framework Core
- SQL Server

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- .NET Core SDK (v6.0 or higher)
- SQL Server

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/todo-list.git
```

2. Install frontend dependencies
```bash
cd todo-client-new
npm install
```

3. Install backend dependencies
```bash
cd ../TodoListApi
dotnet restore
```

4. Update the database connection string in `appsettings.json`

5. Run database migrations
```bash
dotnet ef database update
```

### Running the Application

1. Start the backend server
```bash
cd TodoListApi
dotnet run
```

2. Start the frontend development server
```bash
cd todo-client-new
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5093

## API Endpoints

- GET /api/Todo - Get all todos
- GET /api/Todo/{id} - Get a specific todo
- POST /api/Todo - Create a new todo
- PUT /api/Todo/{id} - Update a todo
- DELETE /api/Todo/{id} - Delete a todo

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 