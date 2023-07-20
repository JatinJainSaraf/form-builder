"use client"
import { useState } from 'react';
import {useRouter} from 'next/navigation';
const SignInComponent = () => {
  const router = useRouter()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSignIn = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const responseJson = await response.json();
      sessionStorage.setItem('userDetails', JSON.stringify(responseJson));
      if (responseJson.role === 'Admin') {
        window.location.href = "/form-builder"
      } else {
        window.location.href = "/fill-form"
      }
      console.log('Sign-in successful!');
    } else {
      console.error('Sign-in failed');
    }
  };
  return (
    <form className="max-w-md mx-auto mt-8 p-4 shadow-md rounded" onSubmit={handleSignIn}>
      <div className="mb-4">
        <label className="block font-bold">
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block font-bold">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none"
          />
        </label>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign In
      </button>
    </form>
  );
};
  

export default SignInComponent;
