import styled from 'styled-components';

export const CustomButton = styled.div`
  
  & .btn {
  padding: 8px 20px;
  border-radius: 2px;
  outline: none;
  border: none;
  cursor: pointer;
  }

  & .btn--primary {
  background-color: var(--primary);
  color: #242424;
  border: 1px solid var(--primary);
  }

  & .btn--outline {
  background-color: transparent;
  color: #fff;
  padding: 8px 20px;
  border: 1px solid var(--primary);
  transition: all 0.3s ease-out;
  margin-right: 5px;
  }

  & .btn--test{
    color: blue;
    background-color: lightgray;
  }

  & .btn--small{
    padding: 6px 16px;
    font-size: 16px;
  }

  & .btn--medium {
  padding: 8px 20px;
  font-size: 18px;
  }

  & .btn--large {
  padding: 12px 26px;
  font-size: 20px;
  }

  & .btn--large:hover,
    .btn--medium:hover {
  transition: all 0.3s ease-out;
  background: #fff;
  color: #242424;
  transition: 250ms;
  }

`;

