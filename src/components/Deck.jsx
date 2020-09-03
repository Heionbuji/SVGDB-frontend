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

const Deck = ({ deck, cards }) => (
  <div style={{ width: '20vw', color: 'white' }}>
    {deck && (
      Object.keys(deck)
        .sort((a, b) => {
          if (cards[a].pp_ === cards[b].pp_) {
            let iter = 1;
            while (cards[a].name_.substring(0, iter) === cards[b].name_.substring(0, iter)) {
              if (iter > cards[a].name_.length) { break; }
              iter += 1;
            }
            return (
              cards[a].name_.substring(iter - 1, iter) > cards[b].name_.substring(iter - 1, iter)
            );
          }
          return (cards[a].pp_ > cards[b].pp_);
        })
        .map((card, index) => (
          <div
              // eslint-disable-next-line react/no-array-index-key
            key={`${card}+${index}`}
            className="loghover"
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              paddingTop: '3px',
              background: `url(${process.env.REACT_APP_ASSETS_URL}/thumbnails/log_${card}0.png)`,
              backgroundSize: '256px 42px',
              width: '256px',
              height: '32px',
              marginTop: '8px',
            }}
          >
            <ManaCircle>
              <span style={{ textShadow: '2px 2px 2px black', marginTop: '4px' }}>
                {cards[card].pp_}
              </span>
            </ManaCircle>
            <div style={{ marginTop: '4px', padding: '0 5px' }}>
              {deck[card]}x
            </div>
            <div style={{
              marginTop: '4px',
              overflow: 'hidden',
              textShadow: '1px 0px 2px #993366, -1px 0px 2px #993366, 0 1px 2px #993366, 0 -1px 2px #993366',
            }}
            >
              {cards[card].name_}
            </div>
          </div>
        ))
    )}
  </div>
);

Deck.propTypes = propTypes;

export default Deck;
