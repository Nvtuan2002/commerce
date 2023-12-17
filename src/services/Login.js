import axios from 'axios';

export const login = async (infoUser) => {

    const response = await axios({
        url: 'https://fakestoreapi.com/auth/login',
        method: 'post',
        data: infoUser
    })
    return response;
}

export const listUser = async () => {

    const response = await axios({
        url: `https://fakestoreapi.com/users/`,
        method: 'get'
    })
    return response;
}