import { users, filterForm } from './constants.js';

import syncURL from './historyAPI.js';

import {
    hasUsersToLoad,
    isSorted,
    usersData,
    sortedUsersData,
    renderPage,
    switchFlagsAndData
} from './render.js';

import {
    orderBy
} from './filters.js';

window.isFilterActive = false;

let searchValue = filterForm.search.value;
let genderValue = filterForm.gender.value;
let orderValue = filterForm.sorters.value;

function handlerScroll() {
    if (!hasUsersToLoad) { return; }

    const position = window.scrollY + window.innerHeight >= (document.documentElement.scrollHeight / 1.25);

    if (position && !isSorted) {
        window.currentPage++;
        renderPage(usersData);
    }

    if (position && isSorted) {
        window.currentPage++;
        renderPage(sortedUsersData);
    }
}

function handlerThemeSwither() {
    if (document.documentElement.hasAttribute('theme')) {
        document.documentElement.removeAttribute('theme');
        localStorage.removeItem('theme');
    }
    else {
        document.documentElement.setAttribute('theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

function handlerFilter() {
    window.isFilterActive = true;
    searchValue = filterForm.search.value;
    genderValue = filterForm.gender.value;
    orderValue = filterForm.sorters.value;

    switchFlagsAndData(searchValue, genderValue)

    if (orderValue) {
        orderBy(orderValue);
    }

    if (sortedUsersData.length === 0) {
        const endWarning = `
        <div class="end-warning">Никого не найдено</div>
        `;

        users.innerHTML = '';
        users.innerHTML += endWarning;

        return;
    };

    users.innerHTML = '';
    window.currentPage = 1;

    renderPage(sortedUsersData);

    syncURL({
        search: searchValue,
        gender: genderValue,
        orderBy: orderValue,
        page: String(window.currentPage)
    });
}

export {
    handlerScroll,
    handlerThemeSwither,
    handlerFilter,
    searchValue,
    genderValue,
    orderValue
}