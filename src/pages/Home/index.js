import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import './styles.css';

export default function Home() {

    const [socket, setSocket] = useState(io('http://localhost:5000/'));
    const [data, setData] = useState({
        gameID: null,
        numberPlayer: null,
        redirectToGame: false
    });



    function createGame() {
        socket.emit('createGame', true);
    }
    function joinGame(gameID) {
        socket.emit("joinGame", gameID);
    }


    useEffect(() => {
        const form = document.querySelector('#formGame');
        form.addEventListener('submit', e => {
            e.preventDefault();
            const inputID = document.querySelector('#gameID').value;
            joinGame(inputID)
        })
        const btnCreateGame = document.querySelector('#createGame');
        btnCreateGame.addEventListener('click', e => {
            e.preventDefault();
            createGame();
        })
        socket.on('joinGameStatus', joinGameStatus => {
            if (joinGameStatus) {
                setData({
                    gameID: document.querySelector('#gameID').value,
                    numberPlayer: "player2",
                    redirectToGame: true

                })
            }
        })
        //When a new game has been created, will return the new game ID
        socket.on('newGameID', newGameID => {
            alert("O id do jogo é: "+newGameID+" envie para seu amigo para jogar");
            setData({
                gameID: newGameID,
                numberPlayer: "player1",
                redirectToGame: true

            })
        })
    }, [])
    if (data.redirectToGame) {
        return (
            <Redirect
                to={{
                    pathname: "/game",
                    state: { gameID: data.gameID, numberPlayer: data.numberPlayer }
                }}
            />
        )
    }

    return (
        <div className="container">
            <form id="formGame">
                <input type="text" id="gameID" placeholder="Insira o ID do jogo" />
                <button type="submit" >Entrar</button>

            </form>
            <button id="createGame">Criar Jogo</button>
        </div>
    )
}