import styled, { keyframes } from 'styled-components';

export const ForegroundDiv = styled.div`
  position: relative;
  display: flex;
  background-color: #141414;
  z-index: 100;
  width: 100vw;
  height: 100vh;

  @media screen and (max-aspect-ratio: 4/3) {
    flex-direction: column;
  }

  ${(props) => !props.fullscreen && `
    canvas {
      width: 50vw;
      height: 50vw;
    }`}


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
  padding: 0 ${(props) => (props.fullscreen ? '0' : '100px')};
  @media only screen and (max-width: 1200px) {
    padding: 0;
  }
`;

export const ResponsiveButton = styled.button`
  min-width: 100px;
  width: 10vw;
  margin: 5px;
  color: white;
  padding: 20px;
  border: 0;
  background-color: rgb(31, 52, 71);
  outline: none;
  cursor: pointer;
  @media only screen and (max-width: 1330px) {
    padding: 10px;
  }
  @media only screen and (max-width: 1500px) {
    
    padding: 10px;
  }
`;

const FadeIn = keyframes`
  0% { opacity: 0%; margin-top: 20px; }
  100% { opacity: 100%; margin-top: 0px; }
`;

export const FadingDiv = styled.div`
  animation-name: ${FadeIn};
  animation-duration: 0.5s;
  background-color: black;
  background-blend-mode: lighten;
`;

export const ColorPickerContainer = styled.div`
  position: absolute;
  top: ${(props) => (props.mobile ? '50px' : '-230px')};
`;
