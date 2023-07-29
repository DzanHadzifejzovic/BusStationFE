import styled from "styled-components";

export const ButtonWrapper=styled.div`
display: flex;
justify-content: center;
align-items: center;
`;

export const Header = styled.div`
display: flex;
justify-content: center;
align-items: center;

& h2{
    margin: 20px;
}
`;

export const StyledButton = styled.button`
padding: 10px 25px;
margin-bottom: 15px;
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