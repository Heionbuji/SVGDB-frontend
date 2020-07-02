import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StyledDiv } from '../styles/globalStyles';
import CardSearch from './CardSearch';

const Navbar = () => {
  const { t } = useTranslation();
  return (
    <StyledDiv className="nav">
      <h1 className="title">SVGDB</h1>
      <Link to="/cards" className="spaced">{t('cards')}</Link>
      <Link to="/leaders" className="spaced">{t('leaders')}</Link>
      <Link to="/sleeves" className="spaced">{t('sleeves')}</Link>
      <CardSearch />
    </StyledDiv>
  );
};

export default Navbar;
