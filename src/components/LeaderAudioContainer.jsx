/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

const propTypes = {
  leaderId: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

const LeaderAudioContainer = ({ leaderId, t }) => {
  // eslint-disable-next-line no-param-reassign
  if (leaderId.length === 2) leaderId += '001';
  return leaderId && (
    <table style={{ margin: 'auto' }}>
      <thead>
        <tr>
          <th style={{ width: 'auto' }} />
          <th>{t('japanese')}</th>
          <th>{t('english')}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{t('Greeting')}</td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${leaderId}_000_001_0.mp3`} /></td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${leaderId}_000_001_0.mp3`} /></td>
        </tr>
        <tr>
          <td>{t('Thanks')}</td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${leaderId}_000_002_0.mp3`} /></td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${leaderId}_000_002_0.mp3`} /></td>
        </tr>
        <tr>
          <td>{t('Apology')}</td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${leaderId}_000_003_0.mp3`} /></td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${leaderId}_000_003_0.mp3`} /></td>
        </tr>
        <tr>
          <td>{t('Impressed')}</td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${leaderId}_000_004_0.mp3`} /></td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${leaderId}_000_004_0.mp3`} /></td>
        </tr>
        <tr>
          <td>{t('Shocked')}</td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${leaderId}_000_005_0.mp3`} /></td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${leaderId}_000_005_0.mp3`} /></td>
        </tr>
        <tr>
          <td>{t('Thinking')}</td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${leaderId}_000_006_0.mp3`} /></td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${leaderId}_000_006_0.mp3`} /></td>
        </tr>
        <tr>
          <td>{t('Taunt')}</td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${leaderId}_000_007_0.mp3`} /></td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${leaderId}_000_007_0.mp3`} /></td>
        </tr>
        <tr>
          <td>{t('Start')}</td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${leaderId}_000_008_0.mp3`} /></td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${leaderId}_000_008_0.mp3`} /></td>
        </tr>
        <tr>
          <td>{t('Start')}</td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${leaderId}_000_009_0.mp3`} /></td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${leaderId}_000_009_0.mp3`} /></td>
        </tr>
        <tr>
          <td>{t('Victory')}</td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${leaderId}_000_010_0.mp3`} /></td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${leaderId}_000_010_0.mp3`} /></td>
        </tr>
        <tr>
          <td>{t('Concede')}</td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${leaderId}_000_011_0.mp3`} /></td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${leaderId}_000_011_0.mp3`} /></td>
        </tr>
        <tr>
          <td>{t('Concede')}</td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${leaderId}_000_012_0.mp3`} /></td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${leaderId}_000_012_0.mp3`} /></td>
        </tr>
        <tr>
          <td>{t('Evolve')}</td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${leaderId}_000_013_0.mp3`} /></td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${leaderId}_000_013_0.mp3`} /></td>
        </tr>
        <tr>
          <td>{t('Evolve')}</td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${leaderId}_000_014_0.mp3`} /></td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${leaderId}_000_014_0.mp3`} /></td>
        </tr>
        <tr>
          <td>{t('Evolve')}</td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${leaderId}_000_015_0.mp3`} /></td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${leaderId}_000_015_0.mp3`} /></td>
        </tr>
        <tr>
          <td>{t('Hurt')}</td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${leaderId}_000_016_0.mp3`} /></td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${leaderId}_000_016_0.mp3`} /></td>
        </tr>
        <tr>
          <td>{t('Hurt')}</td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${leaderId}_000_017_0.mp3`} /></td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${leaderId}_000_017_0.mp3`} /></td>
        </tr>
        <tr>
          <td>{t('Hurt')}</td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${leaderId}_000_018_0.mp3`} /></td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${leaderId}_000_018_0.mp3`} /></td>
        </tr>
        <tr>
          <td>{t('Hurt')}</td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${leaderId}_000_019_0.mp3`} /></td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${leaderId}_000_019_0.mp3`} /></td>
        </tr>
        <tr>
          <td>{t('Hurt')}</td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${leaderId}_000_020_0.mp3`} /></td>
          <td><audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${leaderId}_000_020_0.mp3`} /></td>
        </tr>
      </tbody>
    </table>
  );
};

LeaderAudioContainer.propTypes = propTypes;

export default withTranslation()(LeaderAudioContainer);
