import axios from "axios"
const apiUrl = 'http://localhost:8080/api/login/';
const handleLoginAPI = async (account) => {
    // const respone = await fetch("http://localhost:8080/api/login/", {
    //     method: "POST", // *GET, POST, PUT, DELETE, etc.
    //     mode: "cors", // no-cors, *cors, same-origin
    //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //     credentials: "same-origin", // include, *same-origin, omit
    //     headers: {
    //         "Content-Type": "application/json",
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     redirect: "follow", // manual, *follow, error
    //     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //     body: JSON.stringify({ username: account.username, password: account.password }), // body data type must match "Content-Type" header
    // });
    return await axios.post(apiUrl, {
        username: account.username,
        password: account.password
    })
        .then(response => {
            // Xử lý phản hồi từ server khi yêu cầu thành công
            return response.data.user;
        })
        .catch(error => {
            throw error;
        });

}

export default handleLoginAPI;