import axios from "axios"
import fakeuser from "../views/Account/fakeuser.json"
const apiUrl = 'http://localhost/api/auth/login/';
const fakeuser2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWFkZDNmNTRlODJiZjkwMjVkMGY3YyIsInVzZXJuYW1lIjoiVHVhbkxlMjUxMjIwMDEiLCJmdWxsbmFtZSI6IkxlIE5ndXllbiBUdWFuIiwicGhvbmUiOiIwODY5MjM2NTE0IiwiUm9sZSI6W3siX2lkIjoiNjQxYWJkNWM5NWM2OWM4YzUzNmEyMGU1IiwiZGVzY3JpcHRpb24iOiJtYW5hZ2VyIn1dLCJEZXBhcnRtZW50IjpbeyJfaWQiOiI2NDFhYmJhZjUzMjE3NTZlMDE5Mjc3MjYiLCJkZXNjcmlwdGlvbiI6Im91dGJvdW5kIn1dLCJpYXQiOjE2ODM4NjUyMTl9.yKcu5P5CGjB61xH1fPXK_oz0n5bF-NMRMGrJZzlBdCI"
const handleLoginAPI = async (account) => {
    // return fakeuser2;
    return await axios.post(apiUrl, {
        username: account.username,
        password: account.password
    })
        .then(response => {
            // Xử lý phản hồi từ server khi yêu cầu thành công
            console.log(response.data);
            return response.data.user;
        })
        .catch(error => {
            throw error;
        });

}

export default handleLoginAPI;