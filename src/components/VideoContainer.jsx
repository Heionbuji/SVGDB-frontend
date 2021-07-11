/* eslint-disable no-param-reassign */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { StyledVideoContainer } from '../styles/cardStyles';

const propTypes = {
  videoSrc: PropTypes.string,
  cardId: PropTypes.string,
};

const VideoContainer = ({ videoSrc, cardId }) => {
  const vid = useRef(null);
  const checkIfCanAutoplay = (video) => {
    const promise = video.play();
    if (promise !== undefined) {
      promise.then(() => {
        video.controls = false;
      }).catch(() => {
        video.controls = true;
      });
    }
  };

  const getCardType = () => {
    if (cardId.charAt(5) === '1') {
      return 'follower';
    } if (cardId.charAt(5) === '4') {
      return 'spell';
    }
    return 'amulet';
  };

  const handleFullscreen = (e) => {
    if (!vid.current) return;
    if (document.fullscreenElement) {
      vid.current.classList.remove(`mask-${getCardType()}`);
    } else {
      vid.current.classList.add(`mask-${getCardType()}`);
    }
  };

  useEffect(() => {
    if (vid) {
      document.addEventListener('fullscreenchange', handleFullscreen);
      document.addEventListener('webkitfullscreenchange', handleFullscreen);
      vid.current.loop = true;
      vid.current.muted = true;
      checkIfCanAutoplay(vid.current);
    }
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreen);
      document.removeEventListener('webkitfullscreenchange', handleFullscreen);
    };
  }, [cardId, videoSrc]);

  return (
    <StyledVideoContainer>
      <video
        style={{
          maxWidth: '345px',
          maxHeight: '417px',
          width: 'auto',
        }}
        className={`mask-${getCardType()}`}
        src={videoSrc}
        ref={vid}
      />
    </StyledVideoContainer>
  );
};

VideoContainer.propTypes = propTypes;

export default VideoContainer;
