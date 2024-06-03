import ApiService, { TOKEN_STORAGE_LOCATION } from "./ApiService";

const USER_STORAGE_LOCATION = 'USER';

export default class UserService {
    static login(username, password) {
        return ApiService
            .post(
                'auth/login',
                {
                    username: username,
                    password: password
                }
            )
            .then(
                response => {
                    const data = response.data;

                    this.#setToken(data.token);
                    this.#setUser(data.user);
                },
                error => Promise.resolve({
                    succes: false,
                    message: error.message
                })
            );
    }

    static register(username, password) {
        return ApiService
            .post(
                'auth/register',
                {
                    username: username,
                    password: password
                }
            )
            .then(
                response => {
                    const data = response.data;

                    this.#setToken(data.token);
                    this.#setUser(data.user);
                },
                error => {
                    return Promise.resolve({
                        succes: false,
                        message: error.message
                    })
                }
            );
    }

    static #setToken(token){
        sessionStorage.setItem(TOKEN_STORAGE_LOCATION, token);
    }

    static #setUser(user){
        sessionStorage.setItem(USER_STORAGE_LOCATION, user);
    }

    static logout() {
        sessionStorage.removeItem(TOKEN_STORAGE_LOCATION);
    }


    static isLoggedIn() {
        return sessionStorage.getItem(TOKEN_STORAGE_LOCATION) !== null;
    }

    static getUser() {
        return JSON.parse(sessionStorage.getItem(USER));
    }
}
