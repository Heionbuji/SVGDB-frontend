/* eslint-disable no-restricted-syntax */
import React from 'react';

const DeckHeader = ({ deck }) => {
  const portalUrl = 'https://shadowverse-portal.com/deck/';

  const computeDeckHash = () => {
    // starts with something like 1.1., first one is mode (1 = unlimi, 3 = rot)
    // second one is class id
    const radix = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';
    let ret = '1.1.';
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

  const openInPortal = () => {
    const hash = computeDeckHash();
    window.open(portalUrl + hash);
  };
  return (
    <div style={{ backgroundColor: 'grey', minHeight: '100px' }}>
      <button type="button" onClick={() => openInPortal()}>
        Open in portal
      </button>
    </div>
  );
};

export default DeckHeader;
