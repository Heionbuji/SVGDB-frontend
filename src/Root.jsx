import React, { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import MainPage from './components/MainPage';
import CardView from './components/CardView';
import Sleeves from './components/Sleeves';
import Tournaments from './components/Tournaments';

const Root = () => {
  const { i18n } = useTranslation();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    i18n.changeLanguage(window.localStorage.getItem('lang') || 'en');
    setReady(true); // To prevent resources being fetched before language is set
  }, []);
  return ready && (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/cards/:cardId" component={CardView} />
          <Route exact path="/sleeves" component={Sleeves} />
          <Route exact path="/jcg/:format" component={Tournaments} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
};

export default Root;
