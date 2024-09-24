import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createTodo } from '../src/app/actions/todoActions';
import TodoForm from '@/app/_components/TodoForm';

jest.mock('../src/app/actions/todoActions', () => ({
  createTodo: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: jest.fn(),
  }),
}));

describe('TodoForm', () => {
  it('renders form fields correctly', () => {
    render(<TodoForm />);

    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Add Todo' })
    ).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    (createTodo as jest.Mock).mockResolvedValue({
      id: 1,
      title: 'New Todo',
      description: 'New Description',
      completed: false,
    });

    render(<TodoForm />);

    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'New Todo' },
    });
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'New Description' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add Todo' }));

    await waitFor(() => {
      expect(createTodo).toHaveBeenCalled();
    });

    expect(screen.getByLabelText('Title')).toHaveValue('');
    expect(screen.getByLabelText('Description')).toHaveValue('');
  });

  it('displays error for empty title', async () => {
    render(<TodoForm />);

    fireEvent.click(screen.getByRole('button', { name: 'Add Todo' }));

    expect(await screen.findByText('Title is required')).toBeInTheDocument();
  });
});
