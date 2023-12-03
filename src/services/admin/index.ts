import axios from "axios";

const URL = "//127.0.0.1:3001";

const api = axios.create({
    baseURL: URL,
});

export const createUser = async (user: Object) => {
    try {
        const response = await api.post('/', user);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(`Erro ${error.response.status}: ${error.response.data.message}`);
        } else if (error.request) {
            throw new Error('Erro de rede ou o servidor não respondeu.');
        } else {
            throw new Error('Erro desconhecido ao configurar a requisição.');
        }
    }
};

export const editUser = async (user: Object) => {
    try {
        const response = await api.put('/', user);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(`Erro ${error.response.status}: ${error.response.data.message}`);
        } else if (error.request) {
            throw new Error('Erro de rede ou o servidor não respondeu.');
        } else {
            throw new Error('Erro desconhecido ao configurar a requisição.');
        }
    }
};

export const getListUsers = async () => {
    try {
        const response = await api.get('/');
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(`Erro ${error.response.status}: ${error.response.data.message}`);
        } else if (error.request) {
            throw new Error('Erro de rede ou o servidor não respondeu.');
        } else {
            throw new Error('Erro desconhecido ao configurar a requisição.');
        }
    }
}