import request from './request';
/**
 * 
 * @param currentDir 当前文件目录
 * @param type 1:全部文件 2:我的文件 3:分享过的文件 4:已删除文件
 * @returns 
 */
export const queryFileList = async (params: any) => {
    const path = `/file/list/`
    const res = await request.get(path, { params });
    return res
}

/**
 * 
 * @param filePath 
 * @returns 
 */
export const getFileShareURL = async (filePath = '') => {
    const path = `/file/share/?filePath=${filePath}`
    const res = await request.get(path);
    return res
}
/**
 * 
 * @param filePath 
 * @returns 
 */
export const getPresignedFileURL = async (fileName = '', bucketName = '') => {
    const path = `/file/uploadUrl/`
    const res:any = await request.post(path,{fileName,bucketName});
    return res?.result?.url || null;
}

export const downloadFile = async (params: any) => {
    const path = `/file/download/`
    const res = await request.get(path, { params });
    return res
}

export const deleteFile = async (filePath = '') => {
    const path = `/file/del/?filePath=${filePath}`
    const res = await request.get(path);
    return res
}

export const handleUploadFile = async (data: any) => {
    console.log('data: ', data);
    const path = `/file/upload/`
    const res = await request.post(path, data);
    return res
}
export const updateLocalFile = async () => {
    const path = `/file/local/`
    const res = await request.post(path);
    return res
}

export const createFileDir = async (data: any) => {
    const path = `/file/directory/`
    const res = await request.post(path, data);
    return res
}
export const uploadCloudFile = async (data: any) => {
    const path = `/file/upload/`
    const res = await request.post(path, data);
    return res
}
export const deleteCloudFile = async (data: any) => {
    const path = `/file/del/`
    const res = await request.post(path, data);
    return res
}