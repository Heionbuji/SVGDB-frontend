import styled from 'styled-components';

export const ForegroundDiv = styled.div`
  display: flex;
  background-color: #141414;
  z-index: 100;
  width: 75vw;
  min-height: 75vh;
  margin: auto;
  margin-top: 100px;
`;

export const DimBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 99.1vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
`;

export const StyledButton = styled.button`
  border: 0;
  margin: 0;
  padding: 20px;
  background-color: #102080;
  color: white;
`;
