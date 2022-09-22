import { themeSwitcher } from './constants.js';
import { renderFirstScreen, } from './render.js';
import { handlerThemeSwither } from './handlers.js';

const defaultLimitOfUsers = 200;
const usersPerPage = 20;
let limitOfUsers = defaultLimitOfUsers;

function initLocalStorage() {
    if (localStorage.getItem('theme')) {
        document.documentElement.setAttribute('theme', 'dark');
    } else {
        document.documentElement.removeAttribute('theme');
    }
}

function initAppOptions() {
    let inputValue = Number(usersLimitInput.value);
    let stateDefault = true;
    usersLimitResetButton.setAttribute('disabled', '');

    usersLimitInput.addEventListener('input', () => {
        inputValue = Number(usersLimitInput.value);
        stateDefault = limitOfUsers === defaultLimitOfUsers && inputValue === defaultLimitOfUsers ? true : false;
    })

    usersLimitAcceptButton.addEventListener('click', () => {
        if (stateDefault || inputValue === limitOfUsers) { return; }

        limitOfUsers = inputValue;
        renderFirstScreen();

        if (limitOfUsers != defaultLimitOfUsers) {
            usersLimitResetButton.removeAttribute('disabled');
        }

        if (limitOfUsers === defaultLimitOfUsers) {
            usersLimitResetButton.setAttribute('disabled', '');
        }
    })

    usersLimitResetButton.addEventListener('click', () => {
        if (stateDefault) { return; }

        limitOfUsers = defaultLimitOfUsers;
        usersLimitInput.value = defaultLimitOfUsers;
        usersLimitResetButton.setAttribute('disabled', '');
        renderFirstScreen();
    })

    themeSwitcher.addEventListener('click', () => {
        handlerThemeSwither();
    });
}

export {
    initAppOptions,
    initLocalStorage,
    limitOfUsers,
    usersPerPage,
    defaultLimitOfUsers
}