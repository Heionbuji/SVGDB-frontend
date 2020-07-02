import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { StyledAutosuggest } from '../styles/globalStyles';

const getSuggestions = (value, json) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength < 2 ? [] : json.filter((card) =>
    card.toLowerCase().includes(inputValue));
};
const getSuggestionValue = (suggestion) => suggestion;
const renderSuggestion = (suggestion) => (
  <div>
    {suggestion}
  </div>
);

const CardSearch = () => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');
  const [json, setJson] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetch('http://localhost:3002/json').then((res) => res.json()).then((data) => setJson(data));
  }, []);

  const onChange = (event, { newValue }) => {
    switch (event.type) {
      case 'change':
        setSearchValue(newValue);
        break;
      case 'click':
        setSearchValue(newValue);
        history.push(`/cards/${newValue}`);
        break;
      case 'keydown':
        if (event.keyCode === 13) {
          setSearchValue(newValue);
          history.push(`/cards/${newValue}`);
        }
        break;
      default:
    }
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value, json));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: t('cardSearch'),
    value: searchValue,
    onChange,
  };

  return (
    <StyledAutosuggest>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </StyledAutosuggest>
  );
};

export default CardSearch;
