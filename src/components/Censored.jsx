import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

import { StyledContentDiv } from '../styles/globalStyles';
import LazyLoadedImage from './LazyLoadedImage';

const propTypes = {

};

const Censored = () => {
  const [cards, setCards] = useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/censored/`)
      .then((resJson) => resJson.json())
      .then((res) => setCards(res));
  }, []);
  return cards && (
    <StyledContentDiv>
      {cards.map((card) => (
        <Link to={`/cards/${card}`}>
          <LazyLoadedImage
            src={`${process.env.REACT_APP_ASSETS_URL}/thumbnails/C_${card}.png`}
            alt=""
            width={100}
            height={150}
          />
        </Link>
      ))}
    </StyledContentDiv>
  );
};

Censored.propTypes = propTypes;

export default Censored;
