import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { deleteBus, editBus, getBusById } from '../../services/BusService';
import { Container, DetailItem, DetailLabel, DetailValue, EditIcon, Heading, StyledButton, TrashIcon } from './BusDetails.styles';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../../index.css';
import useAuth from '../../hooks/useAuth';

const BusDetails = () => {
    const[bus,setBus] = useState({});
    const[rbYesChecked, setRbYesChecked] = useState(false);
    const[rbNoChecked, setRbNoChecked] = useState(false);
    const[loading, setLoading] = useState(true);
    const[errMsg, setErrMsg] = useState('');
    const[successMsg, setSuccessMsg] = useState('');

    const errRef = useRef();  
    const {busId} = useParams();
    const {auth} = useAuth();
    const isAdmin = auth.arrayRoles && auth.arrayRoles.includes('Admin');

    const navigate = useNavigate();
    const location = useLocation();

    const goBack = () => navigate(-1);

    const onChangeRB=(typeOfBtn)=>{
      if(typeOfBtn==='no'){
        setRbNoChecked(true);
        setRbYesChecked(false);
      }else if(typeOfBtn==='yes'){
        setRbYesChecked(true);
        setRbNoChecked(false);
      }
      //btnRef.current.style.visibility='visible';
    }

    const onDelete = async (id) => {
      try {
       const response = await deleteBus(auth.accessToken,id);
        if(response){
          navigate(-1);
        }else{
          setErrMsg('Cant\'t delete because bus is connected to the line');
          setTimeout(() => {
            setErrMsg('');
          },3500);
        }
      } catch (error) {
        setErrMsg('Server error')
        setTimeout(() => {
          setErrMsg('');
        },3500);
      }
    }

    const onEdit = async (id) => {
      try {
       const response = await editBus(auth.accessToken,id);  
       if(response){
        setSuccessMsg('Successfully changed driving condition');
        setTimeout(() => {
          setSuccessMsg('');
        },3500);
       }else{
        setErrMsg('Something went wrong while changing driving condition');
        setTimeout(() => {
          setErrMsg('');
        },3500);
       }     
       setLoading(false);
      } catch (error) {
        setErrMsg(error.message)
        setTimeout(() => {
          setErrMsg('');
        },3500);
      }
    }

    useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await getBusById(busId,auth.accessToken);
        setLoading(false);

        setBus(response);
        setRbYesChecked(response.drivingCondition);
        setRbNoChecked(!response.drivingCondition);
      }catch (err) {
        console.log("error in detilBus with status code: " + JSON.stringify(err) + '\nILI TI ' + err);
        setErrMsg('Something went wrong while fetching data.');
        setLoading(false);
        navigate('/login-page', { state: { from: location }, replace: true });
      }
    };

    fetchData();
    },[])

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
          <Heading>Detalji autobusa</Heading>

          <DetailItem>
            <DetailLabel>Name of bus:</DetailLabel>
            <DetailValue>{bus.name}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Bus number</DetailLabel>
            <DetailValue>{bus.numberOfBus}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Number of seats:</DetailLabel>
            <DetailValue>{bus.numberOfSeats}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Air conditiong ? </DetailLabel>
            <DetailValue>{bus.hasAirConditioning ? 'have' : 'doesn\'t have'}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>TV ? </DetailLabel>
            <DetailValue>{bus.hasTV ? 'have' : 'doesn\'t have'}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Drivable ? </DetailLabel>
            <DetailValue>{bus.drivingCondition ? 'yes' : 'no'}</DetailValue>
          </DetailItem>
          {
          isAdmin &&
          <DetailItem>
            <StyledButton danger='danger' onClick={() => onDelete(bus.id)} >
               <TrashIcon icon={faTrash} />
               Delete
            </StyledButton>
          </DetailItem>
          
          }
          {
          auth.arrayRoles.length != 0 && (auth.arrayRoles.includes('Admin') || auth.arrayRoles.includes('Conductor') || auth.arrayRoles.includes('Driver') )
          ?
          <>
          <DetailItem>
            <StyledButton onClick={() => onEdit(bus.id)}> {/*style={{visibility:'hidden'}}  ref={btnRef} */}
              <EditIcon icon={faEdit} />
              Change drivable condition
            </StyledButton>

            <input
							  type="radio"
							  name='rb'
							  value='No'
							  className='filter_input'
                checked={rbNoChecked}
                onChange={() => onChangeRB('no')}
					    />
              <p style={{display:"inline"}} className='filter_label'>No</p>

              <input
                type="radio"
                name='rb'
                value='yes'
               checked={rbYesChecked}
               onChange={() => onChangeRB('yes')}
              />
              <p style={{display:"inline"}} className='filter_label'>Yes</p>
          </DetailItem>

          <div className="flexGrow">
                <button className="go-back" onClick={goBack}>Go Back</button>
          </div>

          </>
          :
          ''
          }
        </>
        }

        </Container>
    </>
  )
}

export default BusDetails