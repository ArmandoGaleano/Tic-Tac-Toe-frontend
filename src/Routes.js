import React from 'react';
import { Switch, Route } from 'react-router-dom';
//Pages
import Home from './pages/Home';
import Game from './pages/Game';

export default function Routes(props){

    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/game" component={Game}  />
        </Switch>

    )
}