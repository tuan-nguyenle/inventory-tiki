import axios from 'axios';

export const getNotication = async () => {
    try {
        const response = await axios.get('http://localhost/api/orders')
        return response.data.data;
    } catch (error) {
        throw error;
    }
}
export const getAllAccounts = async () => {
    try {
        const response = await axios.get('http://localhost/api/auth/users');
        return response.data.data;

    } catch (error) {
        console.log(error);
    }
}
export const submitIB = async (data) => {
    try {
        console.log(data);
        const response = await axios.post("link", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const addNewAccount = (data) => {
    return axios.post('link', data);
}