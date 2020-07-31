import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StyledDiv } from '../styles/globalStyles';
import CardSearch from './CardSearch';
import Dropdown from './Dropdown';
import FlagsContainer from './FlagsContainer';

const Navbar = () => {
  const { t } = useTranslation();
  return (
    <StyledDiv className="nav">
      <h1 className="title">
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>SVGDB</Link>
        <FlagsContainer />
      </h1>
      <span className="spaced disabled">{t('cards')}</span>
      <span className="spaced disabled">{t('leaders')}</span>
      <span className="spaced"><Link to="/sleeves">{t('sleeves')}</Link></span>
      <Dropdown
        text={t('tournaments')}
        choices={[{ title: `JCG (${t('rotation')})`, linkTo: '/jcg/rotation' }, { title: `JCG (${t('unlimited')})`, linkTo: '/jcg/unlimited' }]}
      />
      <CardSearch />
      <span style={{ float: 'right', paddingRight: '20px', color: '#121212' }}>
        <a target="_blank" href="https://github.com/Heionbuji/SVGDB-frontend" rel="noopener noreferrer">GitHub</a>
      </span>
    </StyledDiv>
  );
};

export default Navbar;
