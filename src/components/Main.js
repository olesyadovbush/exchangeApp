import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Lookup from '../components/Lookup';
import Calculator from '../components/Calculator';

export default function Main() {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={Lookup}/>
        <Route path='/calculator' component={Calculator}/>
      </Switch>
    </main>
  );
}