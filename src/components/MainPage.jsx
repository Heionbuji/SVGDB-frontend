import React from 'react';
import News from './News';
import { StyledContentDiv } from '../styles/globalStyles';

const MainPage = () => (
  <StyledContentDiv style={{ textAlign: 'left' }}>
    <News />
  </StyledContentDiv>
);

export default MainPage;
