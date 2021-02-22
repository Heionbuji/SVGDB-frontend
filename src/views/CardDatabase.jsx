/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-underscore-dangle */
import React, {
  useEffect, useState, useMemo,
} from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import LazyLoadedImage from '../components/LazyLoadedImage';
import Dropdown from '../components/Dropdown';
import MobileFilters from '../components/MobileFilters';

import {
  Container,
  Tooltip,
  Divider,
  FilterContainer,
  TopBar,
  StyledButton,
  StyledPortrait,
  InfoBubble,
  StyledFilterSelectors,
} from '../styles/deckbuilderStyles';

const propTypes = {
  t: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    language: PropTypes.string,
  }).isRequired,
};

const CardDatabase = ({ t, i18n }) => {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [expansionFilter, setExpansionFilter] = useState(null);
  const [includeNeutrals, setIncludeNeutrals] = useState(true);
  const [rarityFilter, setRarityFilter] = useState(null);
  const [costFilter, setCostFilter] = useState(null);
  const [typeFilter, setTypeFilter] = useState(null);
  const [searchFilter, setSearchFilter] = useState(null);
  const [allCards, setAllCards] = useState(null);
  const [shownCards, setShownCards] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const thumbnailUrl = `${process.env.REACT_APP_ASSETS_URL}/thumbnails/C_`;
  const filters = {
    NEUTRAL: '0',
  };
  const expansions = {
    'Eternal Awakening': '119',
    'Storm Over Rivayle': '118',
    'Fortunes Hand': '117',
    'World Uprooted': '116',
    'Ultimate Colosseum': '115',
    'Verdant Conflict': '114',
    'Rebirth of Glory': '113',
    'Steel Rebellion': '112',
    Altersphere: '111',
    'Omen of the Ten': '110',
    'Brigade of the Sky': '109',
    'Dawnbreak, Nightedge': '108',
    Chronogenesis: '107',
    'Starforged Legends': '106',
    'Wonderland Dreams': '105',
    'Tempest of the Gods': '104',
    'Rise of Bahamut': '103',
    'Darkness Evolved': '102',
    Classic: '101',
    Basic: '100',
    Token: '9',
    Alt: '7',
  };
  const cardTypes = {
    Follower: '1',
    Amulet: '2',
    Spell: '4',
  };
  const allCardTypes = {
    Follower: '1',
    Amulet: '2',
    AmuletCD: '3',
    Spell: '4',
  };
  const rarities = {
    Bronze: '1',
    Silver: '2',
    Gold: '3',
    Legendary: '4',
  };
  const crafts = [
    'Forestcraft',
    'Swordcraft',
    'Runecraft',
    'Dragoncraft',
    'Shadowcraft',
    'Bloodcraft',
    'Havencraft',
    'Portalcraft',
  ];

  const parseQuotedString = (input) => {
    const words = [];
    let startIndex = 0;
    let next = input.indexOf('"', startIndex);
    while (next >= 0) {
      if (startIndex > 0) {
        words.push(input.substring(startIndex, next));
      }
      startIndex = next + 1;
      next = input.indexOf('"', startIndex);
    }
    input.split(' ').forEach((splitInput) => {
      if (!words.some((word) => word.includes(splitInput.replace('"', '')))) { words.push(splitInput); }
    });
    return words;
  };

  const isMobileDisplay = () => window.screen.width < 640;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/${i18n.language}`)
      .then((res) => res.json())
      .then((resJson) => { setAllCards(resJson); setShownCards(resJson); });
  }, [i18n.language]);

  useEffect(() => { // filter shown cards
    if (allCards) {
      const newShown = {};
      const keys = Object.keys(allCards).filter((card) => {
        const id = allCards[card].id_.toString();
        let filter = id.substring(0, 1) !== '9';

        if (includeNeutrals) {
          if (includeNeutrals === 'Only') {
            filter = filter && id.substring(3, 4) === filters.NEUTRAL;
          } else {
            filter = filter
                && (selectedClasses.length === 0 ? true : selectedClasses.includes(id.substring(3, 4))
                || id.substring(3, 4) === filters.NEUTRAL);
          }
        } else {
          filter = filter && (selectedClasses.length === 0 ? true : selectedClasses.includes(id.substring(3, 4)));
        }

        if (expansionFilter && expansionFilter.filter && expansionFilter.filter.length > 0 && !expansionFilter.reverse) {
          filter = expansionFilter.filter.some((item) => id.substring(0, expansions[t(item)].length) === expansions[t(item)]);
        } else if (expansionFilter && expansionFilter.filter && expansionFilter.filter.length > 0 && expansionFilter.reverse) {
          filter = expansionFilter.filter.every((item) => id.substring(0, expansions[t(item)].length) !== expansions[t(item)]);
        }

        if (costFilter && costFilter.filter && costFilter.filter.length > 0 && !costFilter.reverse) {
          filter = filter && costFilter.filter.some((cost) => (
            cost === '8+' ? allCards[id].pp_ >= 8 : allCards[id].pp_.toString() === cost
          ));
        } else if (costFilter && costFilter.filter && costFilter.filter.length > 0 && costFilter.reverse) {
          filter = filter && costFilter.filter.every((cost) => (
            cost === '8+' ? allCards[id].pp_ < 8 : allCards[id].pp_.toString() !== cost
          ));
        }

        if (typeFilter && typeFilter.filter && typeFilter.filter.length > 0 && !typeFilter.reverse) {
          filter = filter && typeFilter.filter.some((type) => (
            (type === t('Amulet') ? id.substring(5, 6) === allCardTypes.Amulet
              || id.substring(5, 6) === allCardTypes.AmuletCD
              : id.substring(5, 6) === allCardTypes[t(type)])
          ));
        } else if (typeFilter && typeFilter.filter && typeFilter.filter.length > 0 && typeFilter.reverse) {
          filter = filter && typeFilter.filter.every((type) => (
            (type === t('Amulet') ? id.substring(5, 6) !== allCardTypes.Amulet
              && id.substring(5, 6) !== allCardTypes.AmuletCD
              : id.substring(5, 6) !== allCardTypes[t(type)])
          ));
        }

        if (rarityFilter && rarityFilter.filter && rarityFilter.filter.length > 0 && !rarityFilter.reverse) {
          filter = filter && rarityFilter.filter.some((rarity) => id.substring(4, 5) === rarities[t(rarity)]);
        } else if (rarityFilter && rarityFilter.filter && rarityFilter.filter.length > 0 && rarityFilter.reverse) {
          filter = filter && rarityFilter.filter.every((rarity) => id.substring(4, 5) !== rarities[t(rarity)]);
        }

        if (searchFilter && searchFilter.filter && !searchFilter.reverse) {
          const hasQuotedString = searchFilter.filter.split('"').length >= 2;
          const words = hasQuotedString
            ? parseQuotedString(searchFilter.filter)
            : searchFilter.filter.toLowerCase().split(' ');
          let tokensText = '';
          if (allCards[id].tokens_) {
            allCards[id].tokens_.forEach((tokenId) => {
              tokensText += allCards[tokenId].baseEffect_;
              tokensText += allCards[tokenId].evoEffect_;
              tokensText += allCards[tokenId].name_;
            });
          }
          filter = filter
              && words.every((word) => (
                (allCards[id].name_.toLowerCase().includes(word)
                || allCards[id].baseEffect_.toLowerCase().includes(word)
                || allCards[id].trait_.toLowerCase().includes(word)
                || allCards[id].evoEffect_.toLowerCase().includes(word)
                || tokensText.toLowerCase().includes(word))
              ));
        } else if (searchFilter && searchFilter.filter && searchFilter.reverse) {
          const words = searchFilter.filter.toLowerCase().split(' ');
          let tokensText = '';
          if (allCards[id].tokens_) {
            allCards[id].tokens_.forEach((tokenId) => {
              tokensText += allCards[tokenId].baseEffect_;
              tokensText += allCards[tokenId].evoEffect_;
              tokensText += allCards[tokenId].name_;
            });
          }
          filter = filter
            && !words.some((word) => (
              (allCards[id].name_.toLowerCase().includes(word)
              || allCards[id].baseEffect_.toLowerCase().includes(word)
              || allCards[id].trait_.toLowerCase().includes(word)
              || allCards[id].evoEffect_.toLowerCase().includes(word)
              || tokensText.toLowerCase().includes(word))
            ));
        }

        return (filter);
      });
      keys.forEach((key) => { newShown[key] = allCards[key]; });
      setShownCards(newShown);
    }
  }, [
    allCards,
    selectedClasses,
    expansionFilter,
    costFilter,
    typeFilter,
    rarityFilter,
    includeNeutrals,
    searchFilter,
  ]);

  const toggleClass = (craft) => {
    if (selectedClasses.includes(craft)) {
      const classes = selectedClasses;
      classes.splice(classes.indexOf(craft), 1);
      setSelectedClasses([...classes]);
    } else {
      const classes = [...selectedClasses, craft];
      setSelectedClasses(classes);
    }
  };

  const updateTooltip = (e, id) => {
    const card = allCards[id];
    const element = e.target.getBoundingClientRect();
    const left = element.x > window.innerWidth * 0.7 ? element.x - element.width - 10 : element.x + element.width + 10;
    setTooltip(
      <Tooltip style={{ left, top: element.y + window.scrollY }}>
        <b>{card.name_}</b>
        <span>
          {card.craft_} {card.pp_}pp {card.rarity_} {card.type_} {card.trait_ !== '-' ? `(${card.trait_})` : ''}
        </span>
        <span>{t('set')}: {card.expansion_}</span>
        <span>{t('rotation')}: {card.rotation_.toString()}</span>
        <Divider />
        <span>{t('base')}:</span>
        <span style={{ paddingLeft: '10px' }}>{card.baseEffect_}</span>
        {card.type_ === t('Follower') && (
        <>
          <span>{t('Evo')}:</span>
          <span style={{ paddingLeft: '10px' }}>{card.evoEffect_}</span>
        </>
        )}
      </Tooltip>,
    );
  };

  const renderImages = () => {
    const isMobile = isMobileDisplay();
    const imgWidth = isMobile ? 133 : 199;
    const imgHeight = isMobile ? 173 : 259;
    return (
      shownCards && Object.keys(shownCards)
        .sort((a, b) => {
          if (shownCards[a].pp_ !== shownCards[b].pp_) {
            if (shownCards[a].pp_ > shownCards[b].pp_) { return 1; }
            return -1;
          }
          if (shownCards[a].type_ !== shownCards[b].type_) {
            if (shownCards[a].type_ === 'Follower') { return -1; }
            if (shownCards[a].type_ === 'Spell' && shownCards[b].type_ !== 'Follower') { return -1; }
          }
          return 1;
        })
        .map((key) => (
          <span
            style={{ pointerEvents: 'none' }}
            key={`div${key}`}
            onMouseEnter={(e) => updateTooltip(e, key)}
            onMouseLeave={() => setTooltip(null)}
            className="cardhover"
          >
            <Link to={`/cards/${key}`}>
              <LazyLoadedImage
                key={`img${key}`}
                src={`${thumbnailUrl}${key}.png`}
                alt=""
                width={imgWidth}
                height={imgHeight}
              />
            </Link>
          </span>
        ))
    );
  };

  const cardList = useMemo(() => renderImages(), [shownCards]);

  const handleFilterChange = (filterValue, type) => {
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

  const resetAllFilters = () => {
    document.querySelectorAll(
      'input.Search, input.Expansion, input.Cost, input.Type, input.Rarity',
    ).forEach((el) => { el.value = ''; el.checked = false; }); // eslint-disable-line no-param-reassign
    setSearchFilter({ filter: null, reverse: false });
    setExpansionFilter({ filter: [], reverse: false });
    setCostFilter({ filter: [], reverse: false });
    setTypeFilter({ filter: [], reverse: false });
    setRarityFilter({ filter: [], reverse: false });
    setIncludeNeutrals('Yes');
  };

  return (
    <Container>
      <div style={{ paddingTop: '10px', textAlign: 'center' }}>
        {crafts.map((craft, index) => (
          <StyledPortrait
            src={`${process.env.REACT_APP_ASSETS_URL}/thumbnails/class_select_thumbnail_${index + 1}.png`}
            onClick={() => toggleClass((index + 1).toString())}
            style={{ opacity: selectedClasses.includes((index + 1).toString()) ? '1' : '0.5' }}
            alt={craft}
            key={craft}
          />
        ))}
      </div>
      { isMobileDisplay()
        ? (
          <MobileFilters
            setSearch={setSearchFilter}
            setExpansion={setExpansionFilter}
            setCost={setCostFilter}
            setType={setTypeFilter}
            setRarity={setRarityFilter}
            setNeutrals={setIncludeNeutrals}
            expansions={expansions}
            rarities={rarities}
            cardTypes={cardTypes}
            resetAllFilters={resetAllFilters}
          />
        )
        : (
          <>
            <TopBar>
              <StyledButton type="button" onClick={resetAllFilters}>
                Reset all filters
              </StyledButton>
              <FilterContainer
                active={searchFilter && searchFilter.filter}
                reverse={searchFilter && searchFilter.filter && searchFilter.reverse}
                long
              >
                <StyledFilterSelectors>
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
                  <InfoBubble
                    onMouseEnter={(e) => {
                      const element = e.target.getBoundingClientRect();
                      setTooltip(
                        <Tooltip style={{ left: element.x + element.width + 10, top: element.y + window.scrollY }}>
                          <span>You can search for exact matches by wrapping the text in quotes.</span>
                          <span>
                            Example: If you want to search only for things that deal 4 damage,
                            you can search &quot;deal 4 damage&quot;.
                            If you want everything that deals some damage, you can search deal damage.
                          </span>
                          <span>
                            Tokens are also included in the search. For example, searching for storm will
                            also return everything that summons a ghost.
                          </span>
                        </Tooltip>,
                      );
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    ?
                  </InfoBubble>
                </StyledFilterSelectors>
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
              </FilterContainer>
              <FilterContainer
                active={expansionFilter && expansionFilter.filter && expansionFilter.filter.length > 0}
                reverse={expansionFilter && expansionFilter.filter && expansionFilter.reverse}
              >
                <StyledFilterSelectors>
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
                </StyledFilterSelectors>
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
              </FilterContainer>
              <FilterContainer
                active={costFilter && costFilter.filter && costFilter.filter.length > 0}
                reverse={costFilter && costFilter.filter && costFilter.reverse}
              >
                <StyledFilterSelectors>
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
                </StyledFilterSelectors>
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
              </FilterContainer>
              <FilterContainer
                active={typeFilter && typeFilter.filter && typeFilter.filter.length > 0}
                reverse={typeFilter && typeFilter.filter && typeFilter.reverse}
              >
                <StyledFilterSelectors>
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
                </StyledFilterSelectors>
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
              </FilterContainer>
              <FilterContainer
                active={rarityFilter && rarityFilter.filter && rarityFilter.filter.length > 0}
                reverse={rarityFilter && rarityFilter.filter && rarityFilter.reverse}
              >
                <StyledFilterSelectors>
                  <span>
                    <input
                      type="checkbox"
                      onChange={(e) => setRarityFilter({ ...rarityFilter, reverse: e.target.checked })}
                      className="Rarity"
                    />
                    <span>NOT</span>
                  </span>
                  <Dropdown
                    type="select"
                    text={t('Rarity')}
                    checkboxClass="Rarity"
                    choices={Object.keys(rarities).map((type) => ({ title: t(type) }))}
                    handleChange={handleFilterChange}
                    noMin
                    bgColor="rgb(16, 37, 56)"
                  />
                </StyledFilterSelectors>
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
              </FilterContainer>
              <span className="neutralFilter">
                <span>{t('Include neutrals')}:</span>
                <label htmlFor="filterNeutral">
                  <select
                    name="neutral"
                    onChange={(e) => {
                      setIncludeNeutrals(e.target.value);
                    }}
                    value={includeNeutrals}
                  >
                    <option value="Yes">{t('Yes')}</option>
                    <option value="">{t('Class cards only')}</option>
                    <option value="Only">{t('Neutrals only')}</option>
                  </select>
                </label>
              </span>
            </TopBar>
          </>
        )}
      <div style={{ margin: '15px 0 0 15px', height: '88vh', display: 'flex' }}>
        <div style={{
          display: 'inline-block', height: '88vh', overflow: 'auto',
        }}
        >
          {shownCards && cardList}
        </div>
        {tooltip && (tooltip)}
      </div>
    </Container>
  );
};

CardDatabase.propTypes = propTypes;

export default withTranslation()(CardDatabase);
