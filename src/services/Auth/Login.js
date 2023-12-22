import axios from 'axios';

export const login = async (infoUser) => {

    const response = await axios({
        url: 'https://backoffice.nodemy.vn/api/auth/local',
        method: 'post',
        data: infoUser
    })
    return response;
}
