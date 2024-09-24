import TodoForm from './_components/TodoForm';
import TodoList from './_components/TodoList';

export default function Home() {
  return (
    <main className='container mx-auto p-4 bg-white text-violet-500'>
      <h1 className='text-3xl font-bold mb-4'>Todo App</h1>
      <TodoForm />
      <TodoList />
    </main>
  );
}
