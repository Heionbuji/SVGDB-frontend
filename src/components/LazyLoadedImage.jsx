import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

const Image = styled.img`
  width: 107px;
  height: 140px;
`;

const placeHolder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=';

const LazyLoadedImage = ({ src, alt }) => {
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

  return <Image ref={setImageRef} src={imageSrc} alt={alt} />;
};

LazyLoadedImage.propTypes = propTypes;

export default LazyLoadedImage;
