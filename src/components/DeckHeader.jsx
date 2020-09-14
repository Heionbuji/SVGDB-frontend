import React from 'react';

import { StyledButton } from '../styles/deckbuilderStyles';

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

  return (
    <div style={{ backgroundColor: 'rgb(31, 52, 75)', minHeight: '10vh' }}>
      <a target="_blank" href={portalUrl + computeDeckHash()} rel="noopener noreferrer">
        <StyledButton type="button" disabled={deckCount !== 40}>
          Open in portal
        </StyledButton>
      </a>
      <span style={{ color: deckCount > DECK_MAX ? '#cc1111' : 'white' }}>{deckCount}/{DECK_MAX}</span>
    </div>
  );
};

export default DeckHeader;
