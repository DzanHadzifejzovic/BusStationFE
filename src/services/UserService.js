import axios from 'axios';
import {BASE_API_URL} from '../config';

// work with useAxiosPrivate

export async function fetchDrivers(token){

    try {
      const response =  axios.get(BASE_API_URL+'User/drivers',{
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

export async function fetchConductors(token){

  try {
    const response =  axios.get(BASE_API_URL+'User/conductors',{
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

