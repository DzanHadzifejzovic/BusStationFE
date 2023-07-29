import styled from "styled-components";

export const FormContainer = styled.form`
  max-width: 400px;
  margin: 0 auto;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const ErrorMsg = styled.div`
  color: #ff0000;
  font-size: 14px;
  margin-top: 5px;
`;

export const StyledButton = styled.button`
padding: 10px 20px;
font-size: 16px;
background-color: #007bff;
color: #fff;
border: none;
border-radius: 5px;
cursor: pointer;
transition: background-color 0.3s ease;

&:hover {
  background-color: #0056b3;
}

&:focus {
  outline: none;
}
`;
