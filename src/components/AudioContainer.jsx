/* eslint-disable react/no-array-index-key */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

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

  if (voiceJson && voiceJson !== {} && id2name) {
    const hasVS = voiceJson.plays.some((play) => play.indexOf('_7_') >= 0 || play.indexOf('_8_') >= 0);
    return (
      <table style={{ margin: 'auto' }}>
        <thead>
          <tr>
            <th style={{ width: 'auto' }} />
            <th>{t('japanese')}</th>
            <th>{t('english')}</th>
          </tr>
        </thead>
        <tbody>
          {voiceJson.plays && (
            voiceJson.plays.filter((play) => play.indexOf('_7_') === -1 && play.indexOf('_8_') === -1).map((play) => (
              <tr key={play}>
                <td>{play.indexOf('enh') > 0 ? t('enhance') : t('play')}</td>
                <td>
                  <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/${play}`} />
                </td>
                <td>
                  <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/${play}`} />
                </td>
              </tr>
            ))
          )}
          {voiceJson.attacks && (
            voiceJson.attacks.map((attack) => (
              <tr key={attack}>
                <td>{attack.indexOf('evo') > 0 ? `${t('attack')} (${t('evolve')})` : t('attack')}</td>
                <td>
                  <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/${attack}`} />
                </td>
                <td>
                  <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/${attack}`} />
                </td>
              </tr>
            ))
          )}
          {voiceJson.evolves && (
            voiceJson.evolves.map((evolve) => (
              <tr key={evolve}>
                <td>{t('evolve')}</td>
                <td>
                  <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/${evolve}`} />
                </td>
                <td>
                  <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/${evolve}`} />
                </td>
              </tr>
            ))
          )}
          {voiceJson.deaths && (
            voiceJson.deaths.map((death) => (
              <tr key={death}>
                <td>{death.indexOf('evo') > 0 ? `${t('death')} (${t('evolve')})` : t('death')}</td>
                <td>
                  <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/${death}`} />
                </td>
                <td>
                  <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/${death}`} />
                </td>
              </tr>
            ))
          )}
          {voiceJson.effects && (
            voiceJson.effects.map((effect) => (
              <tr key={effect}>
                <td>{t('effectVoice')}</td>
                <td>
                  <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/${effect}`} />
                </td>
                <td>
                  <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/${effect}`} />
                </td>
              </tr>
            ))
          )}
          {voiceJson.plays && hasVS && (
            voiceJson.plays.filter((play) => play.indexOf('_7_') >= 0 || play.indexOf('_8_') >= 0).map((play) => (
              <tr key={play}>
                <td>{play.indexOf('_7_') !== -1
                  ? `Enemy ${id2name[play.substring(play.indexOf('_7_') + 3, play.length - 4)]}`
                  : `Ally ${id2name[play.substring(play.indexOf('_8_') + 3, play.length - 4)]}`}
                </td>
                <td>
                  <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/${play}`} />
                </td>
                <td>
                  <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/${play}`} />
                </td>
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
