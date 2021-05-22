import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  StyledNewsDiv,
  StyledNewsTitle,
  StyledNewsTimestamp,
  StyledNewsContent,
} from '../styles/indexStyles';

const News = () => {
  const { i18n } = useTranslation();
  const [news, setNews] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/news/${i18n.language}`)
      .then((res) => res.json())
      .then((resjson) => setNews(resjson));
  }, [i18n.language]);
  return (
    news && news.map((newsItem) => (
      <StyledNewsDiv key={newsItem.title}>
        <StyledNewsTitle>{newsItem.title}</StyledNewsTitle>
        <StyledNewsTimestamp>{newsItem.timestamp}</StyledNewsTimestamp>
        <StyledNewsContent dangerouslySetInnerHTML={{ __html: newsItem.content }} />
      </StyledNewsDiv>
    ))
  );
};

export default News;
