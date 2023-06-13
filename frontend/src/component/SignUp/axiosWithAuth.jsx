import axios from 'axios';



const axiosWithAuth = axios.create({
    baseURL: 'http://ec2-3-131-97-133.us-east-2.compute.amazonaws.com/api/',
    headers: {
        Authorization: `Token ${localStorage.getItem('ent')}`
    },
});

export default axiosWithAuth;
