import axios from 'axios';

export const getallpallets = async () => {
    try {
        const response = await axios.get('http://localhost/api/warehouse/pallets');
        return response.data.pallets;
    } catch (error) {
        throw error;
    }
}
export const transfershelf = async (data) => {
    const combinedJson = JSON.stringify(data, null, 2);
    console.log(combinedJson);
    try {
        const response = await axios.post("http://localhost/api/warehouse/shelf", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}
export const getallshelf = async () => {
    try {
        const response = await axios.get('http://localhost/api/warehouse/shelf');
        return response.data.data;
    } catch (error) {
        throw error;
    }
}
// export const getproducts = async (id) => {
//     try {
//         const response = await axios.post(`http://localhost/api/warehouse/pallets/${id}`);
//         return response.data.pallets;
//     } catch (error) {
//         throw error;
//     }
// }