import TodoList from '@/app/_components/TodoList';
import { render, screen } from '@testing-library/react';

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    todo: {
      findMany: jest.fn().mockResolvedValue([
        {
          id: 1,
          title: 'Todo 1',
          description: 'Description 1',
          completed: false,
        },
        {
          id: 2,
          title: 'Todo 2',
          description: 'Description 2',
          completed: true,
        },
      ]),
    },
  })),
}));

jest.mock('../src/app/_components/TodoItem', () => {
  return {
    __esModule: true,
    default: ({
      todo,
    }: {
      todo: {
        id: number;
        title: string;
        description: string;
        completed: boolean;
      };
    }) => (
      <li data-testid={`todo-item-${todo.id}`}>
        {todo.title} - {todo.completed ? 'Completed' : 'Incomplete'}
      </li>
    ),
  };
});

describe('TodoList', () => {
  it('renders todos fetched from the server', async () => {
    render(await TodoList());

    const todoItem1 = screen.getByTestId('todo-item-1');
    const todoItem2 = screen.getByTestId('todo-item-2');

    expect(todoItem1).toHaveTextContent('Todo 1 - Incomplete');
    expect(todoItem2).toHaveTextContent('Todo 2 - Completed');
  });
});
