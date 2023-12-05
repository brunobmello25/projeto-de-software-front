import api from '../utils/api';

export const createPatient = async (patient: Object) => {
    console.log(patient)
    try {
        const response = await api.post('/patients',patient);
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

export const updatePatient = async (patient: any) => {
    try {
        const response = await api.put(`/patients/${patient.id}`, patient);
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

export const getListPatients = async () => {
    try {
        const response = await api.get('/patients');
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

export const deletePatient = async (patient:any) => {
    try {
        const response = await api.delete(`/patients/${patient.id}`,patient);
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