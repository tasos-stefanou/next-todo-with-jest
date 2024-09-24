'use server';

import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const TodoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
});

export async function createTodo(formData: FormData) {
  const { title, description } = TodoSchema.parse({
    title: formData.get('title'),
    description: formData.get('description'),
  });

  return prisma.todo.create({
    data: { title, description },
  });
}

export async function getTodos() {
  return prisma.todo.findMany();
}

export async function updateTodo(id: number, completed: boolean) {
  return prisma.todo.update({
    where: { id },
    data: { completed },
  });
}

export async function deleteTodo(id: number) {
  return prisma.todo.delete({
    where: { id },
  });
}
