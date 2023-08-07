import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Heading } from '../BusesSection/BusDetails.styles';
import { FormContainer, FormGroup, Input, Label, StyledButton } from '../BusesSection/BusForm.styles';
import { CustomOption, CustomSelect } from './BusLineForm.styles';

const BusLineEdit = () => {
  const { busLineId } = useParams();

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  const [editData, setEditData] = useState({ busLine: {}, buses: [], conductors: [], drivers: [] });
  const [formData, setFormData] = useState({
    numberOfReservedCards: 0,
    departureDate: "",
    departureTime: "",
    busId: 0,
    driverId: "",
    conductorId: "",
  });
  const [loading, setLoading] = useState(true);
  const [defaultDriverId, setDefaultDriverId] = useState(null);
  const [defaultConductorId, setDefaultConductorId] = useState(null);  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: name === 'busId' ? parseInt(value) : value }));
  };

  const formatTimeForInput = (dateTime) => {
    const date = new Date(dateTime);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const editBusLine = async (inputObject) => {
    try {
      await axiosPrivate.patch('BusLine/edit-busLine',inputObject);
      navigate('/bus-lines');//
    }catch (err) {
      setAuth({});
      navigate('/login-page' ,{ state: { from: location }, replace: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isoDateTime=null;
    let combinedDateTime=null;

    if((formData.departureDate != null && formData.departureDate != '') && (formData.departureTime != null && formData.departureTime != '')){
        combinedDateTime = new Date(`${formData.departureDate}T${formData.departureTime}:00.740Z`);//740Z//000Z
        isoDateTime = combinedDateTime.toISOString();
    }else if(formData.departureDate != ''){
        const time = formatTimeForInput(editData.busLine.departureTime); 
        combinedDateTime = new Date(`${formData.departureDate}T${time}:00.740Z`); 
        isoDateTime = combinedDateTime.toISOString();
    }else if(formData.departureTime != ''){
        const date = new Date(editData.busLine.departureTime).toISOString().split('T')[0];
        combinedDateTime = new Date(`${date}T${formData.departureTime}:00.740Z`);
        isoDateTime = combinedDateTime.toISOString();        
    }else{
        isoDateTime = editData.busLine.departureTime;
    }
    
  
    const inputObject =
    {
      busLineId: busLineId,
      dateTime: isoDateTime,
      numOfCards: (formData.numberOfReservedCards > 0 ) ? formData.numberOfReservedCards:0,
      busId: formData.busId != 0 ? formData.busId : editData.busLine.bus.id ,
      oldConductorId: defaultConductorId,
      conductorId: formData.conductorId != '' ? formData.conductorId : defaultConductorId ,
      oldDriverId: defaultDriverId,
      driverId: formData.driverId != '' ? formData.driverId : defaultDriverId ,
    };

    await editBusLine(inputObject);
  };

  const goBack = () => navigate('/bus-lines');


  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getEditData = async () => {
      try {
        const response = await axiosPrivate.get('BusLine/get-data-for-busLine-edit-page?busLineId=' + busLineId, {
          signal: controller.signal
        });
        isMounted && setEditData(response.data);

        const defaultDriver = response.data.busLine.busLineUsers.find(
          (u) => u.user.roles.includes("Driver")
        );

        const defaultConductor = response.data.busLine.busLineUsers.find(
          (u) => u.user.roles.includes("Conductor")
        );

        // Set the defaultDriverId and defaultConductorId state variable
        setDefaultDriverId(defaultDriver ? defaultDriver.user.id : null);
        setDefaultConductorId(defaultConductor ? defaultConductor.user.id : null);

        setLoading(false);
      } catch (error) {
        setAuth({});
        navigate('/login-page', { state: { from: location }, replace: true });
      }
    }

    getEditData();

    return () => {
      if (!loading) {
        isMounted = false;
        controller.abort();
      }
    }
  }, []);


  const defaultValueTime = formatTimeForInput(editData.busLine.departureTime);

  return (
    <>
      {
        loading ?
          <p>Fetching data...</p>
          :
          <>
            <Heading>Edit Data</Heading>
            <FormContainer action='PATCH' onSubmit={handleSubmit}>

              <FormGroup>
                <Label>Departure Date:</Label>
                <Input
                  type='date'
                  name='departureDate'
                  defaultValue={new Date(editData.busLine.departureTime).toISOString().split('T')[0]}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label>Departure Time:</Label>
                <Input
                  type='time'
                  name='departureTime'
                  defaultValue={defaultValueTime}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label>Add number of reserved cards:</Label>
                <Input
                  type='number'
                  name="numberOfReservedCards"
                  defaultValue={0}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label>Bus :</Label>
                <CustomSelect defaultValue={editData.busLine.bus.id} name='busId' onChange={handleChange}>
                  {
                    editData.buses.map((bus, index) => {
                      return (
                        <CustomOption key={index} value={bus.id}>
                          {bus.name}
                        </CustomOption>
                      )
                    })
                  }
                </CustomSelect>
              </FormGroup>

              <FormGroup>
                <Label>Driver :</Label>
                <CustomSelect
                  defaultValue={defaultDriverId}
                  name='driverId' onChange={handleChange}>
                  {
                    editData.drivers.map((driver, index) => {
                      return (
                        <CustomOption key={index} value={driver.id}>
                          {driver.firstName} {driver.lastName}
                        </CustomOption>
                      )
                    })
                  }
                </CustomSelect>
              </FormGroup>

              <FormGroup>
                <Label>Conductor :</Label>
                <CustomSelect
                  defaultValue={defaultConductorId}
                  name='conductorId' onChange={handleChange}>
                  {
                    editData.conductors.map((conductor, index) => {
                      return (
                        <CustomOption key={index} value={conductor.id}>
                          {conductor.firstName} {conductor.lastName}
                        </CustomOption>
                      )
                    })
                  }
                </CustomSelect>
              </FormGroup>

              <FormGroup>
                <StyledButton type="submit">Save changes</StyledButton>
              </FormGroup>

              <FormGroup>
                <div className="flexGrow">
                  <button className="go-back" onClick={goBack}>Go Back</button>
                </div>
              </FormGroup>

            </FormContainer>
          </>
      }
    </>
  )
}

export default BusLineEdit