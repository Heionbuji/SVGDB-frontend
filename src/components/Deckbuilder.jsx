/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import Deck from './Deck';
import LazyLoadedImage from './LazyLoadedImage';
import Dropdown from './Dropdown';
import { Container, Tooltip, Divider } from '../styles/deckbuilderStyles';

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
  const [allCards, setAllCards] = useState(null);
  const [shownCards, setShownCards] = useState(null);
  const [currentDeck, setCurrentDeck] = useState({});
  const [tooltip, setTooltip] = useState(null);
  const thumbnailUrl = `${process.env.REACT_APP_ASSETS_URL}/thumbnails/C_`;
  const filters = {
    NEUTRAL: '0',
  };
  const expansions = {
    "Fortune's Hand": '117',
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

        filter = expansionFilter
          ? filter
          && expansionFilter.some((item) => id.substring(0, 3) === expansions[item])
          : filter;
        filter = typeFilter ? filter
          && typeFilter.some((type) => (type === 'Amulet' ? id.substring(5, 6) === allCardTypes.Amulet
            || id.substring(5, 6) === allCardTypes.AmuletCD
            : id.substring(5, 6) === allCardTypes[type]))
          : filter;
        filter = rarityFilter ? filter
          && rarityFilter.some((rarity) => id.substring(4, 5) === rarities[rarity])
          : filter;
        filter = costFilter
          ? filter
          && costFilter.some((cost) => (cost === '8+' ? allCards[id].pp_ >= 8 : allCards[id].pp_.toString() === cost))
          : filter;

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
  ]);

  useEffect(() => { // reset deck whenever class is changed (maybe add confirmation later)
    setCurrentDeck({});
  }, [selectedClass]);

  const updateTooltip = (e, id) => {
    const card = allCards[id];
    setTooltip(
      <Tooltip style={{ left: e.target.x + e.target.width + 10, top: e.target.y }}>
        <b>{card.name_}</b>
        <span>{card.craft_} {card.pp_}pp {card.rarity_} {card.type_} {card.trait_ !== '-' ? `(${card.trait_})` : ''}</span>
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
      if (currentDeck[card] >= 3) { return; }
      const curr = { ...currentDeck };
      curr[card] += 1;
      setCurrentDeck(curr);
    } else {
      const curr = { ...currentDeck };
      curr[card] = 1;
      setCurrentDeck(curr);
    }
  };

  const handleExpansionChange = (expansion) => {
    if (!expansionFilter) {
      setExpansionFilter([expansion]);
    } else {
      const index = expansionFilter.indexOf(expansion);
      if (index !== -1) {
        const temp = [...expansionFilter];
        temp.splice(index, 1);
        setExpansionFilter(temp.length === 0 ? null : temp);
      } else {
        setExpansionFilter([...expansionFilter, expansion]);
      }
    }
  };

  const handleCostChange = (cost) => {
    if (!costFilter) {
      setCostFilter([cost]);
    } else {
      const index = costFilter.indexOf(cost);
      if (index !== -1) {
        const temp = [...costFilter];
        temp.splice(index, 1);
        setCostFilter(temp.length === 0 ? null : temp);
      } else {
        setCostFilter([...costFilter, cost]);
      }
    }
  };

  const handleTypeChange = (type) => {
    if (!typeFilter) {
      setTypeFilter([type]);
    } else {
      const index = typeFilter.indexOf(type);
      if (index !== -1) {
        const temp = [...typeFilter];
        temp.splice(index, 1);
        setTypeFilter(temp.length === 0 ? null : temp);
      } else {
        setTypeFilter([...typeFilter, type]);
      }
    }
  };

  const handleRarityChange = (rarity) => {
    if (!typeFilter) {
      setRarityFilter([rarity]);
    } else {
      const index = rarityFilter.indexOf(rarity);
      if (index !== -1) {
        const temp = [...rarityFilter];
        temp.splice(index, 1);
        setRarityFilter(temp.length === 0 ? null : temp);
      } else {
        setRarityFilter([...rarityFilter, rarity]);
      }
    }
  };

  return (
    <Container>
      <div style={{ backgroundColor: '#555' }}>
        <span>Select class:</span>
        <span>
          <button type="button" onClick={() => setSelectedClass('1')}>Forest</button>
          <button type="button" onClick={() => setSelectedClass('2')}>Sword</button>
          <button type="button" onClick={() => setSelectedClass('3')}>Rune</button>
          <button type="button" onClick={() => setSelectedClass('4')}>Dragon</button>
          <button type="button" onClick={() => setSelectedClass('5')}>Shadow</button>
          <button type="button" onClick={() => setSelectedClass('6')}>Blood</button>
          <button type="button" onClick={() => setSelectedClass('7')}>Haven</button>
          <button type="button" onClick={() => setSelectedClass('8')}>Portal</button>
        </span>
        <Dropdown
          type="select"
          text={t('Expansion')}
          choices={Object.keys(expansions).map((exp) => ({ title: exp }))}
          handleChange={handleExpansionChange}
          extended
        />
        <Dropdown
          type="select"
          text={t('Cost')}
          choices={['0', '1', '2', '3', '4', '5', '6', '7', '8+'].map((num) => ({ title: num }))}
          handleChange={handleCostChange}
        />
        <Dropdown
          type="select"
          text={t('Type')}
          choices={Object.keys(cardTypes).map((type) => ({ title: type }))}
          handleChange={handleTypeChange}
        />
        <Dropdown
          type="select"
          text={t('Rarity')}
          choices={Object.keys(rarities).map((type) => ({ title: type }))}
          handleChange={handleRarityChange}
        />
        <span>Include neutrals:</span>
        <label htmlFor="filterNeutral">
          <select
            name="neutral"
            onChange={(e) => {
              setIncludeNeutrals(e.target.value);
            }}
          >
            <option value="Yes">{t('Yes')}</option>
            <option value="">{t('Class cards only')}</option>
            <option value="Only">{t('Neutrals only')}</option>
          </select>
        </label>
        <span>Cost:</span>
        <label htmlFor="filterCost">
          <select
            name="cost"
            onChange={(e) => {
              setCostFilter(e.target.value);
            }}
          >
            <option value="">{t('All')}</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8+</option>
          </select>
        </label>
        <span>Rarity:</span>
        <label htmlFor="filterRarity">
          <select
            name="rarity"
            onChange={(e) => {
              setRarityFilter(e.target.value);
            }}
          >
            <option value="">{t('All')}</option>
            <option value="1">{t('Bronze')}</option>
            <option value="2">{t('Silver')}</option>
            <option value="3">{t('Gold')}</option>
            <option value="4">{t('Legendary')}</option>
          </select>
        </label>
        <span>Type:</span>
        <label htmlFor="filterType">
          <select
            name="type"
            onChange={(e) => {
              setTypeFilter(e.target.value);
            }}
          >
            <option value="">{t('All')}</option>
            <option value="1">{t('Follower')}</option>
            <option value="2">{t('Amulet')}</option>
            <option value="3">{t('Countdown Amulet')}</option>
            <option value="4">{t('Spell')}</option>
          </select>
        </label>
      </div>
      <div style={{ margin: '15px 0 0 15px' }}>
        <div style={{ width: '70%', display: 'inline-block' }}>
          {shownCards && selectedClass && Object.keys(shownCards)
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
            ))}
        </div>
        <div style={{ width: '20%', position: 'fixed', display: 'inline' }}>
          <Deck
            deck={currentDeck}
            setDeck={setCurrentDeck}
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
