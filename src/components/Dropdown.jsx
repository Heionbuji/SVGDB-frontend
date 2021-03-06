import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import DropdownItem from './DropdownItem';

const DropdownTitle = styled.span`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  min-width: ${(props) => (props.noMin ? '0px' : '100px')};
  @media screen and (min-width: 1700px) {
    min-width: 100px;
  }
`;

const DropdownContent = styled.ul`
  margin: 0px;
  padding: 0px;
  padding-top: 1px;
  margin-top: -1px;
  background-color: black;
  color: white;
  display: ${(props) => (props.Visible ? 'block' : 'none')};
  position: absolute;
  z-index: 3;
  width: ${(props) => (props.Extended ? '200px' : '100%')};
  min-width: 100px;
  max-height: 75vh;
  overflow-y: auto;
`;

const StyledDropdownItem = styled.li`
  list-style: none;
  padding: 10px 5px;
  user-select: none;
  background-color: ${(props) => (props.selected ? '#333' : 'auto')};
  &:hover {
    background-color: ${(props) => (props.noHover ? 'auto' : '#333')};
    cursor: ${(props) => (props.noHover ? 'auto' : 'pointer')};
  }
  input:hover {
    cursor: pointer;
  }
`;

const propTypes = {
  text: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    linkTo: PropTypes.string,
  })).isRequired,
  type: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  extended: PropTypes.bool,
  checkboxClass: PropTypes.string,
  bgColor: PropTypes.string.isRequired,
  noMin: PropTypes.bool,
};

const Dropdown = ({
  text, choices, type, handleChange, extended, checkboxClass, bgColor, noMin = false,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  return (
    <>
      <div
        style={
          {
            position: 'relative',
            display: 'inline-block',
            height: '100%',
            lineHeight: 'normal',
            backgroundColor: bgColor || 'inherit',
            margin: '0 5px',
          }
        }
        onMouseEnter={() => setDropdownVisible(true)}
        onMouseLeave={() => setDropdownVisible(false)}
        className="spaced"
      >
        <DropdownTitle noMin={noMin}>
          <div style={{ margin: 'auto', height: '100%', padding: '0 5px' }}>{text}</div>
        </DropdownTitle>
        {type === 'nav' && (
          <DropdownContent Visible={dropdownVisible}>
            {choices.map((choice) => (
              <Link to={choice.linkTo} key={`link${choice.title}`}>
                <StyledDropdownItem>{choice.title}</StyledDropdownItem>
              </Link>
            ))}
          </DropdownContent>
        )}
        {type === 'select' && (
        <DropdownContent Extended={extended} Visible={dropdownVisible}>
          {choices.map((choice) => (
            <DropdownItem
              choice={choice}
              checkboxClass={checkboxClass}
              handleChange={handleChange}
              key={choice.title}
            />
          ))}
        </DropdownContent>
        )}
      </div>
    </>
  );
};

Dropdown.propTypes = propTypes;

Dropdown.defaultProps = {
  handleChange: () => {},
  extended: false,
  checkboxClass: null,
  noMin: false,
};

export default Dropdown;
