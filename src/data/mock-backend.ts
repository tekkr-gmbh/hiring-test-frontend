import {Org, User} from "../model/org";

function simulateLoading(): Promise<void> {
    const ms = 200 + Math.random() * 400;
    return new Promise(resolve => setTimeout(resolve, ms));
}

function dummyData (): Org {
    return {
        name: "Tekkr",
        users: [
            {
                id: "1",
                name: "Moritz Bruder",
                email: "moritz@tekkr.io",
                hasAccount: true,
            },
            {
                id: "2",
                name: "Philipp Römer",
                email: "philipp@tekkr.io",
                hasAccount: true,
            },
            {
                id: "3",
                name: "Filo Pirri",
                email: "filo@tekkr.io",
                hasAccount: false,
            },
        ]
    };
}

export class ApiClient {
    private org: Org = localStorage.getItem("org") ? JSON.parse(localStorage.getItem("org")!) : dummyData();
    private persist() {
        localStorage.setItem("org", JSON.stringify(this.org));
    }
    async inviteUser(userId: string): Promise<void> {
        await simulateLoading();
        this.org.users.find(u => u.id === userId)!.hasAccount = true;
        this.persist();
    }
    async createUser(userInput: {
        name: string;
        email: string;
        title?: string;
    }): Promise<User> {
        await simulateLoading();

        // for testing purposes: throw an error on specific input
        if (userInput.email === "error@tekkr.io") {
            throw new Error("Error 1209: Server Connection Unavailable");
        }

        const newUser: User = {
            ...userInput,
            id: (this.org.users.length + 1).toString(),
            hasAccount: false,
        };
        this.org.users.push(newUser);
        this.persist();
        return newUser;
    }
    async getOrg(): Promise<Org> {
        await simulateLoading();
        return { ...this.org };
    }
}

export function _resetApiClientData() {
    const ac = apiClient as unknown as { org: Org, persist: () => void };
    ac.org = dummyData();
    ac.persist();
}

export const apiClient = new ApiClient() as Omit<ApiClient, "resetData">;