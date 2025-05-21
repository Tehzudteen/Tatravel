'use client'; // Required for components with useState and event handlers

import TodoList from './components/TodoList'; // Corrected path assuming components are in app/components

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 sm:p-8 md:p-12 lg:p-24 bg-gray-50">
      <div className="w-full max-w-3xl">
        <TodoList />
      </div>
    </main>
  );
}
