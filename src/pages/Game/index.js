import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import TicTacToe from '../../components/TicTacToe';

export default function Game(props) {
    return (
        <Fragment>
            <nav>
                <ul>
                    <li><Link to="/" ><i className="fas fa-home"></i></Link></li>
                </ul>
            </nav>
            <TicTacToe gameID={props.location.state.gameID} player={props.location.state.numberPlayer} />
            
        </Fragment>
    )
}