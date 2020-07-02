import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CardView = () => {
  const [cardJson, setCardJson] = useState({});
  const { cardId } = useParams();
  useEffect(() => {
    fetch(`http://localhost:3002/cards/${cardId}`)
      .then((res) => res.json())
      .then((resjson) => setCardJson(resjson));
  }, [cardId]);
  return (
    cardJson && <h1>{cardJson.baseFlair_}</h1>
  );
};

export default CardView;
