import React, { useState, useEffect } from 'react';
import {
  StyledNewsDiv,
  StyledNewsTitle,
  StyledNewsTimestamp,
  StyledNewsContent,
} from '../styles/indexStyles';

const News = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3002/news')
      .then((res) => res.json())
      .then((resjson) => setNews(resjson));
  }, []);
  return (
    news && news.map((newsItem) => (
      <StyledNewsDiv key={newsItem.title}>
        <StyledNewsTitle>{newsItem.title}</StyledNewsTitle>
        <StyledNewsTimestamp>{newsItem.timestamp}</StyledNewsTimestamp>
        <StyledNewsContent>{newsItem.content}</StyledNewsContent>
      </StyledNewsDiv>
    ))
  );
};

export default News;
