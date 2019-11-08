import React from 'react';
import { Redirect } from 'react-router-dom';
import WrappedLoginForm from './LoginForm';
import './sign.css';

export default function Login({ isLogin, handleLoginState }) {
  return (
    <div>
      {isLogin ? (
        <Redirect to="/overview" />
      ) : (
        <WrappedLoginForm handleLoginState={handleLoginState} />
      )}
    </div>
  );
}
