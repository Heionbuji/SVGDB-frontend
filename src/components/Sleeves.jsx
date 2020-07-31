import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledContentDiv } from '../styles/globalStyles';
import LazyLoadedImage from './LazyLoadedImage';

const Sleeves = () => {
  const [sleevesJson, setSleevesJson] = useState(null);
  const { t } = useTranslation('sleeves');
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/sleeves`)
      .then((res) => res.json())
      .then((resJson) => setSleevesJson(resJson));
  }, []);
  const sleeveSrc = `${process.env.REACT_APP_ASSETS_URL}/sleeves/sleeve_`;
  const thumbnailSrc = `${process.env.REACT_APP_ASSETS_URL}/thumbnails/sleeve_`;
  return (
    <StyledContentDiv>
      {sleevesJson && (
        Object.keys(sleevesJson).map((key) => (
          <div
            key={`div${key}`}
            style={{
              maxWidth: '80%', margin: 'auto', color: 'white', padding: '10px',
            }}
          >
            <h2>{t(key)}</h2>
            {sleevesJson[key].map((sleeve) => (
              <a target="_blank" href={`${sleeveSrc}${sleeve}.png`} rel="noopener noreferrer" key={`slv${sleeve}`}>
                <LazyLoadedImage src={`${thumbnailSrc + sleeve}.png`} alt="" />
              </a>
            ))}

          </div>
        ))
      )}
    </StyledContentDiv>
  );
};

export default Sleeves;
