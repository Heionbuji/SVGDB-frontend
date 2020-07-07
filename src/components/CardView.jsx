/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  StyledCardContainer,
  StyledCardName,
  StyledCardInformation,
  StyledCardImageContainer,
  StyledArtImg,
  StyledButton,
} from '../styles/cardStyles';

const CardView = () => {
  const history = useHistory();
  const [cardJson, setCardJson] = useState({});
  const [evo, setEvo] = useState(false);
  const { cardId } = useParams();
  useEffect(() => {
    if (Number.isNaN(+cardId) || (!Number.isNaN(+cardId) && !cardJson.id_)) { // help this is a mess
      fetch(`${process.env.REACT_APP_API_URL}/cards/${cardId}`)
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
          <a target="_blank" href={`${process.env.REACT_APP_API_URL}/assets/cards/${evo ? 'E' : 'C'}_${cardId}.png`} rel="noopener noreferrer">
            <StyledArtImg src={`${process.env.REACT_APP_API_URL}/assets/cards/${evo ? 'E' : 'C'}_${cardId}.png`} alt="" />
          </a>
          <a target="_blank" href={`${process.env.REACT_APP_API_URL}/assets/${cardId}${evo ? '1' : '0'}.png`} rel="noopener noreferrer">
            <StyledArtImg src={`${process.env.REACT_APP_API_URL}/assets/${cardId}${evo ? '1' : '0'}.png`} alt="" />
          </a>
        </StyledCardImageContainer>
        {cardJson.type_ === 'Follower'
        && (
          <div style={{ textAlign: 'center' }}>
            <StyledButton type="button" onClick={() => setEvo(!evo)}>
              {evo ? 'Base' : 'Evo'} Art
            </StyledButton>
          </div>
        )}
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
                {cardJson.type_ === 'Follower' && <><b>Stats: </b>{cardJson.baseAtk_}/{cardJson.baseDef_} <br /></>}
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
        {cardJson.type_ !== 'Amulet' && (
          <>
            <table style={{ margin: 'auto' }}>
              <thead>
                <tr>
                  <th style={{ width: 'auto' }} />
                  <th>Japanese</th>
                  <th>English</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Play </td>
                  <td>
                    <audio controls preload="none" src={`${process.env.REACT_APP_API_URL}/assets/audio/jp/vo_${cardId}_0.mp3`} />
                  </td>
                  <td>
                    <audio controls preload="none" src={`${process.env.REACT_APP_API_URL}/assets/audio/en/vo_${cardId}_0.mp3`} />
                  </td>
                </tr>
                {cardJson.type_ === 'Follower'
                && (
                <>
                  <tr>
                    <td>Attack </td>
                    <td>
                      <audio controls preload="none" src={`${process.env.REACT_APP_API_URL}/assets/audio/jp/vo_${cardId}_1.mp3`} />
                    </td>
                    <td>
                      <audio controls preload="none" src={`${process.env.REACT_APP_API_URL}/assets/audio/en/vo_${cardId}_1.mp3`} />
                    </td>
                  </tr>
                  <tr>
                    <td>Evolve </td>
                    <td>
                      <audio controls preload="none" src={`${process.env.REACT_APP_API_URL}/assets/audio/jp/vo_${cardId}_2.mp3`} />
                    </td>
                    <td>
                      <audio controls preload="none" src={`${process.env.REACT_APP_API_URL}/assets/audio/en/vo_${cardId}_2.mp3`} />
                    </td>
                  </tr>
                  <tr>
                    <td>Death </td>
                    <td>
                      <audio controls preload="none" src={`${process.env.REACT_APP_API_URL}/assets/audio/jp/vo_${cardId}_3.mp3`} />
                    </td>
                    <td>
                      <audio controls preload="none" src={`${process.env.REACT_APP_API_URL}/assets/audio/en/vo_${cardId}_3.mp3`} />
                    </td>
                  </tr>
                </>
                )}
              </tbody>

            </table>
          </>
        )}

      </StyledCardContainer>
    );
  }
  return null;
};

export default CardView;
