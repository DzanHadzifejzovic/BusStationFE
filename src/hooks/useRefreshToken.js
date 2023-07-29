import axios from 'axios'
import { BASE_API_URL } from '../config'
import useAuth from './useAuth'

const useRefreshToken = () => {
    const {auth,setAuth} = useAuth();

    const refresh = async () =>{
        const inputTokenModel = {accessToken:auth.accessToken,refreshToken:auth.refreshToken}
        
        const response = await axios.post(BASE_API_URL+'Authentication/refresh-access-token',inputTokenModel,{
            withCredentials: true
        },);
        setAuth(prev=>{
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return {...prev,accessToken:response.data.accessToken}
        });

        return response.data.accessToken;
    }
  return refresh;
}

export default useRefreshToken