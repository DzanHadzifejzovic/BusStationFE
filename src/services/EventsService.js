import axios from 'axios';
import {BASE_API_URL} from '../config';

export async function fetchEvents(token,filter,sort,page){

    try {
      const response =  axios.get(BASE_API_URL+'User/get-events',{
        headers:{
          'Authorization':`Bearer ${token}`
        },
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
      return  response;
    } catch (error) {
      return [];
    }
  }