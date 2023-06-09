import axios from 'axios';

const axiosWithAuth = axios.create({
    baseURL: 'http://ec2-3-21-134-116.us-east-2.compute.amazonaws.com/api/',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});

export default axiosWithAuth;
