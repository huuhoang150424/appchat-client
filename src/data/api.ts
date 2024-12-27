import { registerData, signData } from "../constants/interface"
import {HTTP } from "./http"

export const register=(payload:registerData)=>HTTP.post(`auth/register`,payload);

export const sign=(payload:signData)=>HTTP.post(`auth/login`,payload);

export const logout=(config:any)=>HTTP.post(`auth/logout`,config);

export const getConversation=(id:string)=>HTTP.get(`conversation/getConversation/${id}`);

export const createConversation=(data:any)=>HTTP.post(`conversation/createConversation`,data);

export const findUser = (keyword: string) => HTTP.get(`conversation/findUser/?keyword=${keyword}`);


export const sendMessage=(conversationId:string,data:any)=>HTTP.post(`conversation/sendMessage/${conversationId}`,data);

export const getAllMessage=(conversationId:string)=>HTTP.get(`conversation/getMessage/${conversationId}`);