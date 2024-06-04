import ApiService, { TOKEN_STORAGE_LOCATION } from "./ApiService";

export const USER_STORAGE_LOCATION = 'USER';

export default class UserService {
    static login(username, password) {
        return this.#requestToken("auth/login", username, password)
    }

    static register(username, password) {
        return this.#requestToken("auth/register", username, password);
    }

    static #requestToken(url, username, password){
        return ApiService
            .post(
                url,
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

                    return Promise.resolve({
                        succes: true,
                        user: data.user
                    });
                }
            ).catch(error => {
                throw error.response.data.detail;
            });
    }

    static #setToken(token){
        sessionStorage.setItem(TOKEN_STORAGE_LOCATION, token);
    }

    static #setUser(user){
        sessionStorage.setItem(USER_STORAGE_LOCATION, JSON.stringify(user));
    }

    static logout() {
        sessionStorage.removeItem(TOKEN_STORAGE_LOCATION);
    }


    static isLoggedIn() {
        return sessionStorage.getItem(TOKEN_STORAGE_LOCATION) !== null;
    }

    static getUser() {
        return JSON.parse(sessionStorage.getItem(USER_STORAGE_LOCATION));
    }
}
