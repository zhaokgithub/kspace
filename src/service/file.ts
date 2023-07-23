import request from './request';

export const queryFileList = async (currentDir = '') => {
    const path = `/file/list/?currentDir=${currentDir}`
    const res = await request.get(path);
    return res
}

export const updateLocalFile = async () => {
    const path = `/file/local/`
    const res = await request.post(path);
    return res
}

export const createFileDir =async (data:any) => {
    const path = `/file/directory/`
    const res = await request.post(path,data);
    return res
}