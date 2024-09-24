import { PrismaClient } from '@prisma/client';
import TodoItem from './TodoItem';

const prisma = new PrismaClient();

export default async function TodoList() {
  const todos = await prisma.todo.findMany();

  return (
    <ul className='space-y-4'>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
