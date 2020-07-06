import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StyledDiv } from '../styles/globalStyles';
import CardSearch from './CardSearch';

const Navbar = () => {
  const { t } = useTranslation();
  return (
    <StyledDiv className="nav">
      <h1 className="title"><Link to="/" style={{ textDecoration: 'none', color: 'white' }}>SVGDB</Link></h1>
      <span className="spaced disabled">{t('cards')}</span>
      <span className="spaced disabled">{t('leaders')}</span>
      <span className="spaced disabled">{t('sleeves')}</span>
      <CardSearch />
    </StyledDiv>
  );
};

export default Navbar;
