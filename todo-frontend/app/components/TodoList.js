'use client';

import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import { API_BASE_URL } from '../config'; // Import API_BASE_URL

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/todos`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTodos(data);
      } catch (e) {
        console.error('Failed to fetch todos:', e);
        setError('Failed to load todos. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    const newTodoData = {
      title: newTodoTitle,
      description: newTodoDescription,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodoData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const addedTodo = await response.json();
      setTodos([...todos, addedTodo]); // Optimistically add or re-fetch
      setNewTodoTitle('');
      setNewTodoDescription('');
    } catch (e) {
      console.error('Failed to add todo:', e);
      setError('Failed to add todo. Please try again.');
    }
  };

  const handleToggleComplete = async (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const updatedTodoData = {
      ...todo, // Send other properties if your backend expects them or partial update is fine
      isCompleted: !todo.isCompleted,
    };
     // Ensure only relevant fields for update are sent if backend doesn't ignore others
    const payload = { isCompleted: updatedTodoData.isCompleted, title: updatedTodoData.title, description: updatedTodoData.description };


    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedTodo = await response.json();
      setTodos(
        todos.map(t => (t.id === id ? updatedTodo : t))
      );
    } catch (e) {
      console.error('Failed to toggle todo:', e);
      setError('Failed to update todo. Please try again.');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        // If the server returns a 404, it means the todo was already deleted.
        // We can choose to remove it from the local state or handle as an error.
        if (response.status === 404) {
          console.warn(`Todo with id ${id} not found on server, removing locally.`);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (e) {
      console.error('Failed to delete todo:', e);
      setError('Failed to delete todo. Please try again.');
    }
  };

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading todos...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">My Todos</h1>

      {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}

      <form onSubmit={handleAddTodo} className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Todo</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-600 mb-1">Title</label>
          <input
            type="text"
            id="title"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="Enter todo title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-1">Description (Optional)</label>
          <textarea
            id="description"
            value={newTodoDescription}
            onChange={(e) => setNewTodoDescription(e.target.value)}
            placeholder="Enter todo description"
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium"
        >
          Add Todo
        </button>
      </form>

      <div className="space-y-4">
        {todos.length > 0 ? (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTodo}
            />
          ))
        ) : (
          !isLoading && !error && <p className="text-center text-gray-500">No todos yet. Add one above!</p>
        )}
      </div>
    </div>
  );
}
