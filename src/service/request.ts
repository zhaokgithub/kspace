import axios from 'axios';
import Cookies from 'js-cookie';

const config:any = {
    baseURL: `${location.origin}/api`,

}
const instance = axios.create(config);

instance.interceptors.request.use(
    (config: any) => {
        const token = Cookies.get('token');
        config.headers['Authorization'] = 'Bearer ' + token;
        return config;
    },
    (err: any) => {
        console.log(err.status)
    })

instance.interceptors.response.use((res: any) => {

    return res && res.data || {};
}, (error: any) => {
    const response = error.response;
    console.log(error)
    if(response && response.status === 401){
        location.href = `${location.origin}/login`
    }
    return error;
})

export default instance;