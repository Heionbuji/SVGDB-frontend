import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LazyLoadedImage from '../components/LazyLoadedImage';
import { StyledContentDiv } from '../styles/globalStyles';

const Leaders = () => {
  const [leadersJson, setLeadersJson] = useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/leaders`)
      .then((res) => res.json())
      .then((data) => setLeadersJson(data));
  }, []);
  return leadersJson && (
    <StyledContentDiv>
      {Object.keys(leadersJson).reverse().map((key) => (
        <React.Fragment key={`frag${key}`}>
          <h2 style={{ padding: '15px', margin: '0' }}>{key}</h2>
          {leadersJson[key].map((id) => (
            <Link to={`/leaders/${id}`} key={`link${id}`}>
              <LazyLoadedImage
                // HARDCODED EXCEPTION AHEAD: ID 504 is the only one that doesn't follow regular conventions
                src={`${process.env.REACT_APP_ASSETS_URL}/thumbnails/class_${id}_${id.length > 5 || id === '504' ? 'base' : 'profile'}.png`}
                alt=""
                style={{ padding: '5px' }}
                height={256}
                width={256}
              />
            </Link>
          ))}
        </React.Fragment>
      ))}
    </StyledContentDiv>
  );
};

export default Leaders;
