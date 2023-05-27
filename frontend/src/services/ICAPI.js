import axios from 'axios';

export const getallpallets = async () => {
    try {
        const response = await axios.get(`${window.location.protocol + '//' + window.location.host}`+'/api/warehouse/pallets');
        return response.data.pallets;
    } catch (error) {
        throw error;
    }
}
export const getallpallets2 = async () => {
    try {
        const response = await axios.get(`${window.location.protocol + '//' + window.location.host}`+'/api/warehouse/pallets');
        return response.data.pallets;
    } catch (error) {
        throw error;
    }
}
export const transfershelf = async (data) => {
    try {
        const response = await axios.post(`${window.location.protocol + '//' + window.location.host}`+"/api/warehouse/shelf", data, {
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
        const response = await axios.get(`${window.location.protocol + '//' + window.location.host}`+'/api/warehouse/shelf');
        return response.data.data;
    } catch (error) {
        throw error;
    }
}
export const searchproduct = async (id, sup) => {
    try {
        const response = await axios.get(`${window.location.protocol + '//' + window.location.host}`+`/api/warehouse/shelf?bar_code=${id}&supplier_name=${sup}`)
        return response.data.data;
    } catch (error) {
        throw error;
    }
}
// export const getproducts = async (id) => {
//     try {
//         const response = await axios.post(`${window.location.protocol + '//' + window.location.host}`+`/api/warehouse/pallets/${id}`);
//         return response.data.pallets;
//     } catch (error) {
//         throw error;
//     }
// }