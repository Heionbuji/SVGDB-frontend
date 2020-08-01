import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { StyledAutosuggest } from '../styles/globalStyles';

const getSuggestions = (value, json) => {
  const names = Object.keys(json);
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength < 2 ? [] : names.filter((card) =>
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
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/json/${i18n.language}`).then((res) => res.json()).then((data) => setJson(data));
  }, [i18n.language]);

  const onChange = (event, { newValue }) => {
    switch (event.type) {
      case 'change':
        setSearchValue(newValue);
        break;
      case 'click': {
        setSearchValue(newValue);
        history.push(`/cards/${json[newValue]}`);
        break;
      }
      case 'keydown': {
        if (event.keyCode === 13) {
          setSearchValue(newValue);
          history.push(`/cards/${json[newValue]}`);
        }
        break;
      }
      default:
    }
  };
  const onKeyDown = (event) => {
    if (!event.target.attributes['aria-activedescendant'] && suggestions[0]) {
      if (event.keyCode === 13) {
        const newValue = suggestions[0];
        setSearchValue(newValue);
        history.push(`/cards/${json[newValue]}`);
      }
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
    onKeyDown,
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
