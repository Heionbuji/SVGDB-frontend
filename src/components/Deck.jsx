/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

import { ManaCircle } from '../styles/deckStyles';
import { Tooltip, Divider } from '../styles/deckbuilderStyles';

const propTypes = {
  deck: PropTypes.arrayOf(PropTypes.string).isRequired,
  setDeck: PropTypes.func.isRequired,
  cards: PropTypes.shape({
    name_: PropTypes.string,
  }).isRequired,
  setTooltip: PropTypes.func.isRequired,
};

// eslint-disable-next-line object-curly-newline
const Deck = ({ deck, setDeck, cards, setTooltip }) => {
  const updateTooltip = (e, id) => {
    const card = cards[id];
    setTooltip(
      <Tooltip style={{ left: e.clientX + 20, top: e.clientY + window.scrollY - 100 }}>
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
  };

  const removeFromDeck = (card) => {
    if (deck[card] === 1) {
      const curr = { ...deck };
      delete curr[card];
      setTooltip(null);
      setDeck(curr);
    } else {
      const curr = { ...deck };
      curr[card] -= 1;
      setDeck(curr);
    }
  };

  return (
    <div style={{ height: '75vh', color: 'white', overflow: 'hidden auto', paddingBottom: '10px' }}>
      {deck && cards && (
        Object.keys(deck)
          .sort((a, b) => {
            if (cards[a].pp_ === cards[b].pp_) {
              return cards[a].id_ > cards[b].id_ ? 1 : -1;
            }
            return cards[a].pp_ > cards[b].pp_ ? 1 : -1;
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
                margin: 'auto',
                marginTop: '8px',
                userSelect: 'none',
              }}
              onMouseEnter={(e) => updateTooltip(e, card)}
              onMouseLeave={() => setTooltip(null)}
              onClick={() => removeFromDeck(card)}
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
};

Deck.propTypes = propTypes;

export default Deck;
