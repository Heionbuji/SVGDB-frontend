/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const propTypes = {
  token: PropTypes.string.isRequired,
};

const TokenContainer = ({ token }) => {
  const [tokenJson, setTokenJson] = useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/cards/${token}`)
      .then((res) => res.json())
      .then((resJson) => setTokenJson(resJson));
  }, [token]);
  return tokenJson && (
    <Link to={`/cards/${tokenJson.id_}`}>
      <div style={{ border: '1px solid pink', padding: '10px' }}>
        <p>{tokenJson.name_}</p>
        <div style={{ display: 'flex' }}>
          <img src={`${process.env.REACT_APP_ASSETS_URL}/thumbnails/C_${tokenJson.id_}.png`} alt="" style={{ float: 'left' }} />
          {tokenJson.type_ === 'Follower'
            ? (
              <span style={{
                maxWidth: '200px', maxHeight: '200px', minHeight: '200px', minWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis',
              }}
              >
                <b>Base: </b><br />
                {tokenJson.baseEffect_} <br />
                <b>Evo: </b><br />
                {tokenJson.evoEffect_}
              </span>
            )
            : (
              <span style={{ maxWidth: '250px', maxHeight: '250px' }}>
                {tokenJson.baseEffect_}
              </span>
            )}

        </div>
      </div>
    </Link>
  );
};

TokenContainer.propTypes = propTypes;

export default TokenContainer;
