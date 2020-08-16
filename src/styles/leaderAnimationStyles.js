import styled from 'styled-components';

export const ForegroundDiv = styled.div`
  display: flex;
  background-color: #141414;
  z-index: 100;
  width: 75vw;
  min-height: 75vh;
  margin: auto;
  margin-top: 100px;
  @media only screen and (max-width: 1330px) {
    margin-top: 0;
    flex-direction: column;
  }
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

export const StyledDiv = styled.div`
  padding: 50px 100px;
  @media only screen and (max-width: 1200px) {
    padding: 0;
  }
`;

export const ResponsiveButton = styled.button`
  width: 200px;
  margin: 5px;
  color: white;
  padding: 20px;
  border: 0;
  background-color: rgb(31, 52, 71);
  outline: none;
  cursor: pointer;
  @media only screen and (max-width: 1330px) {
    width: 100px;
    padding: 10px;
  }
  @media only screen and (max-width: 1500px) {
    width: 100px;
    padding: 10px;
  }
`;

export const CloseButton = styled.button`
  color: white;
  padding: 20px;
  border: 0;
  background-color: rgb(31, 52, 71);
  outline: none;
  cursor: pointer;
  align-self: flex-end;
  margin: 0 50px 50px 0;
`;
