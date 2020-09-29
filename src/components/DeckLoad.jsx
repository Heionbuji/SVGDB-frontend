import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  ActionButton,
  ActionButtonContainer,
  ForegroundDiv,
  StyledListItem,
  StyledList,
  SmallPortrait,
  StyledTextInput,
} from '../styles/deckbuilderStyles';
import { DimBackground } from '../styles/leaderAnimationStyles';

const propTypes = {
  setShowLoad: PropTypes.func.isRequired,
  parseHash: PropTypes.func.isRequired,
};

export const DeckLoad = ({ setShowLoad, parseHash }) => {
  const [selected, setSelected] = useState(null);
  const decks = JSON.parse(localStorage.getItem('decks') || '[]');
  return (
    <DimBackground>
      <ForegroundDiv>
        <h2>Load deck</h2>
        <h3>From local deck</h3>
        <StyledList>
          {decks.map((localDeck, index) => (
            <StyledListItem
            // eslint-disable-next-line react/no-array-index-key
              key={localDeck.name + index}
              selected={selected === index}
              onClick={() => setSelected(index)}
            >
              <>
                <SmallPortrait
                  src={`${process.env.REACT_APP_ASSETS_URL}/thumbnails/class_select_thumbnail_${decks[index].hash.substring(2, 3)}.png`}
                />
                <span>{localDeck.name}</span>
              </>
            </StyledListItem>
          ))}
        </StyledList>
        <h3>From Shadowverse portal URL</h3>
        <StyledTextInput
          type="text"
          placeholder="Example: https://shadowverse-portal.com/deck/3.1.6lZu2.6lZu2.6lZu2..."
          fontSize="0.8rem"
          width="100%"
        />
        <ActionButtonContainer>
          <ActionButton onClick={() => {
            parseHash(decks[selected].hash);
            setShowLoad(false);
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
