import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

// Stilizovani komponente
export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const Heading = styled.h2`
  font-size: 28px;
  margin-bottom: 10px;
`;

export const DetailItem = styled.div`
  margin-bottom: 10px;
`;

export const DetailLabel = styled.span`
  font-weight: bold;
`;

export const DetailValue = styled.span`
  margin-left: 5px;
`;

export const ErrorMessage = styled.p`
  color: red;
`;

export const LoadingMessage = styled.p`
  color: gray;
`;

export const StyledButton = styled.button`
  background-color: ${props => (props.danger ? '#ff483d' : '#258ecd')};
  margin: 0 auto;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${props => (props.danger ? '#ff481d' : '#256ecd')};
  }
`;

export const TrashIcon = styled(FontAwesomeIcon)`
  margin-right: 8px;
`;

export const EditIcon = styled(FontAwesomeIcon)`
margin-right: 8px;
`;