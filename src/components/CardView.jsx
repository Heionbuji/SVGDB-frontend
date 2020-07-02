/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { StyledCardContainer, StyledCardName, StyledCardInformation } from '../styles/cardStyles';

const CardView = () => {
  const history = useHistory();
  const [cardJson, setCardJson] = useState({});
  const { cardId } = useParams();
  useEffect(() => {
    if (!cardJson.id_) {
      fetch(`http://localhost:3002/cards/${cardId}`)
        .then((res) => res.json())
        .then((resjson) => {
          setCardJson(resjson);
          history.push(`/cards/${resjson.id_}`);
        });
    }
  }, [cardId, cardJson, history]);
  return ( // TODO: filter what stats are displayed depending on the type of the card
    cardJson && (
      <StyledCardContainer>
        <StyledCardName>
          {cardJson.name_}
          <span style={{ float: 'right' }}>{cardJson.craft_}</span>
        </StyledCardName>
        <StyledCardInformation>
          <p>
            Type: {cardJson.type_} <br />
            Rarity: {cardJson.rarity_} <br />
            Set: {cardJson.expansion_} {cardJson.rotation_ ? '(Rotation)' : '(Unlimited)'} <br />
            Cost: {cardJson.pp_} <br />
            Base: <br />
            Stats: {cardJson.baseAtk_}/{cardJson.baseDef_} <br />
            {cardJson.baseEffect_} <br />
            Evolved: <br />
            Stats: {cardJson.evoAtk_}/{cardJson.evoDef_} <br />
            Effect: {cardJson.evoEffect_}
          </p>

        </StyledCardInformation>
      </StyledCardContainer>
    )
  );
};

export default CardView;
