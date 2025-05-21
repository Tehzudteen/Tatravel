'use client';

export default function TodoItem({ todo, onToggleComplete, onDelete }) {
  return (
    <div className={`p-4 border rounded-lg shadow-sm flex justify-between items-center ${todo.isCompleted ? 'bg-green-50' : 'bg-white'}`}>
      <div>
        <h3 className={`text-lg font-semibold ${todo.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
          {todo.title}
        </h3>
        {todo.description && (
          <p className={`text-sm ${todo.isCompleted ? 'line-through text-gray-400' : 'text-gray-600'}`}>
            {todo.description}
          </p>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onToggleComplete(todo.id)}
          className={`px-3 py-1 rounded-md text-sm font-medium
            ${todo.isCompleted 
              ? 'bg-yellow-400 hover:bg-yellow-500 text-white' 
              : 'bg-green-500 hover:bg-green-600 text-white'}`}
        >
          {todo.isCompleted ? 'Undo' : 'Complete'}
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
