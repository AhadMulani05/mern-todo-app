import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import TodoItem from '../components/TodoItem';
import TodoForm from '../components/TodoForm';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await API.get('/todos');
        setTodos(res.data);
      } catch {
        navigate('/login');
      }
    };
    fetchTodos();
  }, [navigate]);

  const addTodo = async (text) => {
    const res = await API.post('/todos', { text });
    setTodos([...todos, res.data]);
  };

  const updateTodo = async (id, updated) => {
    const res = await API.put(`/todos/${id}`, updated);
    setTodos(todos.map(t => (t._id === id ? res.data : t)));
  };

  const deleteTodo = async (id) => {
    await API.delete(`/todos/${id}`);
    setTodos(todos.filter(t => t._id !== id));
  };

  return (
    <>
      <div className="todo-wrapper">
        <div className="todo-box">
          <h2>🌟 Your To-Do List</h2>
          <TodoForm addTodo={addTodo} />
          <div className="todo-list">
            {todos.map(todo => (
              <TodoItem
                key={todo._id}
                todo={todo}
                updateTodo={updateTodo}
                deleteTodo={deleteTodo}
              />
            ))}
          </div>
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/login');
            }}
          >
            🔒 Logout
          </button>
        </div>
        <p className="copyright">© 2025 Created by Ahad Mulani</p>
      </div>
    </>
  );
}