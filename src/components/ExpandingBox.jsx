/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.arrayOf(PropTypes.shape({})),
    // Apparently those types aren't good enough so screw it
    PropTypes.any,
  ]),
  width: PropTypes.string,
  marginTop: PropTypes.string,
};

const TitleBox = styled.div`
  width: ${(props) => props.width};
  border: 2px solid #444;
  height: 50px;
  margin: auto;
  margin-top: ${(props) => props.marginTop};
  margin-bottom: 25px;
  background-color: #111;
  cursor: pointer;
`;

const ContentDiv = styled.div`
  margin: auto;
  width: ${(props) => props.width};
  margin-top: -30px;
  padding-top: 20px;
  padding-bottom: 20px;
  border: 2px solid #444;
  border-top: none;
  background-color: #111;
  & > * {
    margin: auto;
  }
`;

const ExpandingBox = ({
  title, content, width = '75%', marginTop = '0px',
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <TitleBox width={width} marginTop={marginTop} onClick={() => setExpanded(!expanded)}>
        <div style={{ paddingTop: '15px', height: '100%' }}>
          <span style={{ float: 'left', marginLeft: '10%' }}>
            {expanded ? (
              <svg width="40" height="30">
                <line x1="4" y1="5" x2="14" y2="15" />
                <line x1="14" y1="15" x2="24" y2="5" />
              </svg>
            ) : (
              <svg width="40" height="30">
                <line x1="4" y1="0" x2="14" y2="10" />
                <line x1="14" y1="10" x2="4" y2="20" />
              </svg>
            )}
          </span>
          <span>{title}</span>
        </div>
      </TitleBox>
      {expanded && <ContentDiv width={width}>{content}</ContentDiv>}
    </>
  );
};

ExpandingBox.propTypes = propTypes;

export default ExpandingBox;
