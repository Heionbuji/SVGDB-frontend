import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StyledContentDiv } from '../styles/globalStyles';
import LazyLoadedImage from '../components/LazyLoadedImage';

const Resources = () => {
  const { resource } = useParams();
  const [resourceJson, setResourceJson] = useState(null);
  const { t } = useTranslation('resources');
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/${resource}`)
      .then((res) => res.json())
      .then((resJson) => setResourceJson(resJson));
  }, [resource]);
  let resourceSrc = null;
  let thumbnailSrc = null;
  switch (resource) {
    case 'sleeves':
      resourceSrc = `${process.env.REACT_APP_ASSETS_URL}/sleeves/sleeve_`;
      thumbnailSrc = `${process.env.REACT_APP_ASSETS_URL}/thumbnails/sleeve_`;
      break;
    case 'emblems':
      resourceSrc = `${process.env.REACT_APP_ASSETS_URL}/emblems/em_`;
      thumbnailSrc = `${process.env.REACT_APP_ASSETS_URL}/thumbnails/em_`;
      break;
    case 'bgs':
      resourceSrc = `${process.env.REACT_APP_ASSETS_URL}/bgs/`;
      thumbnailSrc = `${process.env.REACT_APP_ASSETS_URL}/thumbnails/`;
      break;
    case 'flairs':
      resourceSrc = `${process.env.REACT_APP_ASSETS_URL}/degrees/degree_`;
      thumbnailSrc = `${process.env.REACT_APP_ASSETS_URL}/thumbnails/degree_`;
      break;
    default:
      break;
  }
  return (
    <StyledContentDiv>
      {resourceJson && (
        Object.keys(resourceJson).map((key) => (
          <div
            key={`div${key}`}
            style={{
              maxWidth: '80%', margin: 'auto', color: 'white', padding: '10px',
            }}
          >
            <h2>{t(key)}</h2>
            {resourceJson[key].map((resourceId) => {
              if (resource === 'flairs' || resource === 'emblems') {
                return (
                  <a target="_blank" href={`${resourceSrc}${resourceId}_m.png`} rel="noopener noreferrer" key={`res${resourceId}`}>
                    <LazyLoadedImage
                      src={`${thumbnailSrc + resourceId}_s.png`}
                      alt=""
                      width={resource === 'flairs' ? 250 : 100}
                      height={100}
                    />
                  </a>
                );
              }
              return (
                <a target="_blank" href={`${resourceSrc}${resourceId}.png`} rel="noopener noreferrer" key={`res${resourceId}`}>
                  <LazyLoadedImage
                    src={`${thumbnailSrc + resourceId}.png`}
                    alt=""
                    width={resource === 'bgs' && 250}
                  />
                </a>
              );
            })}

          </div>
        ))
      )}
    </StyledContentDiv>
  );
};

export default Resources;
