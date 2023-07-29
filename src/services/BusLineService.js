import axios from 'axios';
import {BASE_API_URL} from '../config';

let url=`${BASE_API_URL}BusLine/bus-lines`;


export async function fetchBusLines(filter,sort,page){

  try {
    const response = await axios.get(`${url}`,{
      params:{
          filters: filter,
          sorts: sort,
          page: page.page,
          pageSize:page.pageSize
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

export async function getBusLineById(busLineId){
  try {
    const response = await axios.get(`${BASE_API_URL}BusLine/`+busLineId)
    .then(res=>{
      return res.data;
    });
    return response;

  } catch (error) {
    return [];
  }
}

export async function getNumbersOfPlatforms(){
  try {
    
    let url = `${BASE_API_URL}BusLine/numbers-of-platforms`
    const response = axios.get(url)
    .then(res=>{
      return res.data;
    });
    return response;

  } catch (error) {
    return [];
  }
}

export async function deleteBusLineById(token,busLineId){
  try {
    const response = await axios.delete(BASE_API_URL+'BusLine/'+busLineId,{
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
