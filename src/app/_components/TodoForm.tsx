'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createTodo } from '../actions/todoActions';
import { useRouter } from 'next/navigation';

const TodoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
});

type TodoFormData = z.infer<typeof TodoSchema>;

export default function TodoForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormData>({
    resolver: zodResolver(TodoSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: TodoFormData) => {
    await createTodo(
      new FormData(document.getElementById('todo-form') as HTMLFormElement)
    );
    router.refresh();
    reset();
  };

  return (
    <form id='todo-form' onSubmit={handleSubmit(onSubmit)} className='mb-4'>
      <div className='mb-4'>
        <label htmlFor='title' className='block mb-2'>
          Title
        </label>
        <input
          {...register('title')}
          id='title'
          name='title'
          type='text'
          className='w-full p-2 border rounded'
        />
        {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
      </div>
      <div className='mb-4'>
        <label htmlFor='description' className='block mb-2'>
          Description
        </label>
        <textarea
          {...register('description')}
          id='description'
          name='description'
          className='w-full p-2 border rounded'
        />
      </div>
      <button type='submit' className='bg-blue-500 text-white p-2 rounded'>
        Add Todo
      </button>
    </form>
  );
}
