
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignupPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:5000/signup', { username, password });
      const loginRes = await axios.post('http://127.0.0.1:5000/login', { username, password });
      localStorage.setItem('token', loginRes.data.token);

      alert(res.data.message);
      navigate('/rate', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4">
      <div className="bg-gray-950 border border-gray-800 shadow-2xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-violet-400 mb-6 tracking-wide">
          🕹️ Create Your Account
        </h2>

        {error && (
          <div className="bg-red-900 text-red-300 text-sm px-4 py-2 rounded-md text-center mb-4 border border-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-gradient-to-r from-pink-400 via-purple-500 to-pink-400 text-black font-bold rounded-full shadow-lg hover:from-indigo-400 hover:to-purple-400 hover:text-white transition-all duration-300 border border-transparent hover:border-white"

          >
           Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-400 mt-6">
          Already have an account?{' '}
          <span
            className="text-violet-400 hover:text-violet-300 cursor-pointer font-medium"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

