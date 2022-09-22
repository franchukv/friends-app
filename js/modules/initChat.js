import { users, popupSection } from './constants.js';

let popupChat;

let isChatActive = false;

function handlerClickOnUserProfile(event) {
    isChatActive = true;

    let userCard = event.target.closest('div.user-card');
    let avatar = userCard.querySelector('.user-avatar');
    let name = userCard.querySelector('.user-name');
    let age = userCard.querySelector('.user-age');
    let gender = userCard.querySelector('.user-gender');
    let city = userCard.querySelector('.user-location__city');
    let state = userCard.querySelector('.user-location__state');
    let country = userCard.querySelector('.user-location__state');

    if (!userCard) return;
    if (!users.contains(userCard)) return;

    createInfoPopup(avatar, name, age, gender, city, state, country);
}

function handlerChat() {
    const popupCloserButton = document.querySelector('.popup-closer');
    popupCloserButton.addEventListener('click', () => {
        popupChat.classList.toggle('hide');
    })
}

function createInfoPopup(avatar, name, age, gender, city, state, country) {
    const popup = `
        <div class="popup popup--chat">
            <span class="popup-closer">X</span>
            <div class="user-info">
                <img class="popup__user-avatar" src="${avatar.src}">
                <div class="user-info__text">
                    <span class="popup__user-name">${name.innerText}</span>
                    <span class="popup__user-age">${age.innerText}</span>
                    <span class="popup__user-gender">${gender.innerText}</span>

                    <div class="user-location popup__user-location">
                        <span class="user-location__city">${city.innerText}</span>
                        <span class="user-location__state">${state.innerText}</span>
                        <span class="user-location__country">${country.innerText}</span>
                    </div>
                </div>
            </div>
            <div class="chat">
                <div class="chat__messages-area">
                    
                </div>
            </div>
            <form id="chatForm" onsubmit="return false">
                <input id="messagesInput" type="text" placeholder="send a message" autocomplete="off">
            </form>
        </div>`;

    popupSection.innerHTML = popup;

    popupChat = document.querySelector('.popup--chat');
    const chatForm = document.querySelector('#chatForm');

    popupChat.addEventListener('click', handlerChat)

    chatForm.addEventListener('submit', handlerMessagesInput)
}

function handlerMessagesInput() {
    const date = new Date();
    const options = { hour: 'numeric', minute: 'numeric' };
    const now = date.toLocaleTimeString('uk-UA', options);
    const messagesInput = document.querySelector('#messagesInput');
    const messagesArea = document.querySelector('.chat__messages-area');
    const message = messagesInput.value;
    const messageWrapper = `
        <div class="message">
            <span class="message-time">${now}</span>
            <span class="message-text">${message}</span>
        </div>    
    `;

    messagesArea.innerHTML += messageWrapper;

    messagesInput.value = '';
}

export {
    handlerClickOnUserProfile
}

