/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import {
  StyledCardContainer,
  StyledCardName,
  StyledCardInformation,
  StyledButton,
} from '../styles/cardStyles';
import AudioContainer from './AudioContainer';
import TokenContainer from './TokenContainer';
import CardImageContainer from './CardImageContainer';
import HistoryContainer from './HistoryContainer';

const propTypes = {
  t: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    language: PropTypes.string,
  }).isRequired,
};

const CardView = ({ t, i18n }) => {
  const [cardJson, setCardJson] = useState(null);
  const [evo, setEvo] = useState(false);
  const [showAlt, setShowAlt] = useState(false);
  const { cardId } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${process.env.REACT_APP_API_URL}/cards/${i18n.language}/${cardId}`)
      .then((res) => res.json())
      .then((resjson) => {
        setCardJson(resjson);
      });
  }, [cardId, i18n.language]);

  if (cardJson && cardJson.id_ && !Number.isNaN(+cardId)) {
    const altsAndTokens = cardJson.alts_.concat(cardJson.tokens_);
    return (
      <StyledCardContainer>
        <StyledCardName>
          {cardJson.name_}
          <span style={{ float: 'right' }}>{cardJson.craft_}</span>
        </StyledCardName>
        <CardImageContainer evo={evo} cardId={cardId} />
        <div style={{ textAlign: 'center' }}>
          {cardJson.type_ === t('follower')
          && (
            <StyledButton type="button" onClick={() => setEvo(!evo)}>
              {evo ? `${t('base')}` : `${t('evolved')}`} {t('art')}
            </StyledButton>
          )}
          {cardJson.alts_[0] && (
            <>
              <StyledButton type="button" onClick={() => setShowAlt(!showAlt)}>
                {showAlt ? `${t('hideAltArt')}` : `${t('showAltArt')}`}
              </StyledButton>
              {cardJson.alts_.map((alt) => (
                <CardImageContainer evo={evo} cardId={alt} hidden={!showAlt} key={`img${alt}`} />
              ))}
            </>
          )}
        </div>
        <StyledCardInformation>
          <div style={{ maxWidth: '40%' }}>
            <div style={{ textAlign: 'left', fontSize: '1.2rem', marginTop: '19.2px' }}>
              <b>{t('type')}: </b>{cardJson.type_} {cardJson.trait_ !== '-' && <>/ {cardJson.trait_} </>} <br />
              <b>{t('rarity')}: </b>{cardJson.rarity_} <br />
              <b>{t('set')}: </b>{cardJson.expansion_} {cardJson.rotation_ ? `(${t('rotation')})` : `(${t('unlimited')})`} <br />
              <b>{t('cost')}: </b>{cardJson.pp_} <br />
              { cardJson.cv_ && <><b>CV: </b>{cardJson.cv_} <br /></> }
              { cardJson.artist && <><b>{t('Artist')}: </b>{cardJson.artist} <br /></> }
              <b>{t('base')}: </b><br />
              <div style={{ paddingLeft: '10px' }}>
                {cardJson.type_ === t('follower') && <><b>{t('stats')}: </b>{cardJson.baseAtk_}/{cardJson.baseDef_} <br /></>}
                <b>{t('effect')}</b>{cardJson.baseEffect_} <br />
              </div>
              <br />
              {cardJson.type_ === t('follower')
              && (
                <>
                  <b>{t('evolved')}: </b><br />
                  <div style={{ paddingLeft: '10px' }}>
                    <b>{t('stats')}: </b>{cardJson.evoAtk_}/{cardJson.evoDef_} <br />
                    <b>{t('effect')}</b>{cardJson.evoEffect_}
                  </div>
                </>
              )}
            </div>
          </div>
          <div style={{ maxWidth: '45%' }}>
            <p style={{ textAlign: 'right', fontSize: '1.2rem' }}>
              <b>{t('baseFlair')}</b> <br />
              {cardJson.baseFlair_} <br />
              <br />
              {cardJson.type_ === t('follower')
              && (
              <>
                <b>{t('evolvedFlair')}</b> <br />
                {cardJson.evoFlair_}
              </>
              )}
            </p>
          </div>
        </StyledCardInformation>
        <AudioContainer cardJson={cardJson} cardId={cardId} i18n={i18n} />
        {altsAndTokens[0] && (
          <div style={{ paddingLeft: '10%' }}>
            <h2>{t('relatedCards')}: </h2> <br />
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {altsAndTokens.map((token) => (
                <TokenContainer token={token} language={i18n.language} key={`token${token}`} />
              ))}
            </div>
          </div>
        )}
        <HistoryContainer cardId={cardId} />
      </StyledCardContainer>
    );
  }
  return null;
};

CardView.propTypes = propTypes;

export default withTranslation()(CardView);
