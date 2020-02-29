import {BaseURL, axios} from './config';

//-----------------------------------学生列表---------------------------------------------
export const getList = params => { return axios.get(`${BaseURL}/sdkinterface`)};

//-----------------------------------新增学生---------------------------------------------
export const addInfo = params => { return axios.post(`${BaseURL}/sdkinterface/new`,  params)};

//-----------------------------------删除学生---------------------------------------------
export const removeInfoById = params => { return axios.delete(`${BaseURL}/sdkinterface/`+params.id)};
