import { getHabits, saveHabits } from './habitStore.js';

export function validateHabits(data) {
    if (!Array.isArray(data)) {
        throw new Error('Invalid Format: JSON must be an array of habits');
    }

    if (data.length === 0) {
        throw new Error('JSON file is empty');
    }

    data.forEach((habit, index) => {
        if (!Object.prototype.hasOwnProperty.call(habit, 'name')) {
            throw new Error(`Habit at index ${index} is missing 'name' property`);
        }

        if (!Object.prototype.hasOwnProperty.call(habit, 'completed')) {
            throw new Error(`Habit at index ${index} is missing 'completed' property`);
        }
    });

    return true;
}

export async function loadInitialHabits() {
    const currentHabits = getHabits();

    if (currentHabits.length > 0) {
        return;
    }

    try {
        const response = await fetch('habit.json');

        if (!response.ok) {
            throw new Error(`Could not load habit.json (${response.status})`);
        }

        const data = await response.json();
        validateHabits(data);
        saveHabits(data);
        console.log('Loaded default habits from habit.json');
    } catch (error) {
        console.warn('No default habits loaded (habit.json not available or invalid):', error.message);
    }
}

function readFileAsText(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.addEventListener('load', (event) => {
            resolve(event.target.result);
        });

        reader.addEventListener('error', () => {
            reject(new Error(`Unable to read file: ${file.name}`));
        });

        reader.readAsText(file);
    });
}

export async function importHabitsFromFile(file) {
    const fileContents = await readFileAsText(file);
    const importedHabits = JSON.parse(fileContents);

    validateHabits(importedHabits);

    const existingHabits = getHabits();
    const mergedHabits = [...existingHabits, ...importedHabits];

    saveHabits(mergedHabits);

    return mergedHabits;
}
