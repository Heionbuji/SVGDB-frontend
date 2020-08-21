import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import LazyLoadedImage from './LazyLoadedImage';
import { Container } from '../styles/deckbuilderStyles';

const propTypes = {
  t: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    language: PropTypes.string,
  }).isRequired,
};

const Deckbuilder = ({ t, i18n }) => {
  const [selectedClass, setSelectedClass] = useState(1);
  const [cardsJson, setCardsJson] = useState(null);
  const thumbnailUrl = `${process.env.REACT_APP_ASSETS_URL}/thumbnails/C_`;
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/${i18n.language}`)
      .then((res) => res.json())
      .then((resJson) => setCardsJson(resJson));
  }, []);
  return (
    <Container>
      <div style={{ backgroundColor: '#555' }}>
        Select class:
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1', margin: '20px' }}>
          {cardsJson && Object.keys(cardsJson).map((key) => (
            <LazyLoadedImage src={`${thumbnailUrl}${key}.png`} alt="" />
          ))}
        </div>
        <div style={{ width: '400px', color: 'white' }}>
          Deck and stuff
        </div>
      </div>
    </Container>
  );
};

Deckbuilder.propTypes = propTypes;

export default withTranslation()(Deckbuilder);
