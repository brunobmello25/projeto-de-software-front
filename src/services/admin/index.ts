import api from '../utils/api';

export const createUser = async (user: Object) => {
    try {
        const response = await api.post('/users',user);
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

export const editUser = async (user: Object, id: number) => {
    try {
        const response = await api.put(`/users/${id}`, user);
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
        const response = await api.get('/users');
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