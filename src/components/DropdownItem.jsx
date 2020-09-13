import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ItemDiv = styled.div`
  padding: 10px 5px;
  user-select: none;
  background-color: ${(props) => (props.selected ? '#333' : 'auto')};
  &:hover {
    background-color: #333;
    cursor: pointer;
  }
  &>*:hover {
    cursor: pointer;
  }
`;

const propTypes = {
  choice: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  checkboxClass: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

const DropdownItem = ({ choice, checkboxClass, handleChange }) => {
  const checkbox = useRef(null);

  return (
    <label htmlFor={choice.title} key={choice.title}>
      <ItemDiv selected={checkbox.current && checkbox.current.checked}>
        <input
          type="checkbox"
          id={choice.title}
          value={choice.title}
          onChange={(e) => {
            handleChange(e.target.value, checkboxClass);
          }}
          className={checkboxClass}
          ref={checkbox}
        />
        <span>{choice.title}</span>
      </ItemDiv>
    </label>
  );
};

DropdownItem.propTypes = propTypes;

export default DropdownItem;
