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
        throw error;
    }
}
export const submitIB = async (data, orderid) => {
    try {
        // const combinedJson = JSON.stringify(data, null, 2);
        // console.log(combinedJson);
        // console.log(orderid);
        const response = await axios.post(`http://localhost/api/orders/${orderid}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        // throw error;
        throw error;
    }
}
export const getDetailReback = async (id) => {
    try {
        const response = await axios.get(`http://localhost/api/orders/${id}`)
        return response.data.data;

    } catch (error) {
        throw error;
    }
}
export const createPallet = async (data) => {
    const combinedJson = JSON.stringify(data, null, 2);
    console.log(combinedJson);
    try {
        const response = await axios.post("http://localhost/api/warehouse/pallets", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}
export const getallpallets = async () => {
    try {
        const response = await axios.get('http://localhost/api/warehouse/pallets');
        return response.data.pallets;
    } catch (error) {
        throw error;
    }
}
export const uploadstatus = async (id) => {
    try {
        const response = await axios.get(`http://localhost/api/warehouse/pallets/${id}`)
        return response;
    } catch (error) {
        throw error;
    }
}
export const addNewAccount = (data) => {
    return axios.post('link', data);
}