import React from 'react';
import PropTypes from 'prop-types';
import { StyledCardImageContainer, StyledArtImg } from '../styles/cardStyles';

const propTypes = {
  evo: PropTypes.bool.isRequired,
  cardId: PropTypes.string.isRequired,
};

const CardImageContainer = ({ evo, cardId }) => (
  <StyledCardImageContainer>
    <a target="_blank" href={`${process.env.REACT_APP_ASSETS_URL}/cards/${evo ? 'E' : 'C'}_${cardId}.png`} rel="noopener noreferrer">
      <StyledArtImg src={`${process.env.REACT_APP_ASSETS_URL}/cards/${evo ? 'E' : 'C'}_${cardId}.png`} alt="" />
    </a>
    <a target="_blank" href={`${process.env.REACT_APP_ASSETS_URL}/fullart/${cardId}${evo ? '1' : '0'}.png`} rel="noopener noreferrer">
      <StyledArtImg src={`${process.env.REACT_APP_ASSETS_URL}/fullart/${cardId}${evo ? '1' : '0'}.png`} alt="" />
    </a>
  </StyledCardImageContainer>
);

CardImageContainer.propTypes = propTypes;

export default CardImageContainer;
