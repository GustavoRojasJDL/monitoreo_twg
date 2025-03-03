"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { generateAuthToken, isAuthTokenValid } from '../utils/auth';
import logo from '../../../public/logo_TWG.png';
import Imagen from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [users, setUsers] = useState<{ email: string, password: string }[]>([]);

  useEffect(() => {
    if (isAuthTokenValid()) {
      router.push('/dashboard');
    }
  }, [router]);

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(response => response.json())
      .then(data => { setUsers(data) });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const user = users.find((user: { email: string; password: string; }) => user.email === email && user.password === password);
    if (user) {
      generateAuthToken();
      console.log('Login successful');
      router.push('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-80">
      <div className="flex items-center justify-center min-h-[10vh]">
        <Imagen src={logo} alt="Logo" className="w-24 h-auto" />
      </div>
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Login</h2>
      <div className="mb-6">
        <label className="block mb-2 text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">Login</button>
    </form>
  );
}
