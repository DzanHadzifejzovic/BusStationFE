import axios from 'axios';
import {BASE_API_URL} from '../config';

// work with useAxiosPrivate

export async function getBuses(token){
  try {
    const response =  axios.get(BASE_API_URL+'Bus',{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
    .then(res=>{
      return res.data;
    });
    return response;

  } catch (error) {
    return [];
  }
}
export async function getBusById(busId,token){

  try {
    const response = axios.get(BASE_API_URL+'Bus/'+busId,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
    .then(res=>{
      return res.data;
    });
    return response;
  } catch (error) {
    return [];
  }
}

export async function getBusNames(){
  try {
    const response =  axios.get(BASE_API_URL+'Bus/bus-names',{
    })
    .then(res=>{
      return res.data;
    });
    return response;

  } catch (error) {
    return [];
  }
}

export async function addBus(token,busObject){
  console.log(busObject);
  try {
    const response =  axios.post(BASE_API_URL+'Bus',busObject,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
    .then(res=>{
      return res.data;
    });
    return response;

  } catch (error) {
    return [];
  }
}

export async function deleteBus(token,busId){
  try {
    const response = await axios.delete(BASE_API_URL+'Bus/'+busId,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
    .then(res=>{
      return res.data;
    });
    return response;

  } catch (error) {
    return [];
  }
}

export async function editBus(token,busId){
  try {
    const response =  axios.patch(BASE_API_URL+'Bus/report-fault/'+busId,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
    .then(res=>{
      return res.data;
    });
    return response;

  } catch (error) {
    return [];
  }
}


