/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  ActionButton,
  ActionButtonContainer,
  ForegroundDiv,
  StyledListItem,
  StyledList,
  SmallPortrait,
  StyledTextInput,
  DeleteButton,
} from '../styles/deckbuilderStyles';
import { DimBackground } from '../styles/leaderAnimationStyles';

const propTypes = {
  setShowLoad: PropTypes.func.isRequired,
  parseHash: PropTypes.func.isRequired,
};

export const DeckLoad = ({ setShowLoad, parseHash }) => {
  const [selected, setSelected] = useState(null);
  const [decks, setDecks] = useState(null);
  useEffect(() => {
    setDecks(JSON.parse(localStorage.getItem('decks') || '[]'));
  }, []);

  const deleteDeck = (index) => {
    decks.splice(index, 1);
    localStorage.setItem('decks', JSON.stringify(decks));
    setDecks(decks.length > 1 ? decks : null);
  };

  return (
    <DimBackground>
      <ForegroundDiv>
        <h2>Load deck</h2>
        <h3>From local deck</h3>
        <StyledList>
          {decks && decks.map((localDeck, index) => (
            <StyledListItem
              key={localDeck.name}
              selected={selected && selected.index === index}
            >
              <>
                <span
                  style={{ flexGrow: '1', cursor: 'pointer' }}
                  onClick={() => setSelected({ hash: decks[index].hash, index })}
                >
                  <SmallPortrait
                    src={`${process.env.REACT_APP_ASSETS_URL}/thumbnails/class_select_thumbnail_${decks[index].hash.substring(2, 3)}.png`}
                  />
                  <span style={{ flexGrow: '1', alignSelf: 'center' }}>{localDeck.name}</span>
                </span>

                <DeleteButton onClick={() => deleteDeck(index)}>X</DeleteButton>
              </>
            </StyledListItem>
          ))}
        </StyledList>
        <h3>From Shadowverse portal URL</h3>
        <StyledTextInput
          type="text"
          placeholder="Example: https://shadowverse-portal.com/deck/3.1.6lZu2.6lZu2.6lZu2..."
          fontSize="0.8rem"
          onChange={(e) => {
            const hash = e.target.value.substring(e.target.value.search(/\d\.\d\./g), e.target.value.search(/\?/g));
            setSelected({ hash, index: null });
          }}
          width="100%"
        />
        <h3>From deck code</h3>
        <StyledTextInput
          type="text"
          placeholder="Example: ss2g"
          fontSize="0.8rem"
          onChange={(e) => {
            setSelected({ hash: e.target.value, index: null });
          }}
          width="100%"
        />
        <ActionButtonContainer>
          <ActionButton onClick={() => {
            if (!selected) { return; } // add error handling later
            if (selected.hash.length > 6) {
              parseHash(selected.hash);
              setShowLoad(false);
            } else {
              fetch(`${process.env.REACT_APP_API_URL}/deckcode/${selected.hash}`)
                .then((res) => res.json())
                .then((resJson) => {
                  parseHash(resJson.hash);
                  setShowLoad(false);
                });
            }
          }}
          >
            Load
          </ActionButton>
          <ActionButton onClick={() => (setShowLoad(false))}>
            Cancel
          </ActionButton>
        </ActionButtonContainer>
      </ForegroundDiv>
    </DimBackground>
  );
};

DeckLoad.propTypes = propTypes;

export default DeckLoad;
