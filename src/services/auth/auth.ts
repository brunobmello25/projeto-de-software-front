import api from '../utils/api';
import { setTokenCookie } from '../utils/cookie';

export const login = async (credentials: Object) => {
    try {
        const response = await api.post('/session', credentials);
        if (response.status === 200) {
            console.log('Login bem-sucedido!');
            const { token } = response.data;
            setTokenCookie(token);
        } else {
            console.warn('Resposta inesperada:', response);
        }
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
