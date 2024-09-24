'use server';

import { PrismaClient, Todo } from '@prisma/client';

const prisma = new PrismaClient();

export async function createTodo(data: Partial<Todo>) {
  const { title, description } = data;

  if (!title) {
    throw new Error('Title is required');
  }

  try {
    const newTodo = await prisma.todo.create({
      data: { title, description },
    });
    return newTodo;
  } catch (error) {
    console.error('[CREATE_TODO_ERROR]', error);
    throw error;
  }
}

export async function getTodos() {
  try {
    const todos = await prisma.todo.findMany();
    return todos;
  } catch (error) {
    console.error('[GET_TODOS_ERROR]', error);
    throw error;
  }
}

export async function updateTodo(id: number, completed: boolean) {
  try {
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { completed },
    });
    return updatedTodo;
  } catch (error) {
    console.error('[UPDATE_TODO_ERROR]', error);
    throw error;
  }
}

export async function deleteTodo(id: number) {
  try {
    const deletedTodo = await prisma.todo.delete({
      where: { id },
    });
    return deletedTodo;
  } catch (error) {
    console.error('[DELETE_TODO_ERROR]', error);
    throw error;
  }
}
