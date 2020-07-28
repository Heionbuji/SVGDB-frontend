/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StyledContentDiv } from '../styles/globalStyles';
import ExpandingBox from './ExpandingBox';

const Tournaments = () => {
  const [jcgs, setJcgs] = useState(null);
  const [currentJson, setCurrentJson] = useState(null);
  const [filterByExpansion, setFilterByExpansion] = useState(false);
  const { format } = useParams();
  const start2020 = 1965;
  const start2019 = 1384;
  const start2018 = 719;

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
    }
    if (newVal === '2020') {
      Object.keys(jcgs).forEach((key) => {
        if (key >= start2020) { temp[key] = jcgs[key]; }
      });
    }
    if (newVal === '2019') {
      Object.keys(jcgs).forEach((key) => {
        if (key >= start2019 && key < start2020) { temp[key] = jcgs[key]; }
      });
    }
    if (newVal === '2018') {
      Object.keys(jcgs).forEach((key) => {
        if (key >= start2018 && key < start2019) { temp[key] = jcgs[key]; }
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
    if (jcgs) { spliceJson('2020'); }
  }, [jcgs]);

  return jcgs && currentJson && (
    <StyledContentDiv>
      <div style={{ paddingTop: '10px' }}>
        Filter by:
        <label htmlFor="year"> Year
          <select
            name="year"
            onChange={(e) => {
              spliceJson(e.target.value);
              setFilterByExpansion(false);
            }}
            style={{ margin: '0 5px' }}
            className={filterByExpansion ? 'faded' : null}
          >
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
          </select>
        </label>
        or
        <label htmlFor="expansion"> Expansion
          <select
            name="expansion"
            onChange={(e) => {
              spliceJson(e.target.value);
              setFilterByExpansion(true);
            }}
            style={{ margin: '0 5px' }}
            className={!filterByExpansion ? 'faded' : null}
          >
            <option value="Select Expansion">-- Select Expansion --</option>
            <option value="Fortunes Hand">Fortune&apos;s hand</option>
            <option value="World Uprooted">World Uprooted</option>
            <option value="Ultimate Colosseum">Ultimate Colosseum</option>
            <option value="Verdant Conflict">Verdant Conflict</option>
            <option value="Rebirth of Glory">Rebirth of Glory</option>
            <option value="Steel Rebellion">Steel Rebellion</option>
            <option value="Altersphere">Altersphere</option>
            <option value="Omen of the Ten">Omen of the Ten</option>
            <option value="Brigade of the Sky">Brigade of the Sky</option>
            <option value="Dawnbreak Nightedge">Dawnbreak, Nightedge</option>
            <option value="Chronogenesis">Chronogenesis</option>
            <option value="Starforged Legends">Starforged Legends</option>
            <option value="Wonderland Dreams">Wonderland Dreams</option>
            <option value="Tempest of the Gods">Tempest of the Gods</option>
            <option value="Rise of Bahamut">Rise of Bahamut</option>
            <option value="Darkness Evolved">Darkness Evolved</option>
            <option value="Classic">Classic</option>
          </select>
        </label>
      </div>
      {Object.values(currentJson).reverse().map((value) => (
        <ExpandingBox
          title={value.title}
          marginTop="25px"
          content={
            (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '50px' }}>
                <table>
                  <thead>
                    <tr style={{ backgroundColor: '#444' }}>
                      <th colSpan="2">Deck usage breakdown</th>
                    </tr>
                  </thead>
                  <tbody>
                    {value.crafts.map((count, index) => (
                      <>
                        <tr className={`maintr ${id2class[index]}`}>
                          <td>{id2class[index]}</td>
                          <td>{count}</td>
                        </tr>
                        {value.archetypes
                        && value.archetypes[index]
                        && value.archetypes[index].map((arch) => (
                          <tr className={`subtr ${id2class[index]}`}>
                            <td>{arch.name}</td>
                            <td>{arch.count}</td>
                          </tr>
                        ))}

                      </>
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
                            <img src={`${process.env.REACT_APP_ASSETS_URL}/icons/${value[1][0].decks[0][59]}`} alt="" style={{ padding: '10px' }} />
                          </a>
                          <a href={value[1][0].decks[1]} target="blank_" rel="noopener nofollow">
                            <img src={`${process.env.REACT_APP_ASSETS_URL}/icons/${value[1][0].decks[1][59]}`} alt="" style={{ padding: '10px' }} />
                          </a>
                        </>
                      )
                      : <p>No deck data for this tournament.</p>}

                  </div>
                  <div>
                    <p>#2: {value[2][0].player}</p>
                    {value[2][0].decks[0] && value[2][0].decks[1]
                      ? (
                        <>
                          <a href={value[2][0].decks[0]} target="blank_" rel="noopener nofollow">
                            <img src={`${process.env.REACT_APP_ASSETS_URL}/icons/${value[2][0].decks[0][59]}`} alt="" style={{ padding: '10px' }} />
                          </a>
                          <a href={value[2][0].decks[1]} target="blank_" rel="noopener nofollow">
                            <img src={`${process.env.REACT_APP_ASSETS_URL}/icons/${value[2][0].decks[1][59]}`} alt="" style={{ padding: '10px' }} />
                          </a>
                        </>
                      )
                      : <p>No deck data for this tournament.</p>}
                  </div>
                </div>
                <div>
                  <ExpandingBox
                    width="300px"
                    title="All decks"
                    content={
                    (
                      Object.values(value).map((val) => {
                        if (val[0].decks) {
                          return val.map((x, index) => (
                            <div>
                              {val[index].decks[0] && val[index].decks[1]
                                ? (
                                  <>
                                    <p>{val[index].player}</p>
                                    <a href={val[index].decks[0]} target="blank_" rel="noopener nofollow">
                                      <img src={`${process.env.REACT_APP_ASSETS_URL}/icons/${val[index].decks[0][59]}`} alt="" style={{ padding: '10px' }} />
                                    </a>
                                    <a href={val[index].decks[1]} target="blank_" rel="noopener nofollow">
                                      <img src={`${process.env.REACT_APP_ASSETS_URL}/icons/${val[index].decks[1][59]}`} alt="" style={{ padding: '10px' }} />
                                    </a>
                                  </>
                                )
                                : <p>No deck data for this tournament.</p>}
                            </div>
                          ));
                        } return null;
                      })
                    )
                  }
                  />
                </div>
              </div>
            )
          }
        />
      ))}
    </StyledContentDiv>
  );
};

export default Tournaments;
