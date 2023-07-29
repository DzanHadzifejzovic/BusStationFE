import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Container, DetailItem, DetailLabel, DetailValue, EditIcon, Heading, StyledButton, TrashIcon } from '../BusesSection/BusDetails.styles';
import '../../index.css';
import { deleteBusLineById, getBusLineById } from '../../services/BusLineService';
import { useRef } from 'react';
import useAuth from '../../hooks/useAuth';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const BusLineDetail = () => {
   const[busLine,setBusLine] = useState({});
   const[loading, setLoading] = useState(true);
   const[errMsg, setErrMsg] = useState('');
   const[successMsg, setSuccessMsg] = useState('');
 
  const errRef = useRef();  
  const {busLineId} = useParams();

  const{auth} =useAuth();
  const isAdmin = auth.arrayRoles && auth.arrayRoles.includes('Admin');

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const goBack = () => navigate(-1);
  
  const onDelete = async (id) =>{
      try{
        const resp = await deleteBusLineById(auth.accessToken,id);
        if(resp){
          navigate(-1);
        }
      }catch(err){
          setErrMsg('Cant\'t delete');
          setTimeout(() => {
            setErrMsg('');
          },3500);
      }
  }
  const onEdit = (id) => {
    navigate('edit')
  }

    useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await getBusLineById(busLineId);
        setLoading(false);
        setBusLine(response);
      }catch (err) {
        console.log("error in detilBus with status code: " + JSON.stringify(err) + '\nILI TI ' + err);
        setLoading(false);
        navigate('/login-page', { state: { from: location }, replace: true });
      }
    };
    fetchData();
    },[]);

    const dateObj = new Date(busLine.departureTime);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };

  return (
    <>
        <p ref={errRef} style={errMsg ? 
          {backgroundColor:'lightpink',color:'firebrick',fontWeight:'bold',padding:'0.5rem',marginBottom:'0.5rem',textAlign:'center'} : 
          {position:'absolute',left:'-9999px'}} aria-live="assertive">{errMsg}</p>
        <p ref={errRef} style={successMsg ? 
          {backgroundColor:'lightgreen',color:'green',fontWeight:'bold',padding:'0.5rem',marginBottom:'0.5rem',textAlign:'center'} : 
          {position:'absolute',left:'-9999px'}} aria-live="assertive">{successMsg}</p>
        <Container>
        {
          loading ? 
          <p>Fetching data...</p> 
            : 
          <>  
          <hr />
          <Heading>Details about line</Heading>
          <hr />

          <DetailItem>
            <DetailLabel>Road Route:</DetailLabel>
            <DetailValue>{busLine.roadRoute}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Number Of Platform: </DetailLabel>
            <DetailValue>{busLine.numberOfPlatform}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Departure Time</DetailLabel>
            <DetailValue>
            {
              dateObj.toLocaleString('en-US',options)
            }
            </DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Delay</DetailLabel>
            <DetailValue>{busLine.delay}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Card Price </DetailLabel>
            <DetailValue>{busLine.cardPrice}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Number Of Reserved Cards</DetailLabel>
            <DetailValue>{busLine.numberOfReservedCards}</DetailValue>
          </DetailItem>
     
          <hr />
          <Heading>Details about bus for line</Heading>
          <hr />

          <DetailItem>
            <DetailLabel>Bus Name:</DetailLabel>
            <DetailValue>{busLine.bus.name}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Number Of Seats: </DetailLabel>
            <DetailValue>{busLine.bus.numberOfSeats}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Air conditiong ? </DetailLabel>
            <DetailValue>{busLine.bus.hasAirConditioning ? 'have' : 'doesn\'t have'}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>TV ? </DetailLabel>
            <DetailValue>{busLine.bus.hasTV ? 'have' : 'doesn\'t have'}</DetailValue>
          </DetailItem>

          <hr />
          <Heading>Details about workers for line</Heading>
          <hr />

          {
            busLine.busLineUsers.length <=0 ? 
            <p>No data available</p> :
            busLine.busLineUsers.map((u,index)=>{
              return <DetailItem key={index}>
                <DetailLabel>{u.user.roles.join(' / ')} :</DetailLabel>
                <DetailValue>{u.user.username}</DetailValue>
              </DetailItem>
            })
          }

          {
          isAdmin &&
          <>
          <DetailItem>
            <StyledButton danger='danger' onClick={()=>onDelete(busLine.id)} >
               <TrashIcon icon={faTrash} />
               Delete
            </StyledButton>
          </DetailItem>

          <DetailItem>
            <StyledButton onClick={() => onEdit(busLine.id)}> {/*style={{visibility:'hidden'}}  ref={btnRef} */}
              <EditIcon icon={faEdit} />
              Edit this Bus Line
            </StyledButton>
          </DetailItem>
          </>
          }
          <div className="flexGrow">
                <button className="go-back" onClick={goBack}>Go Back</button>
          </div>
          
        </>
        }

        </Container>
    </>
  )

}

export default BusLineDetail