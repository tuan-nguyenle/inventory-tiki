import axios from 'axios';

export const getallpallets = async () => {
    try {
        const response = await axios.get('http://localhost/api/warehouse/pallets');
        return response.data.pallets;
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