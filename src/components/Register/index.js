import React from 'react';
import { Label, Wrapper } from './Register.styles';
import Button from '../Button';
import RegisterForm from './RegisterForm';


const Register = () => {
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

export default Register;
