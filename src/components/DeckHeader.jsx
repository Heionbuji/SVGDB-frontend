import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import {
  StyledButton,
  StyledPortrait,
  ForegroundDiv,
  StyledTextInput,
  ActionButtonContainer,
  ActionButton,
} from '../styles/deckbuilderStyles';
import { DimBackground } from '../styles/leaderAnimationStyles';

const propTypes = {
  deck: PropTypes.shape({}).isRequired,
  craft: PropTypes.string,
  deckCount: PropTypes.number.isRequired,
};

const DeckHeader = ({ deck, craft, deckCount }) => {
  const [showSave, setShowSave] = useState(false);
  const [showLoad, setShowLoad] = useState(false);
  const deckname = useRef(null);
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

  const saveDeck = () => {
    const allDecks = JSON.parse(localStorage.getItem('decks')) || { decks: [] };
    const name = deckname.current.value;
    const hash = computeDeckHash();
    allDecks.decks.push({
      name,
      hash,
    });
    localStorage.setItem('decks', JSON.stringify({
      decks: allDecks,
    }));
  };

  return craft && (
    <>
      <div style={{ backgroundColor: 'rgb(31, 52, 75)', minHeight: '10vh', display: 'flex' }}>
        <StyledPortrait
          src={`${process.env.REACT_APP_ASSETS_URL}/thumbnails/class_select_thumbnail_${craft}.png`}
          alt=""
          noPointer
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
          <span style={{ display: 'flex' }}>
            <StyledButton onClick={() => setShowSave(true)}>
              Save deck
            </StyledButton>
            <StyledButton>
              Load deck
            </StyledButton>
          </span>
        </div>
      </div>
      {showSave && (
        <DimBackground>
          <ForegroundDiv>
            <h2>Save deck</h2>
            <StyledTextInput
              type="text"
              placeholder="Insert deck name"
              ref={deckname}
            />
            <ActionButtonContainer>
              <ActionButton onClick={() => {
                saveDeck();
                setShowSave(false);
              }}
              >
                Save
              </ActionButton>
              <ActionButton onClick={() => (setShowSave(false))}>
                Cancel
              </ActionButton>
            </ActionButtonContainer>
          </ForegroundDiv>
        </DimBackground>
      )}

    </>
  );
};

DeckHeader.propTypes = propTypes;

DeckHeader.defaultProps = {
  craft: null,
};

export default DeckHeader;
