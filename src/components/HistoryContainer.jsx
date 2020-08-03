import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  cardId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

const HistoryItem = styled.span`
  border: 1px solid pink;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HistoryContainer = ({ cardId }) => {
  const [history, setHistory] = useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/history/${cardId}`)
      .then((res) => res.json())
      .then((resjson) => {
        setHistory(resjson);
      });
  }, [cardId]);
  return (history && history[0]) ? (
    <div style={{ paddingLeft: '10%', paddingRight: '10%' }}>
      <h2>Change History:</h2>
      {history.map((item) => (
        <React.Fragment key={`frag${item.date}`}>
          <h3>{item.date}</h3>
          {Object.keys(item).map((key) => {
            if (key.substring(0, 4) === 'Old_') {
              const param = key.substring(4, key.length);
              const newParam = item[`New_${param}`];
              return (
                <div style={{ display: 'flex', maxWidth: '95%', verticalAlign: 'middle' }} key={`div${key}`}>
                  <HistoryItem><b style={{ marginRight: '10px' }}>{param}</b>{`${item[key]}`}</HistoryItem>
                  <HistoryItem>-&gt;</HistoryItem>
                  <HistoryItem>{newParam} <br />
                    <span style={{ color: 'red', fontSize: '0.7rem' }}>{item.revert ? '※ This reverts a previous change.' : ''}</span>
                  </HistoryItem>
                </div>
              );
            }
            return null;
          })}
        </React.Fragment>
      ))}
    </div>
  ) : null;
};

HistoryContainer.propTypes = propTypes;

export default HistoryContainer;
