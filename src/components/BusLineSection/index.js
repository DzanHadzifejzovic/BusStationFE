import React, { useEffect, useState } from 'react'
import { getNumbersOfPlatforms, fetchBusLines } from '../../services/BusLineService';
import CustomTable from '../Table/CustomTable';
import SearchBar from '../SearchBar';
import Sort from '../Sort';
import Filters from '../Filters';
import { FilterWrapper } from './BusLineSection.styles';
import { getBusNames } from '../../services/BusService';
import useAuth from '../../hooks/useAuth';
import { StyledButton } from '../BusesSection/BusPage.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


const BusLineSection = () => {
  const { auth } =useAuth();

  const isAdmin = auth.arrayRoles && auth.arrayRoles.includes('Admin');

  const headersOfColumns = [
    {
      title:'Road route',
      nameOfProp:'roadRoute',
      canSort:true,
      canFilter:true
    },
    {
      title:'Platform number',
      nameOfProp:'numberOfPlatform',
      canSort:true,
      canFilter:false
    },
    {
      title:'Departure time',
      nameOfProp:'departureTime',
      canSort:true,
      canFilter:true
    },
    {
      title:'Card price',
      nameOfProp:'cardPrice',
      canSort:true,
      canFilter:true
    },
    {
      title:'Bus',
      nameOfProp: 'bus.name',
      canSort:false,
      canFilter:false
    },
    {
      title:'Air Conditiong',
      nameOfProp:'bus.hasAirConditioning',
      canSort:false,
      canFilter:false
    },
    {
      title:'TV',
      nameOfProp:'bus.hasTV',
      canSort:false,
      canFilter:false
    }
  ]
  const availableaSorts = [
    {
      value:'roadRoute',
      label:'Road route'
    },
    {
      value:'numberOfPlatform',
      label:'Number Of Platform'
    },
    {
      value:'departureTime',
      label:'Departure Time'
    },
    {
      value:'cardPrice',
      label:'Card Price'
    }
  ]

  const[busLines,setBusLines] = useState({countAllBusLines:0,currentNumOfBusLines:0,busLines:[]});
  const[objOfPlatforms,setObjOfPlatforms] = useState([]);
  const[objOfBusNames,setObjOfBusNames] = useState([]);

  const[sort,setSort] = useState({order:'-',sortBy:'departureTime'}); 
  const[filter,setFilter] = useState({numberOfPlatform : '',busName: '',});
  const[page,setPage] = useState({page:1,pageSize:5});
  const[seacrh,setSearch] = useState('');
  const[isFirstRender, setIsFirstRender] = useState(true);
  const[isLoading,setIsLoading] = useState(true);

  const navigate = useNavigate();

  //buttons handle
  const addBusLine =()=>{
    navigate('busLine-form');
  }

  //methods for changing object in filter state
  const setFilterByNumberOfPlatform =(value)=>{
    setFilter((prevFilter) => ({
      ...prevFilter,
      numberOfPlatform: value,
    }));
  }
  const setFilterByBusName =(value)=>{
    setFilter((prevFilter) => ({
      ...prevFilter,
      busName: value,
    }));
  }
  const setPageNumber =(value)=>{
    setPage((prevFilter) => ({
      ...prevFilter,
      page: parseInt(value),
    }));
  }

  //async methos which i use in useEffect-s
  const getBusLinesWithParams = async (filter,sort,page) => {
    try {
     const response = await fetchBusLines(filter,sort,page);

     if(response.busLines){
        setBusLines(response);
     }else{
        setBusLines([]);
     }     
     setIsLoading(false);
    } catch (error) {
     console.log(error);
    }
  }

  // useEffects
  //for initial rendering
  useEffect(() => {
    setIsFirstRender(false);

    const getBusesNames= async()=>{
      try{
        const response = await getBusNames();
        setObjOfBusNames(response);
      }catch(error){
         console.log(error);
      }
    }
    const getPlatformsNumber = async ()=>{
      try{
        const response = await getNumbersOfPlatforms();
        setObjOfPlatforms(response);
      }catch(error){
         console.log(error);
      }
    }
    getBusLinesWithParams(filter,sort,page);
    getPlatformsNumber();
    getBusesNames();

  }, []);

  //for filtering,sorting,pagination
  useEffect(() => {
    if(!isFirstRender){
      getBusLinesWithParams(
         ( 
          (filter.numberOfPlatform !=='' && seacrh!='')
          ? `numberOfPlatform==${filter.numberOfPlatform},roadRoute@=*${seacrh}`:
          (filter.busName !=='' && seacrh!='')
          ?`busName==${filter.busName},roadRoute@=*${seacrh}`:
              (filter.numberOfPlatform !== '')&&(filter.busName !== '') 
              ? `numberOfPlatform==${filter.numberOfPlatform},busName==${filter.busName}`: (filter.numberOfPlatform != '') 
              ? `numberOfPlatform==${filter.numberOfPlatform}` : (filter.busName != '') 
              ? `busName==${filter.busName}`:(seacrh !='')
              ? `roadRoute@=*${seacrh}`:''
         ),     
         `${sort.order}${sort.sortBy}`,
         page
      );
    }
  }, [filter,sort,page,seacrh]); 

  return (
    <>
      <SearchBar setSearchTerm={setSearch} ></SearchBar>
      <Sort sortsAvailable={availableaSorts}  sort={sort} setSort={(sort)=>setSort(sort)}></Sort>
      {
          isAdmin && 
            <StyledButton onClick={addBusLine}>
              <FontAwesomeIcon icon={faPlus}  />
              Add
            </StyledButton>
      } 
      <FilterWrapper>
          <Filters title='Filter by number of platform' filterArray={objOfPlatforms?objOfPlatforms:[]}  setFilterGenre={setFilterByNumberOfPlatform}></Filters> 
          <Filters title='Filter by name of bus' filterArray={objOfBusNames?objOfBusNames:[]}  setFilterGenre={setFilterByBusName}></Filters>
      </FilterWrapper>
    {
      isLoading ?
        <p>Loading...</p>
        :
      <>
      
        <CustomTable section='busLines' data={busLines.busLines} 
          count={busLines.countAllBusLines} columns={headersOfColumns} 
          setPageNum={setPageNumber} 
          /*editRow={(id) => editSelectedRow(id)} 
          deleteRow={(id)=> deleteSelectedRow(id)}*/
        />
      </>
    }
    
    </>
  )
}

export default BusLineSection