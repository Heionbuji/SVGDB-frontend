import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
              <img
                src={`${process.env.REACT_APP_ASSETS_URL}/thumbnails/class_${id}_${id.substring(0, 2) === '50' || id.substring(0, 2) === '60' ? 'base' : 'profile'}.png`}
                alt=""
                style={{ padding: '5px' }}
              />
            </Link>
          ))}
        </React.Fragment>
      ))}
    </StyledContentDiv>
  );
};

export default Leaders;
