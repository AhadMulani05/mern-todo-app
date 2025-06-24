import { useState } from 'react';

export default function TodoItem({ todo, updateTodo, deleteTodo }) {
  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleSave = () => {
    updateTodo(todo._id, { text });
    setEditMode(false);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'done' : ''}`}>
      {editMode ? (
        <>
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            className="edit-input"
          />
          <button className="save-btn" onClick={handleSave}>💾</button>
        </>
      ) : (
        <>
          <span className="todo-text">{todo.text}</span>
          <div className="todo-actions">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => updateTodo(todo._id, { completed: !todo.completed })}
            />
            <button onClick={() => setEditMode(true)}>✏️</button>
            <button onClick={() => deleteTodo(todo._id)}>🗑️</button>
          </div>
        </>
      )}
    </div>
  );
}
