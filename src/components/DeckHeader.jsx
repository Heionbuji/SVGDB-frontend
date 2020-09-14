import React from 'react';
import PropTypes from 'prop-types';

import { StyledButton, StyledPortrait } from '../styles/deckbuilderStyles';

const propTypes = {
  deck: PropTypes.shape({}).isRequired,
  craft: PropTypes.string,
  deckCount: PropTypes.number.isRequired,
};

const DeckHeader = ({ deck, craft, deckCount }) => {
  const portalUrl = 'https://shadowverse-portal.com/deck/';
  const DECK_MAX = 40;

  const computeDeckHash = () => {
    // starts with something like 1.1., first one is mode (1 = unlimi, 3 = rot)
    // second one is class id
    const radix = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';
    let ret = `1.${craft}.`;
    Object.keys(deck).forEach((key) => {
      let temp = '';
      let tempKey = key;
      while (parseInt(tempKey, 10) > 0) {
        temp += radix[parseInt(tempKey, 10) % 64];
        tempKey = Math.floor(parseInt(tempKey, 10) / 64);
      }
      ret += `${temp.split('').reverse().join('')}.`.repeat(deck[key]);
    });
    return (ret.substring(0, ret.length - 1));
  };

  return craft && (
    <div style={{ backgroundColor: 'rgb(31, 52, 75)', minHeight: '10vh', display: 'flex' }}>
      <StyledPortrait
        src={`${process.env.REACT_APP_ASSETS_URL}/thumbnails/class_select_thumbnail_${craft}.png`}
        alt=""
      />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <span
          style={
            {
              color: deckCount > DECK_MAX ? '#cc1111' : 'white',
              fontFamily: 'helvetica inherit',
              fontSize: '2rem',
              paddingLeft: '4px',
            }
          }
        >
          {deckCount}/{DECK_MAX}
        </span>
        <a
          target="_blank"
          href={portalUrl + computeDeckHash()}
          rel="noopener noreferrer"
        >
          <StyledButton type="button" disabled={deckCount !== 40}>
            Open in portal
          </StyledButton>
        </a>
      </div>
    </div>
  );
};

DeckHeader.propTypes = propTypes;

DeckHeader.defaultProps = {
  craft: null,
};

export default DeckHeader;
