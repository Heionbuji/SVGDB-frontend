import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import MainPage from './components/MainPage';
import CardView from './components/CardView';

const Root = () => (
  <>
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/cards/:cardId" component={CardView} />
        <Redirect to="/" />
      </Switch>
    </Router>
  </>
);

export default Root;
