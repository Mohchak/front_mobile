import axios from 'axios';

const url = process.env.REACT_APP_URL_API;


export const getMenu = (id) => {
    return axios({
        method: 'GET',
        url: url + '/api2/table/' + id,
    })
}

export const getMenus = () => {
    return axios({
        method: 'GET',
        url: url + '/api2/table' ,
    })
}