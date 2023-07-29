import React from 'react';
import { Label, Wrapper } from './Login.styles';
import LoginForm from './LoginForm';

const Login = () => {
  return (
    <>
      <Wrapper>
        <Label> Please, login first</Label>
      </Wrapper>
      <LoginForm></LoginForm>
    </>
    
  );
};

export default Login;
