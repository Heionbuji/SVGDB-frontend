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
          <span>
            Base: <br />
            {tokenJson.baseEffect_} <br />
            Evo: <br />
            {tokenJson.evoEffect_}
          </span>
        </div>
      </div>
    </Link>
  );
};

TokenContainer.propTypes = propTypes;

export default TokenContainer;
