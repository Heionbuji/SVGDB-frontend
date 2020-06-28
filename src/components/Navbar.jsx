import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StyledDiv } from '../styles/globalStyles';
import CardSearch from './CardSearch';

const Navbar = () => {
  return (
    <StyledDiv>
      <h1>SVDB</h1>
      <Link to="/cards" className="spaced">Cards</Link>
      <Link to="/leaders" className="spaced">Leaders</Link>
      <Link to="/sleeves" className="spaced">Sleeves</Link>
      <CardSearch />
    </StyledDiv>
  );
};

export default Navbar;
