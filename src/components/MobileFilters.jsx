/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import Dropdown from './Dropdown';
import ExpandingBox from './ExpandingBox';

import {
  ActionButton,
  ActionButtonContainer,
  StyledListItem,
  StyledList,
  StyledPortrait,
  StyledButton,
  TopBar,
  FilterContainer,
  SmallPortrait,
  StyledTextInput,
  DeleteButton,
  MobilePopup,
} from '../styles/deckbuilderStyles';
import { DimBackground } from '../styles/leaderAnimationStyles';

const propTypes = {
  setSearch: PropTypes.func.isRequired,
  setExpansion: PropTypes.func.isRequired,
  setCost: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
  setRarity: PropTypes.func.isRequired,
  setNeutrals: PropTypes.func.isRequired,
  expansions: PropTypes.shape().isRequired,
  cardTypes: PropTypes.shape().isRequired,
  rarities: PropTypes.shape().isRequired,
};

const MobileFilters = (
  {
    setSearch,
    setExpansion,
    setCost,
    setType,
    setRarity,
    setNeutrals,
    expansions,
    cardTypes,
    rarities,
  },
) => {
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);
  const [searchFilter, setSearchFilter] = useState(null);
  const [expansionFilter, setExpansionFilter] = useState(null);
  const [costFilter, setCostFilter] = useState(null);
  const [typeFilter, setTypeFilter] = useState(null);
  const [rarityFilter, setRarityFilter] = useState(null);
  const [neutralFilter, setNeutralFilter] = useState(true);

  const handleFilterChange = (filterValue, type) => {
    console.log(filterValue, type);
    let setFilter;
    let filter;
    switch (type) {
      case 'Expansion':
        setFilter = setExpansionFilter;
        filter = expansionFilter;
        break;
      case 'Cost':
        setFilter = setCostFilter;
        filter = costFilter;
        break;
      case 'Type':
        setFilter = setTypeFilter;
        filter = typeFilter;
        break;
      case 'Rarity':
        setFilter = setRarityFilter;
        filter = rarityFilter;
        break;
      default:
        return;
    }
    if (!filter) {
      setFilter({ filter: [filterValue], reverse: false });
    } else if (!filter.filter && filter.reverse) {
      setFilter({ ...filter, filter: [filterValue] });
    } else if (!filter.filter && !filter.reverse) {
      setFilter({ filter: [filterValue], reverse: false });
    } else {
      const index = filter.filter.indexOf(filterValue);
      if (index !== -1) {
        const temp = [...filter.filter];
        temp.splice(index, 1);
        setFilter({ ...filter, filter: temp.length === 0 ? [] : temp });
      } else {
        setFilter({ ...filter, filter: [...filter.filter, filterValue] });
      }
    }
  };

  const toggleShowFilters = () => setShowFilters(!showFilters);
  const applyFilters = () => {
    setSearch(searchFilter);
    setExpansion(expansionFilter);
    setCost(costFilter);
    setType(typeFilter);
    setRarity(rarityFilter);
    setNeutrals(neutralFilter);
    toggleShowFilters();
  };

  return (
    <>
      <TopBar>
        <StyledButton type="button" onClick={toggleShowFilters}>
          {t('Filters')}
        </StyledButton>
      </TopBar>
      <DimBackground style={{ display: showFilters ? 'inherit' : 'none' }}>
        <MobilePopup>
          <h2 style={{ textAlign: 'center', marginBottom: 0 }}>{t('Filters')}</h2>
          <div style={{
            display: 'flex', flexDirection: 'column', height: '75vh', overflow: 'auto',
          }}
          >
            <div style={{ paddingBottom: '10px' }}>
              <h3 style={{ marginBottom: 0 }}>{t('Search')}</h3>
              <StyledButton
                type="button"
                onClick={() => {
                  setSearchFilter({ filter: null, reverse: false });
                  // eslint-disable-next-line no-param-reassign
                  document.querySelectorAll('input.Search').forEach((el) => { el.value = ''; el.checked = false; });
                }}
              >
                Reset
              </StyledButton>
              <div>
                <span>
                  <input
                    type="checkbox"
                    onChange={(e) => setSearchFilter({ ...searchFilter, reverse: e.target.checked })}
                    className="Search"
                    id="Search"
                  />
                  <label htmlFor="Search">NOT</label>
                </span>
                <input
                  type="text"
                  className="Search"
                  placeholder={t('Search card text')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setSearchFilter({ ...searchFilter, filter: e.target.value });
                    }
                  }}
                  style={{ margin: '0 0 2px 3px' }}
                />
              </div>
            </div>
            <span className="flex">
              <div style={{ flexGrow: 1 }}>
                <ExpandingBox
                  title={t('Expansion')}
                  width="90%"
                  content={(
                    <div>
                      <StyledButton
                        type="button"
                        onClick={() => {
                          setExpansionFilter({ filter: [], reverse: false });
                          // eslint-disable-next-line no-param-reassign
                          document.querySelectorAll('input.Expansion').forEach((el) => { el.checked = false; });
                        }}
                      >
                        Reset
                      </StyledButton>
                      <div>
                        <span>
                          <input
                            type="checkbox"
                            onChange={(e) => setExpansionFilter({ ...expansionFilter, reverse: e.target.checked })}
                            className="Expansion"
                            id="Expansion"
                          />
                          <label htmlFor="Expansion">NOT</label>
                        </span>
                        {Object.keys(expansions).map((exp) => (
                          <div style={{ display: 'block' }} key={exp}>
                            <input
                              type="checkbox"
                              value={exp}
                              id={exp}
                              className="Expansion"
                              onChange={(e) => {
                                handleFilterChange(t(e.target.value), 'Expansion');
                              }}
                            />
                            <label htmlFor={exp}>{ t(exp) }</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                />
              </div>
            </span>
            <span className="flex">
              <div style={{ flexGrow: 1 }}>
                <ExpandingBox
                  title={t('Cost')}
                  width="90%"
                  content={(
                    <div>
                      <StyledButton
                        type="button"
                        onClick={() => {
                          setCostFilter({ filter: [], reverse: false });
                          // eslint-disable-next-line no-param-reassign
                          document.querySelectorAll('input.Cost').forEach((el) => { el.checked = false; });
                        }}
                      >
                        Reset
                      </StyledButton>
                      <div>
                        <span>
                          <input
                            type="checkbox"
                            onChange={(e) => setCostFilter({ ...costFilter, reverse: e.target.checked })}
                            className="Cost"
                            id="Cost"
                          />
                          <label htmlFor="Cost">NOT</label>
                        </span>
                        {['0', '1', '2', '3', '4', '5', '6', '7', '8+'].map((num) => (
                          <div style={{ display: 'inline-block' }} key={num}>
                            <input
                              type="checkbox"
                              id={num}
                              value={num}
                              className="Cost"
                              onChange={(e) => {
                                handleFilterChange(e.target.value, 'Cost');
                              }}
                            />
                            <label htmlFor={num}>{ num }</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                />
              </div>
            </span>
            <span className="flex">
              <div style={{ flexGrow: 1 }}>
                <ExpandingBox
                  title={t('Type')}
                  width="90%"
                  content={(
                    <div>
                      <StyledButton
                        type="button"
                        onClick={() => {
                          setTypeFilter({ filter: [], reverse: false });
                          // eslint-disable-next-line no-param-reassign
                          document.querySelectorAll('input.Type').forEach((el) => { el.checked = false; });
                        }}
                      >
                        Reset
                      </StyledButton>
                      <div>
                        <span>
                          <input
                            type="checkbox"
                            onChange={(e) => setTypeFilter({ ...typeFilter, reverse: e.target.checked })}
                            className="Type"
                            id="Type"
                          />
                          <label htmlFor="Type">NOT</label>
                        </span>
                        {Object.keys(cardTypes).map((type) => (
                          <div style={{ display: 'inline-block' }} key={type}>
                            <input
                              type="checkbox"
                              id={type}
                              value={type}
                              className="Type"
                              onChange={(e) => {
                                handleFilterChange(t(e.target.value), 'Type');
                              }}
                            />
                            <label htmlFor={type}>{ t(type) }</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                />
              </div>
            </span>
            <span className="flex">
              <div style={{ flexGrow: 1 }}>
                <ExpandingBox
                  title={t('Rarity')}
                  width="90%"
                  content={(
                    <div
                      active={rarityFilter && rarityFilter.filter && rarityFilter.filter.length > 0}
                      reverse={rarityFilter && rarityFilter.filter && rarityFilter.reverse}
                    >
                      <span>
                        <input
                          type="checkbox"
                          onChange={(e) => setRarityFilter({ ...rarityFilter, reverse: e.target.checked })}
                          className="Rarity"
                          id="Rarity"
                        />
                        <label htmlFor="Rarity">NOT</label>
                      </span>
                      <StyledButton
                        type="button"
                        onClick={() => {
                          setRarityFilter({ filter: [], reverse: false });
                          // eslint-disable-next-line no-param-reassign
                          document.querySelectorAll('input.Rarity').forEach((el) => { el.checked = false; });
                        }}
                      >
                        Reset
                      </StyledButton>
                      <div>
                        {Object.keys(rarities).map((rarity) => (
                          <div style={{ display: 'inline-block' }} key={rarity}>
                            <input
                              type="checkbox"
                              id={rarity}
                              value={rarity}
                              className="Rarity"
                              onChange={(e) => {
                                handleFilterChange(t(e.target.value), 'Rarity');
                              }}
                            />
                            <label htmlFor={rarity}>{ t(rarity) }</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                />
              </div>
            </span>
            <span className="neutralFilter">
              <span>{t('Include neutrals')}:</span>
              <label htmlFor="filterNeutral">
                <select
                  name="neutral"
                  onChange={(e) => {
                    setNeutralFilter(e.target.value);
                  }}
                  value={neutralFilter}
                >
                  <option value="Yes">{t('Yes')}</option>
                  <option value="">{t('Class cards only')}</option>
                  <option value="Only">{t('Neutrals only')}</option>
                </select>
              </label>
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 10px 10px 0' }}>
            <ActionButtonContainer>
              <ActionButton onClick={applyFilters}>
                {t('OK')}
              </ActionButton>
              <ActionButton onClick={toggleShowFilters}>
                {t('Cancel')}
              </ActionButton>
            </ActionButtonContainer>
          </div>
        </MobilePopup>
      </DimBackground>

    </>
  );
};

MobileFilters.propTypes = propTypes;

export default MobileFilters;
