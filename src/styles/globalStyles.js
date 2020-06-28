import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
body {
  background-color: #e6e6e6;
}
`;

export const StyledDiv = styled.div`
text-align: center;
& > .spaced {
  margin-left: 10px;
  margin-right: 10px;
}
`;
