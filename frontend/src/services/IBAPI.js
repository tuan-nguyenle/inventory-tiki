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
export const submitIB = async (data, orderid) => {
    try {
        const combinedJson = JSON.stringify(data, null, 2);
        console.log(combinedJson);
        console.log(orderid);
        const response = await axios.post("http://localhost/api/orders/${orderid}", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        // throw error;
        console.log(error);
    }
}

export const addNewAccount = (data) => {
    return axios.post('link', data);
}