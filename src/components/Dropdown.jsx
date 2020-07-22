import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DropdownTitle = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const DropdownContent = styled.ul`
  margin: 0px;
  padding: 0px;
  padding-top: 1px;
  margin-top: -1px;
  background-color: black;
  color: white;
  display: block;
  position: absolute;
  z-index: 3;
  width: 100%;
`;

const DropdownItem = styled.li`
  list-style: none;
  padding-top: 10px;
  padding-bottom: 10px;
  &:hover {
    background-color: #333;
  }
`;

const propTypes = {
  text: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf({}).isRequired,
};

const Dropdown = ({ text, choices }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  return (
    <>
      <div
        style={{ position: 'relative', display: 'inline-block' }}
        onMouseEnter={() => setDropdownVisible(true)}
        onMouseLeave={() => setDropdownVisible(false)}
        className="spaced"
      >
        <DropdownTitle>
          <div>{text}</div>
        </DropdownTitle>
        {dropdownVisible && (
          <DropdownContent>
            {choices.map((choice) => (
              <DropdownItem>{choice}</DropdownItem>
            ))}
          </DropdownContent>
        )}
      </div>
    </>
  );
};

Dropdown.propTypes = propTypes;

export default Dropdown;
