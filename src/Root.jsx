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
import Resources from './components/Resources';
import Tournaments from './components/Tournaments';
import Leaders from './components/Leaders';
import Leader from './components/Leader';
import Deckbuilder from './components/Deckbuilder';
import Censored from './components/Censored';
import CardDatabase from './components/CardDatabase';

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
          <Route exact path="/resources/censored" component={Censored} />
          <Route exact path="/resources/:resource" component={Resources} />
          <Route exact path="/jcg/:format" component={Tournaments} />
          <Route exact path="/leaders" component={Leaders} />
          <Route exact path="/leaders/:leaderId" component={Leader} />
          <Route exact path="/deckbuilder/:deckHash" component={Deckbuilder} />
          <Route exact path="/deckbuilder" component={Deckbuilder} />
          <Route exact path="/carddatabase" component={CardDatabase} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
};

export default Root;
