/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import Deck from './Deck';
import LazyLoadedImage from './LazyLoadedImage';
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
        filter = includeNeutrals
          ? filter
            && (id.substring(3, 4) === selectedClass || id.substring(3, 4) === filters.NEUTRAL)
          : filter && id.substring(3, 4) === selectedClass;
        // THESE NEED TO BE MULTI CHOICE
        filter = expansionFilter ? filter && id.substring(0, 3) === expansionFilter : filter;
        filter = typeFilter ? filter && id.substring(5, 6) === typeFilter : filter;
        filter = rarityFilter ? filter && id.substring(4, 5) === rarityFilter : filter;
        filter = costFilter ? filter && allCards[id].pp_.toString() === costFilter : filter;

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
        <span>Expansion:</span>
        <label htmlFor="filterExpansion">
          <select
            name="expansion"
            onChange={(e) => {
              setExpansionFilter(e.target.value);
            }}
          >
            <option value="">{t('All')}</option>
            <option value="117">{t("Fortune's hand")}</option>
            <option value="116">{t('World Uprooted')}</option>
            <option value="115">{t('Ultimate Colosseum')}</option>
            <option value="114">{t('Verdant Conflict')}</option>
            <option value="113">{t('Rebirth of Glory')}</option>
            <option value="112">{t('Steel Rebellion')}</option>
            <option value="111">{t('Altersphere')}</option>
            <option value="110">{t('Omen of the Ten')}</option>
            <option value="109">{t('Brigade of the Sky')}</option>
            <option value="108">{t('Dawnbreak, Nightedge')}</option>
            <option value="107">{t('Chronogenesis')}</option>
            <option value="106">{t('Starforged Legends')}</option>
            <option value="105">{t('Wonderland Dreams')}</option>
            <option value="104">{t('Tempest of the Gods')}</option>
            <option value="103">{t('Rise of Bahamut')}</option>
            <option value="102">{t('Darkness Evolved')}</option>
            <option value="101">{t('Classic')}</option>
          </select>
        </label>
        <span>Include neutrals:</span>
        <label htmlFor="filterNeutral">
          <select
            name="neutral"
            onChange={(e) => {
              setIncludeNeutrals(e.target.value);
            }}
          >
            <option value="Yes">{t('Yes')}</option>
            <option value="">{t('No')}</option>
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
