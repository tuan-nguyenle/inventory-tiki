import axios from 'axios';

getAllAccounts = () => {

}

addNewAccount = (data) => {
    return axios.post('link', data);
}

export { addNewAccount, getAllAccounts }