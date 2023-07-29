import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

export const StyledHomePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  background-color: #f7f7f7;

  @media screen and (max-width: 1024px) { //576px
    //get back columns
    h1{
      text-align: center;
      font-size: 1.5rem;
    }

    img{
      width: 100px;
    }
  }


`;

// Stilizovani naslov
export const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom:1rem;
`;

export const busAnimation =keyframes`
  0% { transform: translateX(0%) }
  0% {transform:translateX(-100%)}
  50% { transform: translateX(100%) }
  100% { transform: translateX(-100%) }
`;

export const Animation = styled.img`
  width: 200px;
  height: auto;
  animation: ${busAnimation} 10s ease-in-out infinite;

`;

//DRUGI DIO

export const StyledSection = styled.section`
  width:100vw;
  padding: 1rem;
  margin: 1rem;

  /*@media screen and (max-width: 1024px){  // (max-width: 760px),(min-device-width: 768px) and (max-device-width: 1024px) { //767
     display: flex;
     justify-content: center;

    image{
      width: 100px;
      height: auto;
      max-height: 300px;
    }
    p{
      display: block;
      min-width: 60%;
      font-size: 1.5rem;
      color: #333;
    
    }
  }*/

  @media screen and (max-width: 1024px){  // (max-width: 760px),(min-device-width: 768px) and (max-device-width: 1024px) { //767

div {
display: flex;
width: 70%;
flex-direction: column;
justify-content: center;
align-items: center;
}

p {
  width: 90%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.5rem;
  color: #333;

}
};

`;

export const SectionContent = styled.div`
  display: flex;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};

  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Image = styled.img`
  width: 600px;
  height: auto;
  max-height: 500px;
`;

export const Text = styled.p`
  margin: 25px;
  font-size: 2rem;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  color: #333;
`;

// Stilizovano dugme-Link
export const Button = styled(Link)`
  display: block;
  width: 50%;
  text-align: center;
  text-decoration: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
  
  &:hover {
    background-color: #555;
  }
  @media screen and (max-width: 1024px){
    margin-left: auto;
    margin-right: auto;
   }
`;

export const Divider = styled.div`
  width: 100%;
  height:${({ street }) => (street ? '3px' : '1px')}; //1px;
  background-color: ${({ street }) => (street ? '#fff' : '#ccc')}; //#ccc;
  margin: 2rem 0;
`;