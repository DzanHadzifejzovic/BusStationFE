import React from 'react';
import { Label, Wrapper } from '../components/Login/Login.styles';
import LoginForm from '../components/Login/LoginForm';

const LoginPage = () => {
  return (
    <>
      <Wrapper>
        <Label> Please, login first</Label>
      </Wrapper>
      <LoginForm></LoginForm>
    </>
    
  );
};

export default LoginPage;
