import React, { useEffect } from 'react'
import { ErrorMsg, FormContainer, FormGroup, Input, Label, StyledButton } from '../BusesSection/BusForm.styles';
import { useState } from 'react';
import { CustomOption, CustomSelect } from './BusLineForm.styles';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useRef } from 'react';

const BusLineForm = () => {
  const{setAuth}=useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  
  const[formData, setFormData] = useState({
    numberOfPlatform: 0,
    roadRoute: "",
    departureDate:"",
    departureTime: "",
    delay: 0,
    cardPrice: 0,
    busId: 0,
    driverId: "",
    conductorId: "",
  });

  const[editData,setEditData] =useState({buses:[],conductors:[],drivers:[]});
  const [loading, setLoading] = useState(true);

  // State to handle form errors
  const [formErrors, setFormErrors] = useState({});
  const[errMsg, setErrMsg] = useState('');
  const errRef = useRef();  

  

  const addBusLine = async (inputObject) => {
    try {
      await axiosPrivate.post('BusLine',inputObject);
      navigate(-1);
    }catch (err) {
      setErrMsg('Input data isn\'t valid');
      setAuth({});
      navigate('/login-page' ,{ state: { from: location }, replace: true });
    }
  };


  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const errors = {};

    if (formData.numberOfPlatform <= 0) {
      errors.numberOfPlatform = "Number of platform must be greater than 0";
    }
    if (formData.roadRoute.length <=0) {
      errors.roadRoute = "Road route can't be empty";
    }
    if (!formData.departureDate) {
      errors.departureDate = "Departure date is required";
    }
    if (!formData.departureTime) {
      errors.departureTime = "Departure time is required";
    }
    if (isNaN(formData.delay) || formData.delay <= 0) {
      errors.delay = "Delay must be a non-negative number";
    }
    if (isNaN(formData.cardPrice) || formData.cardPrice <= 0) {
      errors.cardPrice = "Card price must be a positive number";
    }
    if (!formData.busId) {
      errors.busId = "Please select a bus";
    }
    if (formData.driverId.length<=0) {
      errors.driverId = "Please select a driver";
    }
    if (formData.conductorId.length<=0) {
      errors.conductorId = "Please select a conductor";
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    const combinedDateTime = new Date(`${formData.departureDate}T${formData.departureTime}:00.167Z`);
    const isoDateTime = combinedDateTime.toISOString();

    const inputObject=
    {
      numberOfPlatform:formData.numberOfPlatform,
      roadRoute:formData.roadRoute,
      departureTime:isoDateTime,
      delay:formData.delay,
      cardPrice:formData.cardPrice,
      busId:formData.busId,
      driverId:formData.driverId,
      conductorId:formData.conductorId
    };

    await addBusLine(inputObject);
  };

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]:name==='busId'?parseInt(value):value }));
  };

  useEffect(()=>{
    let isMounted = true;
    const controller = new AbortController();

    const getEditData= async()=>{
      try{
        const response = await axiosPrivate.get('BusLine/get-data-for-busLine-edit-page',{
          signal: controller.signal
        });
        isMounted && setEditData(response.data);
        setLoading(false);
      }catch(error){
        setAuth({});
        navigate('/login-page' ,{ state: { from: location }, replace: true });
      }
    }
    getEditData();

    return () =>{
      if(!loading){
        isMounted = false;
        controller.abort();
      }
    }
  },[])

  return (
    <FormContainer onSubmit={handleSubmit}>
    <FormGroup>
      <Label>Number of Platform:</Label>
      <Input
        type="number"
        name="numberOfPlatform"
        value={formData.numberOfPlatform}
        onChange={handleChange}
      />
      {formErrors.numberOfPlatform && (<ErrorMsg>{formErrors.numberOfPlatform}</ErrorMsg>
      )}
    </FormGroup>
    <FormGroup>
      <Label>Road Route:</Label>
      <Input
        type="text"
        name="roadRoute"
        value={formData.roadRoute}
        onChange={handleChange}
      />
      {formErrors.roadRoute && <ErrorMsg>{formErrors.roadRoute}</ErrorMsg>}
    </FormGroup>
    <FormGroup>
      <Label>Departure Date:</Label>
      <Input
        type="date"
        name="departureDate"
        value={formData.departureDate}
        onChange={handleChange}
      />
      {formErrors.departureDate && <ErrorMsg>{formErrors.departureDate}</ErrorMsg>}
    </FormGroup>
    <FormGroup>
      <Label>Departure Time:</Label>
      <Input
        type="time"
        name="departureTime"
        value={formData.departureTime}
        onChange={handleChange}
      />
      {formErrors.departureTime && <ErrorMsg>{formErrors.departureTime}</ErrorMsg>}
    </FormGroup>
    <FormGroup>
      <Label>Delay:</Label>
      <Input
        type="text"
        name="delay"
        value={formData.delay}
        onChange={handleChange}
      />
      {formErrors.delay && <ErrorMsg>{formErrors.delay}</ErrorMsg>}
    </FormGroup>
    <FormGroup>
      <Label>Card Price:</Label>
      <Input
        type="text"
        name="cardPrice"
        value={formData.cardPrice}
        onChange={handleChange}
      />
      {formErrors.cardPrice && <ErrorMsg>{formErrors.cardPrice}</ErrorMsg>}
    </FormGroup>

    <FormGroup>
      <Label>Bus :</Label>
      <CustomSelect name='busId' onChange={handleChange} value={formData.busId}>
        <CustomOption disabled defaultChecked value='0'> Select a bus... </CustomOption>
      {
        editData.buses.map((bus,index)=>{
          return (
          <CustomOption key={index} value={bus.id}>
            {bus.name}
          </CustomOption>
          )
        })
      }
      </CustomSelect>
      {formErrors.busId && <ErrorMsg>{formErrors.busId}</ErrorMsg>}
    </FormGroup>

    <FormGroup>
      <Label>Driver :</Label>
      <CustomSelect name='driverId' onChange={handleChange} value={formData.driverId}>
        <CustomOption disabled defaultChecked value=''>Select a driver...</CustomOption>
      {
        editData.drivers.map((driver,index)=>{
          return (
          <CustomOption key={index} value={driver.id}>
            {driver.firstName} {driver.lastName}
          </CustomOption>
          )
        })
      }
      </CustomSelect>
      {formErrors.driverId && <ErrorMsg>{formErrors.driverId}</ErrorMsg>}
    </FormGroup>

    <FormGroup>
      <Label>Conductor :</Label>
      <CustomSelect name='conductorId' onChange={handleChange} value={formData.conductorId}>
        <CustomOption disabled defaultChecked value=''>Select a conductor...</CustomOption>
      {
        editData.conductors.map((conductor,index)=>{
          return (
          <CustomOption key={index} value={conductor.id}>
            {conductor.firstName} {conductor.lastName}
          </CustomOption>
          )
        })
      }
      </CustomSelect>
      {formErrors.conductorId && <ErrorMsg>{formErrors.conductorId}</ErrorMsg>}
    </FormGroup>
    
        <StyledButton type="submit">Submit</StyledButton>

        <p ref={errRef} style={errMsg ? 
              {backgroundColor:'lightpink',color:'firebrick',fontWeight:'bold',padding:'0.5rem',marginBottom:'0.5rem',textAlign:'center'} : 
              {position:'absolute',left:'-9999px'}} aria-live="assertive">{errMsg}</p>
  </FormContainer>
  );
}

export default BusLineForm