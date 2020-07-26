/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StyledContentDiv } from '../styles/globalStyles';
import ExpandingBox from './ExpandingBox';

const Tournaments = () => {
  const [jcgs, setJcgs] = useState(null);
  const [currentJson, setCurrentJson] = useState(null);
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

  const spliceJson = (newYear) => {
    const temp = {};
    if (newYear === '2020') {
      Object.keys(jcgs).forEach((key) => {
        if (key >= start2020) { temp[key] = jcgs[key]; }
      });
    }
    if (newYear === '2019') {
      Object.keys(jcgs).forEach((key) => {
        if (key >= start2019 && key < start2020) { temp[key] = jcgs[key]; }
      });
    }
    if (newYear === '2018') {
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
      <label htmlFor="year">Year:
        <select name="year" onChange={(e) => spliceJson(e.target.value)}>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
        </select>
      </label>
      {Object.values(currentJson).reverse().map((value) => (
        <ExpandingBox
          title={value.title}
          content={
            (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '50px' }}>
                <table>
                  <thead>
                    <tr>
                      <th colSpan="2">Class usage breakdown</th>
                    </tr>
                  </thead>
                  <tbody>
                    {value.crafts.map((count, index) => (
                      <tr>
                        <td>{id2class[index]}</td>
                        <td>{count}</td>
                      </tr>
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
