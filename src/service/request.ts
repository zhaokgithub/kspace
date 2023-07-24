import axios from 'axios';

const config: any = {
    baseURL: `${location.origin}/api`,

}
const instance = axios.create(config);

instance.interceptors.request.use(
    (config: any) => {
        const token = sessionStorage.getItem('token');
        config.headers['Authorization'] = 'Bearer ' + token;
        return config;
    },
    (err: any) => {
        console.log(err.status)
    })

instance.interceptors.response.use((res: any) => {
    return res && res.data || {};
}, (error: any) => {
    console.log('error: ', error);
    const response = error.response;
    console.log(error)
    if (response && response.status === 401) {
        sessionStorage.removeItem('token');
        location.href = `${location.origin}/login`
    }
    return { msg: "error" }
    return error;
})

export default instance;