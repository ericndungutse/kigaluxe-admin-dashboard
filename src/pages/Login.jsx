import React from 'react';
import CenteredLayout from '../components/CenteredLayout';
import Heading from '../components/Heading';
import Logo from '../components/Logo';
import ResponsiveLaout from '../components/ResponsiveLayout';
import LoginForm from '../features/authentication/LoginForm';
import PropertyImageUpload from '../components/PropertyImageUpload';

function Login() {
  return (
    <CenteredLayout>
      <Logo />
      <Heading text='Log in to your account' />
      <PropertyImageUpload />
      <ResponsiveLaout maxWidth='25rem' otherStyles='bg-white'>
        <LoginForm />
      </ResponsiveLaout>
    </CenteredLayout>
  );
}

export default Login;
