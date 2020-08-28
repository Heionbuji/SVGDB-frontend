/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import LazyLoadedImage from './LazyLoadedImage';
import { Container, Tooltip, Divider } from '../styles/deckbuilderStyles';

const propTypes = {
  t: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    language: PropTypes.string,
  }).isRequired,
};

const Deckbuilder = ({ t, i18n }) => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [cardsJson, setCardsJson] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const thumbnailUrl = `${process.env.REACT_APP_ASSETS_URL}/thumbnails/C_`;
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/${i18n.language}`)
      .then((res) => res.json())
      .then((resJson) => setCardsJson(resJson));
  }, [i18n.language]);

  const updateTooltip = (e, id) => {
    const card = cardsJson[id];
    setTooltip(
      <Tooltip style={{ left: e.target.x + e.target.width + 10, top: e.target.y }}>
        <b>{card.name_}</b>
        <span>{card.craft_} {card.pp_}pp {card.rarity_} {card.type_} {card.trait_ !== '-' ? `(${card.trait_})` : ''}</span>
        <span>Expansion: {card.expansion_}</span>
        <span>Rotation: {card.rotation_.toString()}</span>
        <Divider />
        <span>Base:</span>
        <span style={{ paddingLeft: '10px' }}>{card.baseEffect_}</span>
        {card.type_ === 'Follower' && (
          <>
            <span>Evo:</span>
            <span style={{ paddingLeft: '10px' }}>{card.evoEffect_}</span>
          </>
        )}
      </Tooltip>,
    );
    setTooltipVisible(true);
  };

  return (
    <Container>
      <div style={{ backgroundColor: '#555' }}>
        <span>Select class:</span>
        <span>
          <button type="button" onClick={() => setSelectedClass('1')}>Forest</button>
          <button type="button" onClick={() => setSelectedClass('2')}>Sword</button>
          <button type="button" onClick={() => setSelectedClass('3')}>Rune</button>
          <button type="button" onClick={() => setSelectedClass('4')}>Dragon</button>
          <button type="button" onClick={() => setSelectedClass('5')}>Shadow</button>
          <button type="button" onClick={() => setSelectedClass('6')}>Blood</button>
          <button type="button" onClick={() => setSelectedClass('7')}>Haven</button>
          <button type="button" onClick={() => setSelectedClass('8')}>Portal</button>
        </span>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1', margin: '20px' }}>
          {cardsJson && selectedClass && Object.keys(cardsJson).filter((item) => {
            const id = cardsJson[item].id_.toString();
            return (
              id.substring(3, 4) === selectedClass
              && id.substring(0, 1) !== '9'
              && id.substring(0, 1) !== '7'
            );
          })
            .sort((a, b) => cardsJson[a].pp_ > cardsJson[b].pp_)
            .map((key) => (
              <span key={`div${key}`} onMouseEnter={(e) => updateTooltip(e, key)} className="cardhover">
                <LazyLoadedImage
                  key={`img${key}`}
                  src={`${thumbnailUrl}${key}.png`}
                  alt=""
                />
              </span>
            ))}
        </div>
        <div style={{ width: '20vw', color: 'white' }}>
          Deck and stuff
        </div>
        {tooltipVisible && (tooltip)}
      </div>
    </Container>
  );
};

Deckbuilder.propTypes = propTypes;

export default withTranslation()(Deckbuilder);
