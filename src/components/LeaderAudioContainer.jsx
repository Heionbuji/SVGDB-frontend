/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Reactivetd, ReactiveRow, EmptyHeader } from '../styles/cardStyles';

const propTypes = {
  leaderId: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

const LeaderAudioContainer = ({ leaderId, t }) => {
  // eslint-disable-next-line no-param-reassign
  if (leaderId.length === 2) leaderId += '001';
  const audioNames = [
    'Greeting',
    'Thanks',
    'Apology',
    'Impressed',
    'Shocked',
    'Thinking',
    'Taunt',
    'Start',
    'Start',
    'Victory',
    'Concede',
    'Concede',
    'Evolve',
    'Evolve',
    'Evolve',
    'Hurt',
    'Hurt',
    'Hurt',
    'Hurt',
    'Hurt',
  ];
  return leaderId && (
    <table style={{ margin: 'auto' }}>
      <thead>
        <ReactiveRow>
          <EmptyHeader />
          <th>{t('japanese')}</th>
          <th>{t('english')}</th>
        </ReactiveRow>
      </thead>
      <tbody>
        {audioNames.map((name, index) => {
          const id = (index + 1).toString().padStart(3, '0');
          return (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={name + index}>
              <Reactivetd>{t(name)}</Reactivetd>
              <Reactivetd>
                <audio
                  controls
                  preload="none"
                  src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${leaderId}_000_${id}_0.mp3`}
                />
              </Reactivetd>
              <Reactivetd>
                <audio
                  controls
                  preload="none"
                  src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${leaderId}_000_${id}_0.mp3`}
                />
              </Reactivetd>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

LeaderAudioContainer.propTypes = propTypes;

export default withTranslation()(LeaderAudioContainer);
