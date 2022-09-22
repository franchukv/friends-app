import { users, filterForm, resetButton, } from './modules/constants.js';

import { initLocalStorage, initAppOptions } from './modules/appOptions.js';
import { handlerClickOnUserProfile } from './modules/initChat.js';

import {
    handlerFilter,
    resetFilter,
    handlerScroll,
    renderFirstScreen,
} from './modules/render.js';





(async () => {
    initLocalStorage();

    renderFirstScreen();

    window.addEventListener('scroll', handlerScroll);
    filterForm.addEventListener('input', handlerFilter);
    resetButton.addEventListener('click', resetFilter);
    users.addEventListener('click', handlerClickOnUserProfile);

    initAppOptions();
})();