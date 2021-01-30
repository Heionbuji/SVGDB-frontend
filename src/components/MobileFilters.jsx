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

  const handleFilterChange = (test) => test;

  return (
    <>
      <TopBar>
        <StyledButton type="button" onClick={() => setShowFilters(!showFilters)}>
          Filters
        </StyledButton>
      </TopBar>
      {showFilters && (
        <DimBackground>
          <MobilePopup>
            <div style={{
              display: 'flex', flexDirection: 'column', maxHeight: '85vh', height: '85vh', overflow: 'auto',
            }}
            >
              <FilterContainer
                active={searchFilter && searchFilter.filter}
                reverse={searchFilter && searchFilter.filter && searchFilter.reverse}
                long
              >
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
                    />
                    <span>NOT</span>
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
              </FilterContainer>
              <span className="flex">
                <div style={{ flexGrow: 1 }}>
                  <ExpandingBox
                    title={t('Expansion')}
                    width="90%"
                    content={(
                      <FilterContainer
                        active={expansionFilter && expansionFilter.filter && expansionFilter.filter.length > 0}
                        reverse={expansionFilter && expansionFilter.filter && expansionFilter.reverse}
                      >
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
                            />
                            <span>NOT</span>
                          </span>
                          <Dropdown
                            type="select"
                            text={t('Expansion')}
                            checkboxClass="Expansion"
                            choices={Object.keys(expansions).map((exp) => ({ title: t(exp) }))}
                            handleChange={handleFilterChange}
                            extended
                            noMin
                            bgColor="rgb(16, 37, 56)"
                          />
                        </div>
                      </FilterContainer>
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
                      <FilterContainer
                        active={costFilter && costFilter.filter && costFilter.filter.length > 0}
                        reverse={costFilter && costFilter.filter && costFilter.reverse}
                      >
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
                            />
                            <span>NOT</span>
                          </span>
                          <Dropdown
                            type="select"
                            text={t('Cost')}
                            checkboxClass="Cost"
                            choices={['0', '1', '2', '3', '4', '5', '6', '7', '8+'].map((num) => ({ title: num }))}
                            handleChange={handleFilterChange}
                            noMin
                            bgColor="rgb(16, 37, 56)"
                          />
                        </div>
                      </FilterContainer>
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
                      <FilterContainer
                        active={typeFilter && typeFilter.filter && typeFilter.filter.length > 0}
                        reverse={typeFilter && typeFilter.filter && typeFilter.reverse}
                      >
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
                            />
                            <span>NOT</span>
                          </span>
                          <Dropdown
                            type="select"
                            text={t('Type')}
                            checkboxClass="Type"
                            choices={Object.keys(cardTypes).map((type) => ({ title: t(type) }))}
                            handleChange={handleFilterChange}
                            noMin
                            bgColor="rgb(16, 37, 56)"
                          />
                        </div>
                      </FilterContainer>
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
                      <FilterContainer
                        active={rarityFilter && rarityFilter.filter && rarityFilter.filter.length > 0}
                        reverse={rarityFilter && rarityFilter.filter && rarityFilter.reverse}
                      >
                        <span>
                          <input
                            type="checkbox"
                            onChange={(e) => setRarityFilter({ ...rarityFilter, reverse: e.target.checked })}
                            className="Rarity"
                          />
                          <span>NOT</span>
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
                          {Object.keys(rarities).map((type) => (
                            <div style={{ display: 'inline-block' }} key={type}>
                              <input type="checkbox" />
                              <span>{ t(type) }</span>
                            </div>
                          ))}
                        </div>
                      </FilterContainer>
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
            <div style={{ display: 'flex', justifyContent: 'end', padding: '0 10px 10px 0' }}>
              <StyledButton>
                asd
              </StyledButton>
            </div>
          </MobilePopup>
        </DimBackground>
      )}

    </>
  );
};

MobileFilters.propTypes = propTypes;

export default MobileFilters;
