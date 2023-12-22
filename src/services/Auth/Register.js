import axios from 'axios';

export const Register = async (infoUser) => {

    const response = await axios({
        url: 'https://backoffice.nodemy.vn/api/auth/local/register',
        method: 'post',
        data: infoUser
    })
    return response;
}
