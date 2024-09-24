import TodoItem from './TodoItem';
import { getTodos } from '../actions/todoActions';

const TodoList = async () => {
  const todos = await getTodos();

  return (
    <ul className='space-y-4'>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
