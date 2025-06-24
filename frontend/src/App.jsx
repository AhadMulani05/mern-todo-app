import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import TodoApp from './pages/TodoApp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todos" element={<TodoApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
