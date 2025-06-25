import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../api';
import Footer from '../../components/Footer'; // ✅ import Footer

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/todos');
    } catch {
      alert('Invalid credentials');
    }
  };

  return (
    <>
      <div className="auth-container">
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>Don’t have an account? <Link to="/">Sign up here</Link></p>
      </div>

      {/* ✅ Footer below the login box */}
      <Footer />
    </>
  );
}
