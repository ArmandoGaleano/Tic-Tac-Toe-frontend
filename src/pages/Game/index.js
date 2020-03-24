import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import TicTacToe from '../../components/TicTacToe';

export default function Game(props) {
    useEffect(() => {
        window.addEventListener("beforeunload", function (e) {
            var confirmationMessage = "O jogo será apagado automaticamente ao sair da página";
          
            e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
            return confirmationMessage;              // Gecko, WebKit, Chrome <34
          });

    })
    return (
        <Fragment>
            <nav>
                <ul>
                    <li><Link to="/" >Home</Link></li>
                </ul>
            </nav>
            <TicTacToe gameID={props.location.state.gameID} player={props.location.state.numberPlayer} />
            
        </Fragment>
    )
}