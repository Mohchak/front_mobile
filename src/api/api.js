import axios from 'axios';

const url = 'http://192.168.100.14:8080';


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