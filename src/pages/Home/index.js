import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import './styles.css';
import showModal from '../../components/Modal';

export default function Home() {

    const [socket, setSocket] = useState(io('https://tic-tac-toebackend.herokuapp.com/'));
    const [data, setData] = useState({
        gameID: null,
        numberPlayer: null,
        redirectToGame: false
    });
    //For game
    function createGame() {
        socket.emit('createGame', true);
    }
    function joinGame(gameID) {
        socket.emit("joinGame", gameID);
    }

    function copyToClipbord() {
        /* Get the text field */
        var copyText = document.getElementById("myInput");

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /*For mobile devices*/

        /* Copy the text inside the text field */
        document.execCommand("copy");


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
            showModal("<p>O id do jogo é:<br><span class='text-primary'>" + newGameID + "</span> envie para seu amigo para jogar.</p>");
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
        <div className="container-fluid d-flex justify-content-center align-items-center">
            <div className="col-12 col-sm-9 col-md-5 d-flex flex-column align-items-center bg-white rounded w-100 border mt-5 py-5 shadow">
                <h2 className="font">Tic Tac Toe</h2>
                <form id="formGame" className="d-flex">

                    <input type="text" className="form-control border-right-0 " id="gameID" placeholder="Insira o ID do jogo" />
                    <button type="submit" className="btn btn-secondary font">Entrar</button>

                </form>
                <button id="createGame" className="btn btn-primary mt-5 font">Criar Jogo</button>
            </div>
        </div>
    )
}