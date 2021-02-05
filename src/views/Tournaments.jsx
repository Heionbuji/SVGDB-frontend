/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { StyledContentDiv } from '../styles/globalStyles';
import { StyledCardImageContainer } from '../styles/cardStyles';
import ExpandingBox from '../components/ExpandingBox';

const Tournaments = () => {
  const [jcgs, setJcgs] = useState(null);
  const [currentJson, setCurrentJson] = useState(null);
  const [filterByExpansion, setFilterByExpansion] = useState(false);
  const { format } = useParams();
  const { t } = useTranslation('tournaments');

  const years = {
    2021: { start: 2561, end: 999999 },
    2020: { start: 1965, end: 2560 },
    2019: { start: 1384, end: 1964 },
    2018: { start: 719, end: 1383 },
  };

  const id2class = {
    0: 'Forestcraft',
    1: 'Swordcraft',
    2: 'Runecraft',
    3: 'Dragoncraft',
    4: 'Shadowcraft',
    5: 'Bloodcraft',
    6: 'Havencraft',
    7: 'Portalcraft',
    8: 'Neutral',
  };

  const exp2season = {
    'Eternal Awakening': '16th Season',
    'Storm Over Rivayle': '15th Season',
    'Fortunes Hand': '14th Season',
    'World Uprooted': '13th Season',
    'Ultimate Colosseum': '12th Season',
    'Verdant Conflict': '11th Season',
    'Rebirth of Glory': '10th Season',
    'Steel Rebellion': '9th Season',
    Altersphere: '8th Season',
    'Omen of the Ten': '7th Season',
    'Brigade of the Sky': '6th Season',
    'Dawnbreak Nightedge': '5th Season',
    Chronogenesis: '4th Season',
    'Starforged Legends': '3rd Season',
    'Wonderland Dreams': '2nd Season',
    'Tempest of the Gods': '1st Season',
  };

  const spliceJson = (newVal) => {
    const temp = {};
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(newVal)) {
      Object.keys(jcgs).forEach((key) => {
        if (jcgs[key].title.includes(exp2season[newVal])) { temp[key] = jcgs[key]; }
      });
    } else {
      Object.keys(jcgs).forEach((key) => {
        if (key >= years[newVal].start && key <= years[newVal].end) { temp[key] = jcgs[key]; }
      });
    }
    setCurrentJson(temp);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/jcg/${format}`)
      .then((res) => res.json())
      .then((resjson) => setJcgs(resjson));
  }, [format]);

  useEffect(() => {
    if (jcgs) { spliceJson('2021'); }
  }, [jcgs]);

  return jcgs && currentJson && (
    <StyledContentDiv>
      <div style={{ paddingTop: '10px' }}>
        {t('Filter')}:
        <label htmlFor="year">
          <select
            name="year"
            onChange={(e) => {
              spliceJson(e.target.value);
              setFilterByExpansion(false);
            }}
            style={{ margin: '0 5px' }}
            className={filterByExpansion ? 'faded' : null}
          >
            {Object.keys(years).reverse().map((year) => (
              <option value={year} key={year}>{year}</option>
            ))}
          </select>
        </label>
        {t('or')}
        <label htmlFor="expansion">
          <select
            name="expansion"
            onChange={(e) => {
              spliceJson(e.target.value);
              setFilterByExpansion(true);
            }}
            style={{ margin: '0 5px' }}
            className={!filterByExpansion ? 'faded' : null}
          >
            <option value="Select Expansion">{t('-- Select Expansion --')}</option>
            {Object.keys(exp2season).map((expansion) => (
              <option value={expansion} key={expansion}>{t(expansion)}</option>
            ))}
          </select>
        </label>
      </div>
      {Object.values(currentJson).reverse().map((value) => (
        <ExpandingBox
          title={value.title}
          marginTop="25px"
          margin="auto"
          key={`exp${value.title}`}
          content={
            (
              <StyledCardImageContainer>
                <table className="border">
                  <thead>
                    <tr style={{ backgroundColor: '#444' }}>
                      <th colSpan="2">{t('Deck usage breakdown')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {value.crafts.map((count, index) => (
                      // There can be duplicates with just count
                      // eslint-disable-next-line react/no-array-index-key
                      <React.Fragment key={`frag${count}${index}`}>
                        <tr className={`maintr ${id2class[index]}`}>
                          <td>{t(id2class[index])}</td>
                          <td>{count}</td>
                        </tr>
                        {(value.archetypes && value.archetypes[index])
                          ? value.archetypes[index].map((arch) => (
                            <tr className={`subtr ${id2class[index]}`} key={`tr${arch.name}`}>
                              <td>{arch.name.map((name, nameIndex) => (
                                nameIndex >= 1 ? `+${t(name)}` : `${t(name)}`
                              ))}
                              </td>
                              <td>{arch.count}</td>
                            </tr>
                          )) : null}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
                <div>
                  Top 2:
                  <div>
                    <p>#1: {value[1][0].player}</p>
                    {value[1][0].decks[0] && value[1][0].decks[1]
                      ? (
                        <>
                          <a href={value[1][0].decks[0]} target="blank_" rel="noopener nofollow">
                            <img src={`${process.env.REACT_APP_ASSETS_URL}/icons/${value[1][0].decks[0][59]}.png`} alt="" style={{ padding: '10px' }} />
                          </a>
                          <a href={value[1][0].decks[1]} target="blank_" rel="noopener nofollow">
                            <img src={`${process.env.REACT_APP_ASSETS_URL}/icons/${value[1][0].decks[1][59]}.png`} alt="" style={{ padding: '10px' }} />
                          </a>
                        </>
                      )
                      : <p>{t('No deck data for this tournament.')}</p>}

                  </div>
                  <div>
                    <p>#2: {value[2][0].player}</p>
                    {value[2][0].decks[0] && value[2][0].decks[1]
                      ? (
                        <>
                          <a href={value[2][0].decks[0]} target="blank_" rel="noopener nofollow">
                            <img src={`${process.env.REACT_APP_ASSETS_URL}/icons/${value[2][0].decks[0][59]}.png`} alt="" style={{ padding: '10px' }} />
                          </a>
                          <a href={value[2][0].decks[1]} target="blank_" rel="noopener nofollow">
                            <img src={`${process.env.REACT_APP_ASSETS_URL}/icons/${value[2][0].decks[1][59]}.png`} alt="" style={{ padding: '10px' }} />
                          </a>
                        </>
                      )
                      : <p>{t('No deck data for this tournament.')}</p>}
                  </div>
                  <div style={{ paddingTop: '50px' }}>
                    <a
                      href={`https://sv.j-cg.com/compe/${value.code}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      style={{ textDecoration: 'underline' }}
                    >
                      {t('View all details')}
                      <img
                        src={`${process.env.PUBLIC_URL}/svgs/openNew.svg`}
                        alt=""
                        style={{ width: '15px', marginLeft: '5px', marginTop: '3px' }}
                      />
                    </a>
                  </div>
                </div>
                <div>
                  <ExpandingBox
                    width="300px"
                    title={`${t('All decks')}`}
                    content={
                    (
                      Object.values(value).map((val) => {
                        if (val[0].decks) {
                          return val.map((x, index) => (
                            // Again, there might be duplicates with just x
                            // eslint-disable-next-line react/no-array-index-key
                            <div key={`div${x}${index}`}>
                              {val[index].decks[0] && val[index].decks[1]
                                ? (
                                  <>
                                    <p>{val[index].player}</p>
                                    <a href={val[index].decks[0]} target="blank_" rel="noopener nofollow">
                                      <img src={`${process.env.REACT_APP_ASSETS_URL}/icons/${val[index].decks[0][59]}.png`} alt="" style={{ padding: '10px' }} />
                                    </a>
                                    <a href={val[index].decks[1]} target="blank_" rel="noopener nofollow">
                                      <img src={`${process.env.REACT_APP_ASSETS_URL}/icons/${val[index].decks[1][59]}.png`} alt="" style={{ padding: '10px' }} />
                                    </a>
                                  </>
                                )
                                : <p>{t('No deck data for this tournament.')}</p>}
                            </div>
                          ));
                        } return null;
                      })
                    )
                  }
                  />
                </div>
              </StyledCardImageContainer>
            )
          }
        />
      ))}
    </StyledContentDiv>
  );
};

export default Tournaments;
