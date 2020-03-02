import {BaseURL, axios} from './config';

//-----------------------------------学生列表---------------------------------------------
export const getList = params => { return axios.post(`${BaseURL}/sdkversion`)};

//-----------------------------------条件查询---------------------------------------------
export const getList_search = params => { return axios.post(`${BaseURL}/sdkversion`,  params)};

//-----------------------------------新增学生---------------------------------------------
export const addInfo = params => { return axios.post(`${BaseURL}/sdkversion/new`,  params)};

//-----------------------------------删除学生---------------------------------------------
export const removeInfoById = params => { return axios.delete(`${BaseURL}/sdkversion/`+params.id)};
