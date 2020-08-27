import styled from 'styled-components';

export const Container = styled.div`
  width: 95vw;
  margin: auto;
  background-color: black;
`;

export const Tooltip = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: grey;
  top: 50vh;
  left: 50vw;
  padding: 5px;
`;

export const Divider = styled.div`
  height: 2px;
  margin: 5px 0;
  background: white;
`;
