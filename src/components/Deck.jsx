/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

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
        // eslint-disable-next-line react/no-array-index-key
        Object.keys(deck).map((card, index) => <p key={`${card}+${index}`}>{`${cards[card].pp_} ${cards[card].name_} x${deck[card]}`}</p>)
      )}
    </div>
  );
};

Deck.propTypes = propTypes;

export default Deck;
