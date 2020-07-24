import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StyledContentDiv } from '../styles/globalStyles';

const Tournaments = () => {
  const [jcgs, setJcgs] = useState(null);
  const [year, setYear] = useState(2020);
  const [currentJson, setCurrentJson] = useState(null);
  const { format } = useParams();
  const start2020 = 1965;
  const start2019 = 1384;
  const start2018 = 719;

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
      {Object.values(currentJson).reverse().map((value) => <p>{value[1][0]['player']}</p>)}
    </StyledContentDiv>
  );
};

export default Tournaments;
