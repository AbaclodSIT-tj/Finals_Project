import data from '../data/data.json'

export type User = {
    username: string;
    password: string;
};

const STORAGE_KEY = 'cims_users';

// Get users from localStorage or fallback to JSON
export const getUsers = (): User[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    return data.user;
};

// Add a new user and save to localStorage
export const addUser = (newUser: User): void => {
    const users = getUsers();
    users.push(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

// Export the initial array for compatibility
export const dataUser: User[] = getUsers();
