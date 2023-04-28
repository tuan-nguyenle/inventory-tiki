import axios from 'axios';

export const getNotication = async () => {
    try {
        const response = await axios.post('link').then(res => res.json())
        return response;
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

export const addNewAccount = (data) => {
    return axios.post('link', data);
}