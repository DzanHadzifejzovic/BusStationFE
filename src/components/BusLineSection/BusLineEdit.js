import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Heading } from '../BusesSection/BusDetails.styles';
import { FormGroup } from '../BusesSection/BusForm.styles';
import { Label } from '../Login/Login.styles';
import { CustomOption, CustomSelect } from './BusLineForm.styles';

const BusLineEdit = () => {
  const {busLineId} = useParams();

  const{setAuth}=useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  const[editData,setEditData] =useState({busLine:{},buses:[],conductors:[],drivers:[]});
  const[formData, setFormData] = useState({
    numberOfReservedCards: 0,
    departureDate:"",
    departureTime: "",
    busId: 0,
    driverId: "",
    conductorId: "",
  });
  const [loading, setLoading] = useState(true);
  const [defaultDriverId, setDefaultDriverId] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]:name==='busId'?parseInt(value):value }));
  };

  useEffect(()=>{
    let isMounted = true;
    const controller = new AbortController();

    const getEditData= async()=>{
      try{
        const response = await axiosPrivate.get('BusLine/get-data-for-busLine-edit-page?busLineId='+busLineId,{
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
    findDefaultDriverId();

    return () =>{
      if(!loading){
        isMounted = false;
        controller.abort();
      }
    }
  },[]);

  

  const findDefaultDriverId = () => {
    // Check if busLineUsers exists and is not empty
    if (
      editData.busLine.busLineUsers &&
      editData.busLine.busLineUsers.length > 0
    ) {
      // Find the default driver ID from the busLineUsers array
      const driverUser = editData.busLine.busLineUsers.find(
        (user) => user.user.roles.includes('Driver')
      );
      if (driverUser && driverUser.user && driverUser.user.id) {
        setDefaultDriverId(driverUser.user.id);
      } else {
        setDefaultDriverId(null);
      }
    } else {
      setDefaultDriverId(null);
    }
  };
  return (
    <>
          {
              loading ?
                  <p>Fetching data...</p>
                  :
                  <>
                      <Heading>Edit Data</Heading>

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
                            //editData.busLine.busLineUsers.filter((u)=> u.user.roles.includes('Driver')).id
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
                          <CustomSelect name='conductorId' onChange={handleChange}>
                              <CustomOption disabled defaultChecked value=''>Select a conductor...</CustomOption>
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

          </>
    }
    </>
  )
}

export default BusLineEdit