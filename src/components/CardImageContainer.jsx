/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes, { bool } from 'prop-types';
import { StyledCardImageContainer, StyledArtImg } from '../styles/cardStyles';

const propTypes = {
  evo: PropTypes.bool.isRequired,
  cardId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  hidden: PropTypes.bool,
  censored: bool,
};

const CardImageContainer = ({ evo, cardId, hidden = false, censored = false }) => (
  !hidden && (
    <StyledCardImageContainer>
      <a
        target="_blank"
        href={`${process.env.REACT_APP_ASSETS_URL}/${censored ? 'censored' : 'cards'}/${evo ? 'E' : 'C'}_${cardId}.png`}
        rel="noopener noreferrer"
      >
        <StyledArtImg src={`${process.env.REACT_APP_ASSETS_URL}/${censored ? 'censored' : 'cards'}/${evo ? 'E' : 'C'}_${cardId}.png`} alt="" />
      </a>
      <a
        target="_blank"
        href={`${process.env.REACT_APP_ASSETS_URL}/${censored ? 'censored' : 'fullart'}/${cardId}${evo ? '1' : '0'}.png`}
        rel="noopener noreferrer"
      >
        <StyledArtImg src={`${process.env.REACT_APP_ASSETS_URL}/${censored ? 'censored' : 'fullart'}/${cardId}${evo ? '1' : '0'}.png`} alt="" />
      </a>
    </StyledCardImageContainer>
  )
);

CardImageContainer.propTypes = propTypes;

export default CardImageContainer;
