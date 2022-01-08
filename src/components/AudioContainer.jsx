/* eslint-disable react/no-array-index-key */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Reactivetd, ReactiveRow, EmptyHeader } from '../styles/cardStyles';

const propTypes = {
  cardJson: PropTypes.shape({
    type_: PropTypes.string,
    id_: PropTypes.number,
    extras: PropTypes.arrayOf(PropTypes.string),
    alts_: PropTypes.arrayOf(PropTypes.number),
  }),
  cardId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  t: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    language: PropTypes.string,
  }),
};

const AudioContainer = ({ cardId, t, i18n }) => {
  const [voiceJson, setVoiceJson] = useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/voices/${cardId}`)
      .then((res) => res.json())
      .then((resJson) => setVoiceJson(resJson));
  }, [cardId]);
  const [id2name, setId2name] = useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/${i18n.language}/id2name`)
      .then((res) => res.json())
      .then((resJson) => setId2name(resJson));
  }, [i18n.language]);

  if (voiceJson && voiceJson.plays && id2name) {
    const hasVS = voiceJson.plays.some((play) => play.indexOf('_7_') >= 0 || play.indexOf('_8_') >= 0);
    return (
      <table style={{ margin: 'auto' }}>
        <thead>
          <ReactiveRow>
            <EmptyHeader />
            <th>{t('japanese')}</th>
            <th>{t('english')}</th>
          </ReactiveRow>
        </thead>
        <tbody>
          {voiceJson.plays && (
            voiceJson.plays.filter((play) => play.indexOf('_7_') === -1 && play.indexOf('_8_') === -1).map((play) => (
              <tr key={play}>
                <Reactivetd>{play.indexOf('enh') > 0 ? t('enhance') : t('play')}</Reactivetd>
                <Reactivetd>
                  <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/${play}`} />
                </Reactivetd>
                <Reactivetd>
                  <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/${play}`} />
                </Reactivetd>
              </tr>
            ))
          )}
          {voiceJson.other && (
            voiceJson.other.map((other) => (
              <tr key={other}>
                <Reactivetd>{other.substring(8, 9) === '4' ? t('accelerate') : t('crystallize')}</Reactivetd>
                <Reactivetd>
                  <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/${other}`} />
                </Reactivetd>
                <Reactivetd>
                  <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/${other}`} />
                </Reactivetd>
              </tr>
            ))
          )}
          {voiceJson.attacks && (
            voiceJson.attacks.map((attack) => (
              <tr key={attack}>
                <Reactivetd>{attack.indexOf('evo') > 0 ? `${t('attack')} (${t('evolve')})` : t('attack')}</Reactivetd>
                <Reactivetd>
                  <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/${attack}`} />
                </Reactivetd>
                <Reactivetd>
                  <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/${attack}`} />
                </Reactivetd>
              </tr>
            ))
          )}
          {voiceJson.evolves && (
            voiceJson.evolves.map((evolve) => (
              <tr key={evolve}>
                <Reactivetd>{t('evolve')}</Reactivetd>
                <Reactivetd>
                  <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/${evolve}`} />
                </Reactivetd>
                <Reactivetd>
                  <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/${evolve}`} />
                </Reactivetd>
              </tr>
            ))
          )}
          {voiceJson.deaths && (
            voiceJson.deaths.map((death) => (
              <tr key={death}>
                <Reactivetd>{death.indexOf('evo') > 0 ? `${t('death')} (${t('evolve')})` : t('death')}</Reactivetd>
                <Reactivetd>
                  <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/${death}`} />
                </Reactivetd>
                <Reactivetd>
                  <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/${death}`} />
                </Reactivetd>
              </tr>
            ))
          )}
          {voiceJson.effects && (
            voiceJson.effects.map((effect) => (
              <tr key={effect}>
                <Reactivetd>{t('effectVoice')}</Reactivetd>
                <Reactivetd>
                  <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/${effect}`} />
                </Reactivetd>
                <Reactivetd>
                  <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/${effect}`} />
                </Reactivetd>
              </tr>
            ))
          )}
          {voiceJson.plays && hasVS && (
            voiceJson.plays.filter((play) => play.indexOf('_7_') >= 0 || play.indexOf('_8_') >= 0).map((play) => (
              <tr key={play}>
                <Reactivetd>{play.indexOf('_7_') !== -1
                  ? `Enemy ${id2name[play.substring(play.indexOf('_7_') + 3, play.length - 4)]}`
                  : `Ally ${id2name[play.substring(play.indexOf('_8_') + 3, play.length - 4)]}`}
                </Reactivetd>
                <Reactivetd>
                  <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/${play}`} />
                </Reactivetd>
                <Reactivetd>
                  <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/${play}`} />
                </Reactivetd>
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  }
  return null;
};

AudioContainer.propTypes = propTypes;

export default withTranslation()(AudioContainer);
