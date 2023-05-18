import axios from 'axios';

export const submitOB = async (data, orderid) => {
    try {
        const combinedJson = JSON.stringify(data, null, 2);
        console.log(combinedJson);
        console.log(orderid);
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