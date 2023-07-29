import React, { useEffect } from 'react'
import { ErrorMsg, FormContainer, FormGroup, Input, Label, StyledButton } from '../BusesSection/BusForm.styles';
import { useState } from 'react';
import { getBusNames, getBuses } from '../../services/BusService';
import { CustomOption, CustomSelect } from './BusLineForm.styles';
import { fetchConductors, fetchDrivers } from '../../services/UserService';
import useAuth from '../../hooks/useAuth';

const BusLineForm = () => {
  const{auth}=useAuth();

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

  const[busNames,setBusNames] =useState([]);
  const[drivers,setDrivers] =useState([]);
  const[conductors,setConductors] =useState([]);

  // State to handle form errors
  const [formErrors, setFormErrors] = useState({});

  // Function to handle form submission
  const handleSubmit = (e) => {
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

    console.log("Form data 1:", formData);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    console.log("Form data 2:", formData);

  };

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]:name==='busId'?parseInt(value):value }));
  };

  useEffect(()=>{

    const getBusesNames= async()=>{
      try{
        const response = await getBuses(auth.accessToken);
        setBusNames(response);
      }catch(error){
        console.log(error);
      }
    }
    const getDrivers= async()=>{
      try{
        const response = await fetchDrivers(auth.accessToken);
        setDrivers(response);
      }catch(error){
        console.log(error);
      }
    }
    const getConductors= async()=>{
      try{
        const response = await fetchConductors(auth.accessToken);
        setConductors(response);
      }catch(error){
        console.log(error);
      }
    }

    getBusesNames();
    getDrivers();
    getConductors();
   
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
        <CustomOption disabled>Select a bus...</CustomOption>
      {
        busNames.map((bus,index)=>{
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
        <CustomOption disabled>Select a driver...</CustomOption>
      {
        drivers.map((driver,index)=>{
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
        <CustomOption disabled>Select a conductor...</CustomOption>
      {
        conductors.map((conductor,index)=>{
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
  </FormContainer>
  );
}

export default BusLineForm