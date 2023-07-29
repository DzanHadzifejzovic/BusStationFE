import jwtDecode from "jwt-decode";
import {BASE_API_URL} from '../config';
import axios from "axios";

export async function getLogin(event,username,password){
    event.preventDefault();

    const url = BASE_API_URL+'Authentication/login';
    let inputObj = {"username":username,"password":password}

    const response =  axios.post(url,inputObj,{
      headers:{'content-type':'application/json'}
    })
    .then(res=> res.data);
  
    return response;
}

export async function getRegister(event,firstName,lastName,userName,email,password,country,city,address,phoneNum,confirmPassword){
     event.preventDefault();

     const url = BASE_API_URL+'Authentication/register';
     let inputObj = {"firstName":firstName,"lastName":lastName,"userName":userName,"email":email,"password":password,"country":country,
     "username":userName,"city":city,"address":address,"phoneNumber":phoneNum}

    const response =  axios.post(url,inputObj,{
      headers:{'content-type':'application/json'},
    })
    .then(res=> res.data);
  
    return response;

}

export async function refreshAccessTokenFromApi(accessToken){

  let inputObj = {"accessToken":accessToken,refreshToken:""}
  const url = BASE_API_URL+'Authentication/refresh-access-token';

  try {
    const response = axios.post(url,inputObj,{
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res=>{
      console.log(res.data.accessToken);
      localStorage.setItem('token', res.data.accessToken);
      return res.data;
    });

    return response;
    /*console.log(response);
    if (response) {
      //const data = await response.json();
      console.log(response.accessToken);

      const newAccessToken = response.accessToken; //data.accessToken;

      const newValues = {
        token:newAccessToken,
      }
      // Spremite novi pristupni token u lokalno skladište
      localStorage.setItem('token', newAccessToken);

      return newValues;
    } else {
      useNavigate('/login-page');
    }*/
  } catch (error) {
    // Prikazujte grešku ili izvršite dodatne korake za rukovanje greškom
  }



}

export function isTokenExpired(token){
  var isExpired = false;

  var decodedToken=jwtDecode(token);
  var dateNow =Math.floor(Date.now() / 1000);

  if(decodedToken.exp < dateNow)
  {
    isExpired = true;
  }
  return isExpired;
}

export async function getRoleFromAccessToken(){

  const token =  localStorage.getItem('token');
  try {
    const response = await fetch(BASE_API_URL+'Authentication/get-role-for-user-from-token', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'myToken': token
      },
    }).then((resp)=>{
      return resp.text();
    });

    console.log("Role: " + response);
    return response;

  }catch(error){
    console.log('neki error');
  }
}