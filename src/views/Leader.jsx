/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StyledContentDiv } from '../styles/globalStyles';
import {
  StyledCardImageContainer, StyledButton, StyledLeaderImg, StyledCardName,
} from '../styles/cardStyles';
import { ForegroundDiv, DimBackground } from '../styles/leaderAnimationStyles';
import LeaderAudioContainer from '../components/LeaderAudioContainer';

const LeaderAnimations = React.lazy(() => import('../components/LeaderAnimations'));

const Leader = () => {
  const { leaderId } = useParams();
  const [win, setWin] = useState('win');
  const [zoom, setZoom] = useState('profile');
  const [showAnimations, setShowAnimations] = useState(false);
  const [leaderInfo, setLeaderInfo] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/leader/${leaderId}`)
      .then((res) => res.json())
      .then((data) => setLeaderInfo(data));
  }, []);

  const removeZeroPad = (string) => {
    while (String(string).charAt(0) === '0') {
      // eslint-disable-next-line no-param-reassign
      string = string.substring(1, string.length);
    }
    return string;
  };

  const crafts = [
    'Forestcraft',
    'Swordcraft',
    'Runecraft',
    'Dragoncraft',
    'Shadowcraft',
    'Bloodcraft',
    'Havencraft',
    'Portalcraft',
  ];

  return leaderId && (
    <StyledContentDiv>
      {leaderInfo && (
        <StyledCardName style={{ textAlign: 'left', padding: '20px' }}>
          {leaderInfo.name[i18n.language]}
          <span style={{ float: 'right' }}>{t(crafts[leaderInfo.craft - 1])}</span>
        </StyledCardName>
      )}
      <StyledCardImageContainer>
        {/* HARDCODED EXCEPTION AHEAD: ID 504 is the only one that doesn't follow regular conventions */}
        {leaderId.length < 5 && leaderId !== '504' ? (
          <>
            <a
              target="_blank"
              href={`${process.env.REACT_APP_ASSETS_URL}/leader/class_${leaderId}_${zoom}.png`}
              rel="noopener noreferrer"
            >
              <StyledLeaderImg
                src={`${process.env.REACT_APP_ASSETS_URL}/leader/class_${leaderId}_${zoom}.png`}
                alt=""
              />
            </a>
            <a
              target="_blank"
              href={`${process.env.REACT_APP_ASSETS_URL}/leader/class_${leaderId}_base_${win}.png`}
              rel="noopener noreferrer"
            >
              <StyledLeaderImg
                src={`${process.env.REACT_APP_ASSETS_URL}/leader/class_${leaderId}_base_${win}.png`}
                alt=""
              />
            </a>
          </>
        )
          : (
            <a
              target="_blank"
              href={`${process.env.REACT_APP_ASSETS_URL}/leader/class_${leaderId}_base.png`}
              rel="noopener noreferrer"
            >
              <StyledLeaderImg
                src={`${process.env.REACT_APP_ASSETS_URL}/leader/class_${leaderId}_base.png`}
                alt=""
              />
            </a>
          )}

      </StyledCardImageContainer>
      <StyledButton
        style={{ marginTop: '20px', display: leaderId.substring(0, 2) === '50' && 'none' }}
        onClick={() => (zoom === 'profile' ? setZoom('base') : setZoom('profile'))}
      >
        {t('Toggle Zoom')}
      </StyledButton>
      <StyledButton
        style={{ margin: '20px 10vw 0 10vw' }}
        onClick={() => setShowAnimations(true)}
      >
        {t('View Leader Animations')}
      </StyledButton>
      <StyledButton
        style={{ marginTop: '20px', display: leaderId.substring(0, 2) === '50' && 'none' }}
        onClick={() => (win === 'win' ? setWin('lose') : setWin('win'))}
      >
        {t('Toggle Win/Lose')}
      </StyledButton>

      <LeaderAudioContainer leaderId={leaderId} />
      {showAnimations && (
        <Suspense fallback={<DimBackground><ForegroundDiv /></DimBackground>}>
          <LeaderAnimations classId={removeZeroPad(leaderId)} close={() => setShowAnimations(false)} height="612" width="612" />
        </Suspense>
      )}
    </StyledContentDiv>
  );
};

export default Leader;
