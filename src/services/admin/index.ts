import axios from "axios";

const URL = "//127.0.0.1:3001";

const api = axios.create({
  baseURL: URL,
});

export const createUser = async (user: Object) => {
    try {
        const response = await api.post('/', user);
        return response;
    } catch ((err: any) => {
        console.log(err)
    });
};