import React,{useState} from 'react'
import { FormContainer,FormGroup,Label,Input,ErrorMsg, StyledButton } from './BusForm.styles';
import { addBus } from '../../services/BusService';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useEffect } from 'react';
import { useRef } from 'react';
const BusForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        numberOfBus: 0,
        yearOfManufacture: 0,
        numberOfSeats: 0,
        hasAirConditioning: false,
        hasTV: false,
      });
      const [errors, setErrors] = useState({});

      const firstInput = useRef();

      const {auth} = useAuth();
      const navigate = useNavigate();

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};
        if (!formData.name) {
          validationErrors.Name = 'Polje je obavezno';
        }
        if (!formData.numberOfBus) {
          validationErrors.NumberOfBus = 'Polje je obavezno';
        }
        if (!formData.yearOfManufacture) {
          validationErrors.YearOfManufacture = 'Polje je obavezno';
        }
        if (!formData.numberOfSeats) {
          validationErrors.NumberOfSeats = 'Polje je obavezno';
        }
        setErrors(validationErrors);
    
        // Ako nema grešaka, možete ovdje poslati podatke na backend
        try{
            var response =  addBus(auth.accessToken,formData);
            navigate(-1);
        }catch(err){
            setErrors('Server error')
        }
      };

      useEffect(()=>{
        firstInput.current.focus();
      },[])
    
      return (
        <FormContainer onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Bus name</Label>
            <Input
              ref={firstInput}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.Name && <ErrorMsg>{errors.Name}</ErrorMsg>}
          </FormGroup>
          <FormGroup>
            <Label>Bus number</Label>
            <Input
              type="number"
              name="numberOfBus"
              value={formData.numberOfBus}
              onChange={handleChange}
              required
            />
            {errors.NumberOfBus && <ErrorMsg>{errors.NumberOfBus}</ErrorMsg>}
          </FormGroup>
          <FormGroup>
            <Label>Year Of Manufacture</Label>
            <Input
              type="number"
              name="yearOfManufacture"
              value={formData.yearOfManufacture}
              onChange={handleChange}
              required
            />
            {errors.YearOfManufacture && (
              <ErrorMsg>{errors.YearOfManufacture}</ErrorMsg>
            )}
          </FormGroup>
          <FormGroup>
            <Label>Number Of Seats</Label>
            <Input
              type="number"
              name="numberOfSeats"
              value={formData.numberOfSeats}
              onChange={handleChange}
              required
            />
            {errors.NumberOfSeats && <ErrorMsg>{errors.NumberOfSeats}</ErrorMsg>}
          </FormGroup>
          <FormGroup>
            <Label>Has Air Conditioning ?</Label>
            <Input
              type="checkbox"
              name="hasAirConditioning"
              checked={formData.hasAirConditioning}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  hasAirConditioning: e.target.checked,
                }))
              }
            />
          </FormGroup>
          <FormGroup>
            <Label>Has TV ?</Label>
            <Input
              type="checkbox"
              name="hasTV"
              checked={formData.hasTV}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  hasTV: e.target.checked,
                }))
              }
            />
          </FormGroup>
          <FormGroup>
            <StyledButton type="submit">Add</StyledButton>
          </FormGroup>
        </FormContainer>
      );
}

export default BusForm