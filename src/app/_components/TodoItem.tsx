'use client';

import { useState } from 'react';
import { updateTodo, deleteTodo } from '../actions/todoActions';
import { useRouter } from 'next/navigation';

type Todo = {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
};

export default function TodoItem({ todo }: { todo: Todo }) {
  const router = useRouter();
  const [completed, setCompleted] = useState(todo.completed);

  const handleToggleComplete = async () => {
    const updatedTodo = await updateTodo(todo.id, !completed);
    setCompleted(updatedTodo.completed);
  };

  const handleDelete = async () => {
    await deleteTodo(todo.id);
    router.refresh();
    // We'll need to implement a way to remove this item from the list
    // This could be done through client-side state management or by refreshing the entire list
  };

  return (
    <li className='mb-4 p-4 border rounded'>
      <h3 className='text-xl font-bold'>{todo.title}</h3>
      <p>{todo.description}</p>
      <div className='mt-2'>
        <input
          type='checkbox'
          checked={completed}
          onChange={handleToggleComplete}
          className='mr-2'
        />
        <span>{completed ? 'Completed' : 'Incomplete'}</span>
      </div>
      <button
        onClick={handleDelete}
        className='mt-2 bg-red-500 text-white p-2 rounded'
      >
        Delete
      </button>
    </li>
  );
}
