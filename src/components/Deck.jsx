/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

import { ManaCircle } from '../styles/deckStyles';

const propTypes = {
  deck: PropTypes.arrayOf(PropTypes.string).isRequired,
  cards: PropTypes.shape({
    name_: PropTypes.string,
  }).isRequired,
};

const Deck = ({ deck, cards }) => {
  return (
    <div style={{ width: '20vw', color: 'white' }}>
      {deck && (
        Object.keys(deck).map((card, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`${card}+${index}`}
            style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '3px' }}
          >
            <ManaCircle>
              <span style={{ textShadow: '2px 2px 2px black', marginTop: '4px' }}>
                {cards[card].pp_}
              </span>
            </ManaCircle>
            <div>
              {cards[card].name_}
            </div>
            <div>
              x{deck[card]}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

Deck.propTypes = propTypes;

export default Deck;
