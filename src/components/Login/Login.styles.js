import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

`;

export const Label = styled.label`
  display: inline;
  font-size: 30px;
  font-weight: bold;
  margin: 30px;
  width: 250px;

  @media screen and (max-width: 600px){
    width: 200px;
  }
`;

export const ContentOfForm = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 & label{
  padding: 5px;
  margin: 5px;
  min-width: 50%;
 }
 & input{
  display: block;
  min-width: 30%;
  padding: 5px;
  margin: 5px;
 }

`;