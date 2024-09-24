import { PrismaClient } from '@prisma/client';
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from '../src/app/actions/todoActions';

// Mock the entire @prisma/client module
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    todo: {
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockPrismaClient) };
});

// Get the mocked instance of PrismaClient
const mockPrismaClient = new PrismaClient() as jest.Mocked<PrismaClient>;

describe('Todo Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a todo', async () => {
    const mockTodo = {
      id: 1,
      title: 'Test Todo',
      description: 'Test Description',
      completed: false,
    };
    mockPrismaClient.todo.create.mockResolvedValue(mockTodo);

    const formData = new FormData();
    formData.append('title', 'Test Todo');
    formData.append('description', 'Test Description');

    const result = await createTodo(formData);

    expect(mockPrismaClient.todo.create).toHaveBeenCalledWith({
      data: { title: 'Test Todo', description: 'Test Description' },
    });
    expect(result).toEqual(mockTodo);
  });

  it('should get todos', async () => {
    const mockTodos = [
      {
        id: 1,
        title: 'Todo 1',
        description: 'Description 1',
        completed: false,
      },
      { id: 2, title: 'Todo 2', description: 'Description 2', completed: true },
    ];
    mockPrismaClient.todo.findMany.mockResolvedValue(mockTodos);

    const result = await getTodos();

    expect(mockPrismaClient.todo.findMany).toHaveBeenCalled();
    expect(result).toEqual(mockTodos);
  });

  it('should update a todo', async () => {
    const mockUpdatedTodo = {
      id: 1,
      title: 'Updated Todo',
      description: 'Updated Description',
      completed: true,
    };
    mockPrismaClient.todo.update.mockResolvedValue(mockUpdatedTodo);

    const result = await updateTodo(1, true);

    expect(mockPrismaClient.todo.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { completed: true },
    });
    expect(result).toEqual(mockUpdatedTodo);
  });

  it('should delete a todo', async () => {
    const mockDeletedTodo = {
      id: 1,
      title: 'Deleted Todo',
      description: 'Deleted Description',
      completed: false,
    };
    mockPrismaClient.todo.delete.mockResolvedValue(mockDeletedTodo);

    const result = await deleteTodo(1);

    expect(mockPrismaClient.todo.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(mockDeletedTodo);
  });
});
