/* eslint-disable no-param-reassign */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

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
  useEffect(() => {
    if (vid) {
      vid.current.loop = true;
      vid.current.muted = true;
      checkIfCanAutoplay(vid.current);
    }
  }, []);
  const getCardType = () => {
    if (cardId.charAt(5) === '1') {
      return 'follower';
    } if (cardId.charAt(5) === '4') {
      return 'spell';
    }
    return 'amulet';
  };
  return (
    <div style={{
      maxWidth: '345px',
      maxHeight: '417px',
      width: 'auto',
    }}
    >
      <video
        style={{
          maxWidth: '345px',
          maxHeight: '417px',
          width: 'auto',
          maskImage: `url(${process.env.REACT_APP_ASSETS_URL}/cardanim/${getCardType()}.png)`,
          WebkitMaskImage: `url(${process.env.REACT_APP_ASSETS_URL}/cardanim/${getCardType()}.png)`,
        }}
        src={videoSrc}
        ref={vid}
      />
    </div>
  );
};

VideoContainer.propTypes = propTypes;

export default VideoContainer;
