import axios from 'axios';

export const submitOB = async (data, orderid) => {
    try {
        const combinedJson = JSON.stringify(data, null, 2);
        console.log(combinedJson);
        console.log(orderid);
        const response = await axios.post(`${window.location.protocol + '//' + window.location.host}`+`/api/orders/export/${orderid}`, data, {
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
export const sendproducts = async (data) => {
    // const combinedJson = JSON.stringify(data, null, 2);
    // console.log(combinedJson);
    try {
        const response = await axios.post(`${window.location.protocol + '//' + window.location.host}`+"/api/warehouse/findShelfSpecific", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}