/* eslint-disable no-param-reassign */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  videoSrc: PropTypes.string,
};

const VideoContainer = ({ videoSrc }) => {
  const vid = useRef(null);
  const checkIfCanAutoplay = (video) => {
    const promise = video.play();
    if (promise !== undefined) {
      promise.then(() => {
        video.controls = true;
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
        }}
        src={videoSrc}
        ref={vid}
      />
    </div>
  );
};

VideoContainer.propTypes = propTypes;

export default VideoContainer;
