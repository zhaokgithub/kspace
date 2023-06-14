import request from './request';

export const queryFileList = async (currentDir = '/var/storage') => {
    const path = `/file/list/?currentDir=${currentDir}`
    const res = await request.get(path);
    return res
}

export const updateLocalFile = async () => {
    const path = `/file/local/`
    const res = await request.post(path);
    return res
}