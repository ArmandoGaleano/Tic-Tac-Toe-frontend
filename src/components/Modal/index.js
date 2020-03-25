import React, { useState, useEffect, Fragment } from 'react';
import './styles.css';

function adjustModalMessage(divMessage) {
    var divMessageWidth = divMessage.offsetWidth;
    var centerPage = (window.innerWidth - divMessageWidth) / 2;

    divMessage.setAttribute('style', `left: ${centerPage}px`)
    window.addEventListener('resize', () => {
        divMessageWidth = divMessage.offsetWidth;
        centerPage = (window.innerWidth - divMessageWidth) / 2;

        divMessage.setAttribute('style', `left: ${centerPage}px`)

    })
}
function closeModal(modal){
    modal.remove();
}

export default function showModal(message) {
    const modal = document.createElement('div');
    modal.setAttribute('id', 'modal');

    //Container
    const container = document.createElement('div');
    container.setAttribute('class', 'col-8 col-md-5 message');

    //Div Message
    const divMessage = document.createElement('div');
    divMessage.innerHTML = message;
    container.appendChild(divMessage);

    //Line

    const line = document.createElement('div');
    line.setAttribute('class', 'dropdown-divider');
    container.appendChild(line)

    //Div Button

    const divButton = document.createElement('div');
    const buttonOk = document.createElement('button');
    buttonOk.setAttribute('class', 'btn btn-primary closeModal');
    buttonOk.appendChild(document.createTextNode('Ok'));
    divButton.appendChild(buttonOk);
    container.appendChild(divButton);

    //Add Container to modal

    modal.appendChild(container)
    
    //Dark screen when the modal is open
    const darkScreen = document.createElement('div');
    darkScreen.setAttribute('class', 'darkScreen closeModal');
    modal.appendChild(darkScreen);

    //Show modal
    document.querySelector('body').appendChild(modal);
    


    adjustModalMessage(container);
    document.querySelectorAll('.closeModal').forEach(item => {
        item.addEventListener('click', () => closeModal(modal))
    })


}
