import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const DropdownTitle = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  min-width: 100px;
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
`;

const DropdownItem = styled.li`
  list-style: none;
  padding: 10px 5px;
  &:hover {
    background-color: ${(props) => (props.noHover ? 'auto' : '#333')};
    cursor: ${(props) => (props.noHover ? 'auto' : 'pointer')};
  }
`;

const FlexDiv = styled.div`
  display: flex;
`;

const propTypes = {
  text: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    linkTo: PropTypes.string,
  })).isRequired,
  type: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
};

const Dropdown = ({
  text, choices, type, handleChange,
}) => {
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
          <div style={{ margin: 'auto' }}>{text}</div>
        </DropdownTitle>
        {dropdownVisible && type === 'nav' && (
          <DropdownContent>
            {choices.map((choice) => (
              <Link to={choice.linkTo} key={`link${choice.title}`}>
                <DropdownItem>{choice.title}</DropdownItem>
              </Link>
            ))}
          </DropdownContent>
        )}
        {type === 'select' && (
        <DropdownContent Extended Visible={dropdownVisible}>
          {choices.map((choice) => (
            <FlexDiv key={choice.title}>
              <DropdownItem noHover>
                <label htmlFor={choice.title} style={{ cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    id={choice.title}
                    value={choice.title}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                  {choice.title}
                </label>
              </DropdownItem>
            </FlexDiv>
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
};

export default Dropdown;
