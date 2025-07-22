import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from './Background';
import { Lock, ArrowRight } from 'lucide-react';

// IMPORTANT: Replace 'your_secret_password' with your actual password
const CORRECT_PASSWORD = 'Sajud@1234';

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem('isAuthenticated', 'true');
      navigate('/files');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <Background />
      <div className="relative z-10 max-w-md w-full bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl text-center">
        <Lock size={48} className="mx-auto text-purple-400 mb-6" />
        <h1 className="text-3xl font-bold mb-4">Admin Access</h1>
        <p className="text-gray-400 mb-8">Please enter the password to view protected files.</p>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
          />
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          <button
            type="submit"
            className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            Login <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;