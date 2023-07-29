import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Label = styled.label`
  display: flex;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
  margin: 30px;

  @media screen and (max-width: 600px){
    width: 200px;
  }
`

export const LabelValidation = styled.label`
  display: flex;
  justify-content: center;
  color: red;
  font-weight: 200;
`