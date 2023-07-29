import React, {useState,useEffect, useRef } from 'react'
import Grid from '../Grid'
import Card from '../Card' 
import { Header, StyledButton } from './BusPage.styles'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import useAxiosPrivate from '../../hooks/useAxiosPrivate'

const BusesSection = () => {
  const { auth,setAuth } = useAuth();

    const isAdmin = auth.arrayRoles && auth.arrayRoles.includes('Admin');

    const[buses,setBuses] = useState([]);
    const[errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(true);

    const errRef = useRef();  

    const navigate = useNavigate();
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();

    const addBus =()=>{
      navigate('bus-form')
    }

  useEffect(()=>{
      let isMounted = true;
      const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get('Bus',{
          signal: controller.signal
        });
        isMounted && setBuses(response.data);
        setLoading(false);
      }catch (err) {
        console.log("error in index with status code: " + JSON.stringify(err) + 'ILI TI ' + err);
        setAuth({});
        setErrMsg('Something went wrong while fetching data.');
        navigate('/login-page' ,{ state: { from: location }, replace: true }); //{ state: { from: location }, replace: true }
      }
    };

    fetchData();

    return () =>{
      if(!loading){
        isMounted = false;
        controller.abort();
      }
    }
    
  },[]);

    

  return (
    <>
    <Header>
        <h2>Our buses</h2>
        <p ref={errRef} style={errMsg ? 
              {backgroundColor:'lightpink',color:'firebrick',fontWeight:'bold',padding:'0.5rem',marginBottom:'0.5rem',textAlign:'center'} : 
              {position:'absolute',left:'-9999px'}} aria-live="assertive">{errMsg}</p>

    </Header>

    {
      isAdmin &&
      <StyledButton onClick={addBus}>
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: '5px' }} />
          Add
      </StyledButton>
    }

    {
    loading ? 
    <p>Fetching data...</p>
    :
    <>
    <Grid>
          {buses.map((bus,index)=>(  
          <Card key={index}
                 clickable={true} 
                 image='/bus-station.jpg'
                 busId={bus.id}
                 busName={bus.name}
                 /> 
          ))}
    </Grid>
    </>
    }
    </>
  )
}

export default BusesSection