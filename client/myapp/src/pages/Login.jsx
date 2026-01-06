import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { Lock, User, Activity } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/users/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-10 border border-slate-100 text-center">
        <div className="bg-blue-600 p-4 rounded-2xl mb-4 shadow-lg shadow-blue-100 text-white w-fit mx-auto">
          <Activity size={32} />
        </div>
        <h2 className="text-3xl font-black text-slate-800">Welcome Back</h2>
        <p className="text-slate-400 font-medium mb-8">Login to your Health Wallet</p>
        
        <form onSubmit={handleLogin} className="space-y-5 text-left">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" placeholder="Username" 
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
              onChange={(e) => setFormData({...formData, username: e.target.value})} required 
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="password" placeholder="Password" 
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
              onChange={(e) => setFormData({...formData, password: e.target.value})} required 
            />
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-[24px] shadow-xl active:scale-95 transition-all">
            Sign In
          </button>
        </form>
        <p className="mt-8 text-slate-500 font-medium">
          New here? <Link to="/register" className="text-green-600 font-black hover:underline">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;