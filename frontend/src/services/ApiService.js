import axios from 'axios';

const API_URL = 'http://localhost:8080/';

export const TOKEN_STORAGE_LOCATION = 'JWT';


class ApiService {
    static get(url){
        return axios.get(url, this.#getConfig());
    }

    static post(url, data){
        return axios.post(url, data, this.#getConfig());
    }

    static patch(url, data){
        return axios.patch(url, data, this.#getConfig());
    }

    static put(url, data){
        return axios.put(url, data, this.#getConfig());
    }

    static delete(url){
        return axios.delete(url, this.#getConfig());
    }


    static #getConfig(){
        return {
            baseURL: API_URL,
            headers: this.#getHeaders()
        }
    }

    static #getHeaders() {
        let token = sessionStorage.getItem(TOKEN_STORAGE_LOCATION)
        
        if (token == null) return {};
        return {Authorization: "Bearer " + token};
    }
}

export default ApiService;