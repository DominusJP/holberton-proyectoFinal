'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../utils/api';
import { useAuth } from '../stores/user';
import { Button, Form } from 'react-bootstrap';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const router = useRouter();
  const { saveAuthTokens } = useAuth();

  const onButtonClick = async () => {
    console.log('Register clicked');
    const body = {
      username,
      email,
      password1,
      password2,
    };
    try {
      const response = await api.post('api/signup/', body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response:', response.data);
      if (response.data) {
        saveAuthTokens(response.data);
        console.log('Registration successful');
        router.push('/home');
      } else {
        console.log('No data received');
      }
    } catch (error) {
      console.log('Error:', error);
      if (error.response && error.response.data) {
        if (error.response.data.email) setEmailError(error.response.data.email);
        if (error.response.data.password1 || error.response.data.password2) {
          setPasswordError(error.response.data.password1 || error.response.data.password2);
        }
      } else {
        console.error(error.message);
      }
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">Register</h2>
        <div className="space-y-4">
          <div>
            <input
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
              placeholder="Enter your username here"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <input
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              placeholder="Enter your email here"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {emailError && <label className="text-red-500 text-sm">{emailError}</label>}
          </div>
          <div>
            <input
              value={password1}
              onChange={(ev) => setPassword1(ev.target.value)}
              type="password"
              placeholder="Enter your password here"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <input
              value={password2}
              onChange={(ev) => setPassword2(ev.target.value)}
              type="password"
              placeholder="Confirm your password here"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {passwordError && <label className="text-red-500 text-sm">{passwordError}</label>}
          </div>
          <div>
          <Button onClick={onButtonClick}  variant="success" className="py-2 px-4 rounded-md">Go to TRIBU</Button>
              
      
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
