import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StyledDiv } from '../styles/globalStyles';
import CardSearch from './CardSearch';
import Dropdown from './Dropdown';
import FlagsContainer from './FlagsContainer';
import styled from 'styled-components';

const PatreonButton = styled.img`
  width: 100px;
  height: auto;
  margin-bottom: -7px;

  @media screen and (max-width: 400px) {
    margin-bottom: 0;
  }
  `;

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
        <a href="https://www.patreon.com/svgdb" target="_blank" rel="noopener noreferrer">
          <PatreonButton className="patreonButton" alt="" src="data:image/jpeg;base64,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" />
        </a>
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
