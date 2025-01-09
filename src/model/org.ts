export interface User {
    id: string;
    name: string;
    email: string;
    title?: string;
    hasAccount: boolean;
}

export interface Org {
    users: User[];
    name: string;
}