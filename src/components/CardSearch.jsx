import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';

const getSuggestions = (value, json) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength < 2 ? [] : json.filter((card) =>
    card.toLowerCase().slice(0, inputLength) === inputValue,
  );
};
const getSuggestionValue = (suggestion) => suggestion;
const renderSuggestion = (suggestion) => (
  <div>
    {suggestion}
  </div>
);

const CardSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const [json, setJson] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3002/json').then((res) => res.json()).then((data) => setJson(data));
  }, []);

  const onChange = (event, { newValue }) => {
    setSearchValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value, json));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: 'Search Cards',
    value: searchValue,
    onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default CardSearch;
