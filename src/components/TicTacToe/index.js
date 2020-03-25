import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './styles.css';
import showModal from '../Modal';
export default function TicTacToe(props) {
    const [socket, setSocket] = useState(io('https://tic-tac-toebackend.herokuapp.com/'));
    const [game, setGame] = useState(null);
    const [gameMoves, setGameMoves] = useState(null);
    const [canReceive, setCanReceive] = useState(true);

    function listenGame() {
        socket.emit("listenGame", props.gameID);
        socket.on('gameData', data => {
            setGame(data);
        })
        socket.on('gameMoves', data => {
            setGameMoves(data);
        })
    }
    function updateVisualGame() {

        if (gameMoves !== null) {

            const blocks = document.querySelectorAll('.block');
            for (let i = 0; i < blocks.length; i++) {
                blocks[i].innerHTML = "";
                const b = document.createElement('b');
                
                b.setAttribute('class', (gameMoves[i] === "X" ? 'red' : 'blue'))
                var text = null;
                switch(gameMoves[i]){
                    case "X" :
                        text = "<i class='fas fa-times'></i>";
                        break;
                    case "O" :
                        text = "<i class='fas fa-circle'></i>";
                        break;
                    case "" :
                        text = ""
                        break;
                        
                }
                b.innerHTML = text;
                blocks[i].appendChild(b)
            }
        }
    }
    function showPoints(){
        if(game){
            const p1 = document.querySelector('.player.p1 .point');
            const p2 = document.querySelector('.player.p2 .point');
            p1.removeChild(document.querySelector('.player.p1 .point b'))
            p2.removeChild(document.querySelector('.player.p2 .point b'))
            const b1 = document.createElement('b');
            b1.appendChild(document.createTextNode(game.player1.points))
            const b2 = document.createElement('b');
            b2.appendChild(document.createTextNode(game.player2.points))

            p1.appendChild(b1)
            p2.appendChild(b2)
        }
    }
    function showButtonResetGame() {
        const button = document.createElement('button');
        button.setAttribute('id', 'resetGame');
        button.setAttribute('class', 'btn btn-primary p-2 mt-2')
        button.appendChild(document.createTextNode("Começar novo jogo"));
        document.querySelector('.controlls').appendChild(button);

        button.addEventListener('click', e => {
            socket.emit('resetGame', props.gameID);
        })



    }
    useEffect(() => {
        listenGame();
        socket.on('winner', message => {
            
            if(canReceive === true){
                setCanReceive(false)
                showModal(`<p> ${message} </p>`);
                showButtonResetGame();

            }
        })


    }, [])
    useEffect(() => {
        if (gameMoves !== null) {
            var qntMovesEmpty = 0;
            gameMoves.map(move => {
                if (move === "") {
                    qntMovesEmpty++;
                }
            })
            if (qntMovesEmpty === 9) {
                const div = document.querySelector('.controlls');
                const button = document.querySelector('#resetGame');
                if (button) {
                    div.removeChild(button)
                }

            }
        }

        updateVisualGame();
    }, [gameMoves])
    useEffect(() => {
        showPoints();
    }, [game])

    function adjustDivGame(divGame) {
        
        divGame.style.height = `${divGame.offsetWidth}px`;
    }
    function addMove(blocks) {
        blocks.forEach((block, index) => {
            block.addEventListener('click', e => {
                socket.emit('handlePlayerTurn', { gameID: props.gameID, player: props.player, move: index });

            })
        });
    }
    useEffect(() => {
        const divGame = document.querySelector('#tic-tac-toe');
        adjustDivGame(divGame);
        window.addEventListener('resize', () => {
            adjustDivGame(divGame);
        })

        const blocks = document.querySelectorAll('.block');
        addMove(blocks)
    }, [])


    return (
        <div className="container">
            <div id="points" className="bg-white rounded-top p-2">
                <div className="player p1 mr-5">
                    <h2 className="text-danger"><b><i className='fas fa-times'></i></b></h2>
                    <div className="point"><b>0</b></div>
                </div>
                <b>VS</b>
                <div className="player p2 ml-5">
                    <h2 className="text-primary"><b><i className='fas fa-circle'></i></b></h2>
                    <div className="point"><b>0</b></div>
                </div>
            </div>
            <div id="tic-tac-toe">
                <div className="block"></div>
                <div className="block darkBlue"></div>
                <div className="block"></div>
                <div className="block darkBlue"></div>
                <div className="block"></div>
                <div className="block darkBlue"></div>
                <div className="block"></div>
                <div className="block darkBlue"></div>
                <div className="block"></div>
            </div>
            <div className="controlls">

            </div>
        </div>
    )
}