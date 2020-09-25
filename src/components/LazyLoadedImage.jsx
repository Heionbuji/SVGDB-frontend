import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
};

const Image = styled.img`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  pointer-events: auto;
`;

const placeHolder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=';

const LazyLoadedImage = ({
  src, alt, height = 95, width = 128,
}) => {
  const [imageSrc, setImageSrc] = useState(placeHolder);
  const [imageRef, setImageRef] = useState();

  useEffect(() => {
    let observer;
    let didCancel = false;

    if (imageRef && imageSrc === placeHolder) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (
                !didCancel
                && (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setImageSrc(src);
              }
            });
          },
          {
            threshold: 0.01,
            rootMargin: '75%',
          },
        );
        observer.observe(imageRef);
      } else {
        setImageSrc(src);
      }
    }
    return () => {
      didCancel = true;
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [imageRef, imageSrc, src]);

  return <Image ref={setImageRef} src={imageSrc} alt={alt} height={height} width={width} />;
};

LazyLoadedImage.propTypes = propTypes;

LazyLoadedImage.defaultProps = {
  width: 95,
  height: 128,
};

export default LazyLoadedImage;
