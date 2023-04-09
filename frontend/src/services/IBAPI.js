import axios from 'axios';

export const getNotication = async () => {
    try {
        const response = await axios.post('link').then(res => res.json())
        return response;
    } catch (error) {
        throw error;
    }
}
export const getAllAccounts = () => {

}

export const addNewAccount = (data) => {
    return axios.post('link', data);
}