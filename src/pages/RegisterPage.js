import React from 'react';
import { Label, Wrapper } from '../components/Register/Register.styles';
import Button from '../components/Button';
import RegisterForm from '../components/Register/RegisterForm';


const RegisterPage = () => {
  return (
    <>
      <Wrapper>
        <Label> Please, register first </Label>
        <Button location='/register-page'></Button>
      </Wrapper>
      <RegisterForm></RegisterForm>
    </>
    
  );
};

export default RegisterPage;
