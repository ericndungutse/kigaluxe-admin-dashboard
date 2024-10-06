import React from 'react';
import Logo from '../components/Logo';
import LoginForm from '../features/authentication/LoginForm';
import Heading from '../components/Heading';
import CenteredLayout from '../components/CenteredLayout';
import ResponsiveLaout from '../components/ResponsiveLayout';

function Login() {
  return (
    <CenteredLayout>
      <Logo />
      <Heading text='Log in to your account' />

      <ResponsiveLaout maxWidth='25rem' otherStyles='bg-white'>
        <LoginForm />
      </ResponsiveLaout>
    </CenteredLayout>
  );
}

export default Login;
