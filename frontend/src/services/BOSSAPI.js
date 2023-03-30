import axios from 'axios';
const apiUrl = 'http://localhost/inputexcel';
const Sendexcel = async (newdata) => {
    try {
        const response = await axios.post(apiUrl, {
            data: newdata
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export { Sendexcel }