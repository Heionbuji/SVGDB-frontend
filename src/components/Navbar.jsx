import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StyledDiv } from '../styles/globalStyles';
import CardSearch from './CardSearch';
import Dropdown from './Dropdown';
import FlagsContainer from './FlagsContainer';

const Navbar = () => {
  const { t } = useTranslation();
  const path = useLocation();
  return (
    <>
      <StyledDiv className="nav">
        <h1 className="title">
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>SVGDB</Link>
          <FlagsContainer />
        </h1>
        <span className="spaced"><Link to="/deckbuilder">{t('deckbuilder')}</Link></span>
        <span className="spaced"><Link to="/carddatabase">{t('Cards')}</Link></span>
        <span className="spaced"><Link to="/leaders">{t('leaders')}</Link></span>
        <Dropdown
          type="nav"
          text={t('resources')}
          choices={
            [
              { title: t('sleeves'), linkTo: '/resources/sleeves' },
              { title: t('backgrounds'), linkTo: '/resources/bgs' },
              { title: t('emblems'), linkTo: '/resources/emblems' },
              { title: t('flairs'), linkTo: '/resources/flairs' },
              { title: t('censored'), linkTo: '/resources/censored' },
            ]
          }
        />
        <Dropdown
          type="nav"
          text={t('tournaments')}
          choices={[{ title: `JCG (${t('rotation')})`, linkTo: '/jcg/rotation' }, { title: `JCG (${t('unlimited')})`, linkTo: '/jcg/unlimited' }]}
        />
        <CardSearch />
      </StyledDiv>
    </>
  );
};

export default Navbar;
