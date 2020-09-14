/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-underscore-dangle */
import React, {
  useEffect, useState, useMemo, useRef,
} from 'react';
import { useParams } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import Deck from './Deck';
import LazyLoadedImage from './LazyLoadedImage';
import Dropdown from './Dropdown';
import DeckHeader from './DeckHeader';
import {
  Container,
  Tooltip,
  Divider,
  FilterContainer,
  TopBar,
  StyledButton,
} from '../styles/deckbuilderStyles';

const propTypes = {
  t: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    language: PropTypes.string,
  }).isRequired,
};

const Deckbuilder = ({ t, i18n }) => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [expansionFilter, setExpansionFilter] = useState(null);
  const [includeNeutrals, setIncludeNeutrals] = useState(true);
  const [rarityFilter, setRarityFilter] = useState(null);
  const [costFilter, setCostFilter] = useState(null);
  const [typeFilter, setTypeFilter] = useState(null);
  const [searchFilter, setSearchFilter] = useState(null);
  const [allCards, setAllCards] = useState(null);
  const [shownCards, setShownCards] = useState(null);
  const [currentDeck, setCurrentDeck] = useState({});
  const [tooltip, setTooltip] = useState(null);
  const thumbnailUrl = `${process.env.REACT_APP_ASSETS_URL}/thumbnails/C_`;
  const [currDeckCount, setCurrDeckCount] = useState(0);
  const deckHashRef = useRef(null);
  const CARD_DUPE_MAX = 3;
  const filters = {
    NEUTRAL: '0',
  };
  const expansions = {
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
  const parseHash = () => {
    if (!/\d\.\d\./.test(deckHashRef.current.substring(0, 4))) { return; }
    const radix = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';
    const craft = deckHashRef.current.substring(2, 3);
    const hashes = deckHashRef.current.substring(4).split('.');
    const newDeck = {};
    hashes.forEach((hash) => {
      let cardId = 0;
      // eslint-disable-next-line no-param-reassign
      hash = hash.split('').reverse().join('');
      for (let i = 0; i < hash.length; i++) {
        cardId += radix.indexOf(hash.charAt(i)) * 64 ** i;
      }
      cardId = cardId.toString();
      if (newDeck[cardId]) {
        if (newDeck[cardId] >= CARD_DUPE_MAX) { return; }
        newDeck[cardId] += 1;
      } else {
        newDeck[cardId] = 1;
      }
      setCurrDeckCount(currDeckCount + 1);
    });
    setCurrentDeck(newDeck);
    setSelectedClass(craft);
  };
  deckHashRef.current = useParams().deckHash;
  useEffect(() => {
    if (deckHashRef.current) { parseHash(); }
  }, [deckHashRef]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/${i18n.language}`)
      .then((res) => res.json())
      .then((resJson) => { setAllCards(resJson); setShownCards(resJson); });
  }, [i18n.language]);

  useEffect(() => { // filter shown cards
    if (allCards && selectedClass) {
      const newShown = {};
      const keys = Object.keys(allCards).filter((card) => {
        const id = allCards[card].id_.toString();
        let filter = id.substring(0, 1) !== '9' && id.substring(0, 1) !== '7';

        if (includeNeutrals) {
          if (includeNeutrals === 'Only') {
            filter = filter && id.substring(3, 4) === filters.NEUTRAL;
          } else {
            filter = filter
              && (id.substring(3, 4) === selectedClass || id.substring(3, 4) === filters.NEUTRAL);
          }
        } else {
          filter = filter && id.substring(3, 4) === selectedClass;
        }

        if (expansionFilter && expansionFilter.filter && expansionFilter.filter.length > 0 && !expansionFilter.reverse) {
          filter = filter && expansionFilter.filter.some((item) => id.substring(0, 3) === expansions[item]);
        } else if (expansionFilter && expansionFilter.filter && expansionFilter.filter.length > 0 && expansionFilter.reverse) {
          filter = filter && expansionFilter.filter.every((item) => id.substring(0, 3) !== expansions[item]);
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
            (type === 'Amulet' ? id.substring(5, 6) === allCardTypes.Amulet
            || id.substring(5, 6) === allCardTypes.AmuletCD
              : id.substring(5, 6) === allCardTypes[type])
          ));
        } else if (typeFilter && typeFilter.filter && typeFilter.filter.length > 0 && typeFilter.reverse) {
          filter = filter && typeFilter.filter.every((type) => (
            (type === 'Amulet' ? id.substring(5, 6) !== allCardTypes.Amulet
            && id.substring(5, 6) !== allCardTypes.AmuletCD
              : id.substring(5, 6) !== allCardTypes[type])
          ));
        }

        if (rarityFilter && rarityFilter.filter && rarityFilter.filter.length > 0 && !rarityFilter.reverse) {
          filter = filter && rarityFilter.filter.some((rarity) => id.substring(4, 5) === rarities[rarity]);
        } else if (rarityFilter && rarityFilter.filter && rarityFilter.filter.length > 0 && rarityFilter.reverse) {
          filter = filter && rarityFilter.filter.every((rarity) => id.substring(4, 5) !== rarities[rarity]);
        }

        if (searchFilter && searchFilter.filter && !searchFilter.reverse) {
          const words = searchFilter.filter.toLowerCase().split(' ');
          filter = filter
            && words.every((word) => (
              (allCards[id].name_.toLowerCase().includes(word)
              || allCards[id].baseEffect_.toLowerCase().includes(word)
              || allCards[id].trait_.toLowerCase().includes(word)
              || allCards[id].evoEffect_.toLowerCase().includes(word))
            ));
        } else if (searchFilter && searchFilter.filter && searchFilter.reverse) {
          const words = searchFilter.filter.toLowerCase().split(' ');
          filter = filter
          && !words.some((word) => (
            (allCards[id].name_.toLowerCase().includes(word)
            || allCards[id].baseEffect_.toLowerCase().includes(word)
            || allCards[id].trait_.toLowerCase().includes(word)
            || allCards[id].evoEffect_.toLowerCase().includes(word))
          ));
        }

        return (filter);
      });
      keys.forEach((key) => { newShown[key] = allCards[key]; });
      setShownCards(newShown);
    }
  }, [
    allCards,
    selectedClass,
    expansionFilter,
    costFilter,
    typeFilter,
    rarityFilter,
    includeNeutrals,
    searchFilter,
  ]);

  const changeClass = (craft) => {
    setCurrentDeck({});
    setCurrDeckCount(0);
    setSelectedClass(craft);
  };

  const updateTooltip = (e, id) => {
    const card = allCards[id];
    const element = e.target.getBoundingClientRect();
    setTooltip(
      <Tooltip style={{ left: element.x + element.width + 10, top: element.y + window.scrollY }}>
        <b>{card.name_}</b>
        <span>
          {card.craft_} {card.pp_}pp {card.rarity_} {card.type_} {card.trait_ !== '-' ? `(${card.trait_})` : ''}
        </span>
        <span>Expansion: {card.expansion_}</span>
        <span>Rotation: {card.rotation_.toString()}</span>
        <Divider />
        <span>Base:</span>
        <span style={{ paddingLeft: '10px' }}>{card.baseEffect_}</span>
        {card.type_ === 'Follower' && (
          <>
            <span>Evo:</span>
            <span style={{ paddingLeft: '10px' }}>{card.evoEffect_}</span>
          </>
        )}
      </Tooltip>,
    );
  };

  const addToDeck = (card) => {
    if (currentDeck[card]) {
      if (currentDeck[card] >= CARD_DUPE_MAX) { return; }
      const curr = { ...currentDeck };
      curr[card] += 1;
      setCurrentDeck(curr);
    } else {
      const curr = { ...currentDeck };
      curr[card] = 1;
      setCurrentDeck(curr);
    }
    setCurrDeckCount(currDeckCount + 1);
  };

  const renderImages = () => (
    shownCards && Object.keys(shownCards)
      .sort((a, b) => shownCards[a].pp_ > shownCards[b].pp_)
      .map((key) => (
        <span
          style={{ pointerEvents: 'none' }}
          key={`div${key}`}
          onMouseEnter={(e) => updateTooltip(e, key)}
          onMouseLeave={() => setTooltip(null)}
          onClick={() => addToDeck(key)}
          className="cardhover"
        >
          <LazyLoadedImage
            key={`img${key}`}
            src={`${thumbnailUrl}${key}.png`}
            alt=""
          />
        </span>
      ))
  );

  // Without currentDeck in the dependencies, the deck won't render properly.
  // Not sure why, adding to the deck is now slow (50-90ms),
  // but nothing's really moving when you do that so it's not noticeable.
  const cardList = useMemo(() => renderImages(), [shownCards, currentDeck]);

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

  const handleCardRemoval = (deck) => {
    setCurrDeckCount(currDeckCount - 1);
    setCurrentDeck(deck);
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
      <span style={{ paddingTop: '10px' }}>
        <span>Select class:</span>
        <span>
          <button type="button" onClick={() => changeClass('1')}>Forest</button>
          <button type="button" onClick={() => changeClass('2')}>Sword</button>
          <button type="button" onClick={() => changeClass('3')}>Rune</button>
          <button type="button" onClick={() => changeClass('4')}>Dragon</button>
          <button type="button" onClick={() => changeClass('5')}>Shadow</button>
          <button type="button" onClick={() => changeClass('6')}>Blood</button>
          <button type="button" onClick={() => changeClass('7')}>Haven</button>
          <button type="button" onClick={() => changeClass('8')}>Portal</button>
        </span>
      </span>
      <TopBar>
        <StyledButton type="button" onClick={resetAllFilters}>
          Reset all filters
        </StyledButton>
        <FilterContainer
          active={searchFilter && searchFilter.filter}
          reverse={searchFilter && searchFilter.filter && searchFilter.reverse}
        >
          <span>
            <input
              type="checkbox"
              onChange={(e) => setSearchFilter({ ...searchFilter, reverse: e.target.checked })}
              className="Search"
            />
            <span>NOT</span>
            <input
              type="text"
              className="Search"
              placeholder="Search card text"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setSearchFilter({ ...searchFilter, filter: e.target.value });
                }
              }}
              style={{ margin: '5px' }}
            />
          </span>
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
          <span>
            <input
              type="checkbox"
              onChange={(e) => setExpansionFilter({ ...expansionFilter, reverse: e.target.checked })}
              className="Expansion"
            />
            <span>NOT</span>
            <Dropdown
              type="select"
              text={t('Expansion')}
              checkboxClass="Expansion"
              choices={Object.keys(expansions).map((exp) => ({ title: exp }))}
              handleChange={handleFilterChange}
              extended
              bgColor="rgb(16, 37, 56)"
            />
          </span>
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
          <span>
            <input
              type="checkbox"
              onChange={(e) => setCostFilter({ ...costFilter, reverse: e.target.checked })}
              className="Cost"
            />
            <span>NOT</span>
            <Dropdown
              type="select"
              text={t('Cost')}
              checkboxClass="Cost"
              choices={['0', '1', '2', '3', '4', '5', '6', '7', '8+'].map((num) => ({ title: num }))}
              handleChange={handleFilterChange}
              bgColor="rgb(16, 37, 56)"
            />
          </span>
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
          <span>
            <input
              type="checkbox"
              onChange={(e) => setTypeFilter({ ...typeFilter, reverse: e.target.checked })}
              className="Type"
            />
            <span>NOT</span>
            <Dropdown
              type="select"
              text={t('Type')}
              checkboxClass="Type"
              choices={Object.keys(cardTypes).map((type) => ({ title: type }))}
              handleChange={handleFilterChange}
              bgColor="rgb(16, 37, 56)"
            />
          </span>
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
          <span>
            <input
              type="checkbox"
              onChange={(e) => setRarityFilter({ ...rarityFilter, reverse: e.target.checked })}
              className="Rarity"
            />
            <span>NOT</span>
            <Dropdown
              type="select"
              text={t('Rarity')}
              checkboxClass="Rarity"
              choices={Object.keys(rarities).map((type) => ({ title: type }))}
              handleChange={handleFilterChange}
              bgColor="rgb(16, 37, 56)"
            />
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
        </FilterContainer>
        <span style={{ lineHeight: '10vh' }}>
          <span>Include neutrals:</span>
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
      <div style={{ margin: '15px 0 0 15px', height: '88vh', display: 'flex' }}>
        <div style={{
          width: '80%', display: 'inline-block', height: '88vh', overflow: 'auto',
        }}
        >
          {shownCards && selectedClass && cardList}
        </div>
        <div style={{
          width: '15%', marginLeft: '10px',
        }}
        >
          <DeckHeader
            deck={currentDeck}
            craft={selectedClass}
            deckCount={currDeckCount}
          />
          <Deck
            deck={currentDeck}
            setDeck={handleCardRemoval}
            cards={allCards}
            setTooltip={setTooltip}
          />
        </div>
        {tooltip && (tooltip)}
      </div>
    </Container>
  );
};

Deckbuilder.propTypes = propTypes;

export default withTranslation()(Deckbuilder);
