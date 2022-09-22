import { limitOfUsers } from './appOptions.js';
import loadingPlaceholder from './placeholder.js'

async function getUsersData() {
    loadingPlaceholder()

    try {
        const response = await fetch(`https://randomuser.me/api/?results=${limitOfUsers}&seed=1&nat=ua`);

        if (!response.ok) { throw new Error(response.status) };

        const data = await response.json();
        return data.results;
    } catch (error) {
        console.warn(error);
    }
};

export default getUsersData;