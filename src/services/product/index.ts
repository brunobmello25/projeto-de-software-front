import api from '../utils/api';

export const createProduct = async (product: Object) => {
    try {
        const response = await api.post('/products', product);
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

export const deleteProduct = async (product_id: number) => {
    try {
        const response = await api.delete(`/products/${product_id}`);
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

export const getListProducts = async () => {
    try {
        const response = await api.get('/products');
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

export const getListStock = async () => {
  try {
    const response = await api.get("/storage");
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        `Erro ${error.response.status}: ${error.response.data.message}`
      );
    } else if (error.request) {
      throw new Error("Erro de rede ou o servidor não respondeu.");
    } else {
      throw new Error("Erro desconhecido ao configurar a requisição.");
    }
  }
};

export const addProduct = async (product: Object) => {
    try {
        const response = await api.post('/storage', product);
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

export const updateStorage = async (product: any) => {
    try {
        const response = await api.post(`/storage/${product.productId}`, product);
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

export const removeStorage = async (product_id: number) => {
    try {
        const response = await api.delete(`/storage/${product_id}`);
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