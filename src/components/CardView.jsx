/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  StyledCardContainer,
  StyledCardName,
  StyledCardInformation,
  StyledCardImageContainer,
  StyledArtImg,
} from '../styles/cardStyles';

const CardView = () => {
  const history = useHistory();
  const [cardJson, setCardJson] = useState({});
  const { cardId } = useParams();
  useEffect(() => {
    if (Number.isNaN(+cardId) || (!Number.isNaN(+cardId) && !cardJson.id_)) { // help this is a mess
      fetch(`http://localhost:3002/cards/${cardId}`)
        .then((res) => res.json())
        .then((resjson) => {
          setCardJson(resjson);
          history.push(`/cards/${resjson.id_}`);
        });
    }
  }, [cardId, cardJson, history]);
  if (cardJson.id_ && !Number.isNaN(+cardId)) {
    return (
      <StyledCardContainer>
        <StyledCardName>
          {cardJson.name_}
          <span style={{ float: 'right' }}>{cardJson.craft_}</span>
        </StyledCardName>
        <StyledCardImageContainer>
          <a target="_blank" href={`http://localhost:3002/assets/${cardId}0.png`} rel="noopener noreferrer">
            <StyledArtImg src={`http://localhost:3002/assets/${cardId}0.png`} alt="" />
          </a>
          <a target="_blank" href={`http://localhost:3002/assets/${cardId}1.png`} rel="noopener noreferrer">
            <StyledArtImg src={`http://localhost:3002/assets/${cardId}1.png`} alt="" />
          </a>
        </StyledCardImageContainer>
        <StyledCardInformation>
          <div style={{ maxWidth: '40%' }}>
            <div style={{ textAlign: 'left', fontSize: '1.2rem', marginTop: '19.2px' }}>
              <b>Type: </b>{cardJson.type_} <br />
              <b>Rarity: </b>{cardJson.rarity_} <br />
              <b>Set: </b>{cardJson.expansion_} {cardJson.rotation_ ? '(Rotation)' : '(Unlimited)'} <br />
              <b>Cost: </b>{cardJson.pp_} <br />
              <br />
              <b>Base: </b><br />
              <div style={{ paddingLeft: '10px' }}>
                {cardJson.type_ === 'Follower' && <><b>Stats: </b> {cardJson.baseAtk_}/{cardJson.baseDef_} <br /></>}
                <b>Effect: </b>{cardJson.baseEffect_} <br />
              </div>
              <br />
              {cardJson.type_ === 'Follower'
              && (
                <>
                  <b>Evolved: </b><br />
                  <div style={{ paddingLeft: '10px' }}>
                    <b>Stats: </b>{cardJson.evoAtk_}/{cardJson.evoDef_} <br />
                    <b>Effect: </b>{cardJson.evoEffect_}
                  </div>
                </>
              )}
            </div>
          </div>
          <div style={{ maxWidth: '45%' }}>
            <p style={{ textAlign: 'right', fontSize: '1.2rem' }}>
              <b>Base Flair</b> <br />
              {cardJson.baseFlair_} <br />
              <br />
              {cardJson.type_ === 'Follower'
              && (
              <>
                <b>Evolved Flair</b> <br />
                {cardJson.evoFlair_}
              </>
              )}
            </p>
          </div>
        </StyledCardInformation>
      </StyledCardContainer>
    );
  }
  return null;
};

export default CardView;
