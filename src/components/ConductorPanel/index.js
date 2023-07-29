import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import Sort from "../Sort";
import { FilterWrapper } from "../BusLineSection/BusLineSection.styles";
import Filters from "../Filters";
import CustomTable from "../Table/CustomTable";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getBusNames } from "../../services/BusService";
import { getNumbersOfPlatforms } from "../../services/BusLineService";

const ConductorSchedule = () => {
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

  const {auth,setAuth} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
    
      const[busLines,setBusLines] = useState({countAllBusLines:0,currentNumOfBusLines:0,busLines:[]});
      const[objOfPlatforms,setObjOfPlatforms] = useState([]);
      const[objOfBusNames,setObjOfBusNames] = useState([]);
    
      const[sort,setSort] = useState({order:'-',sortBy:'departureTime'}); 
      const[filter,setFilter] = useState({numberOfPlatform : '',busName: '',});
      const[page,setPage] = useState({page:1,pageSize:5});
      const[seacrh,setSearch] = useState('');
      const[isFirstRender, setIsFirstRender] = useState(true);
      const[isLoading,setIsLoading] = useState(true);
      
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
      const fetchData = async (abortController,isMountedVal,filter,sort,page) => {
        try {
          const response = await axiosPrivate.get(`BusLine/bus-lines/worker?username=${auth.username}`,{
            signal: abortController.signal,
            params:{
              filters: filter,
              sorts: sort,
              page: page.page,
              pageSize:page.pageSize
            } 
          });
          setIsLoading(false);
          isMountedVal && setBusLines(response.data);
        }catch(err){
          if (err && err.response && err.response.status === 401) {
            setAuth({});
            console.log('Token expired');
            navigate('/login-page',{ state: { from: location }, replace: true }); 
      
        } else {
            console.log('Error fetching data: ', err);
            setAuth({});
            navigate('/login-page',{ state: { from: location }, replace: true });
      
        }
        }
      }
      
    useEffect(()=>{
      const getBusesNames = async () => {
        try {
          const response = await getBusNames();
          setObjOfBusNames(response);
        } catch (error) {
          console.log(error);
        }
      };
      const getPlatformsNumber = async () => {
        try {
          const response = await getNumbersOfPlatforms();
          setObjOfPlatforms(response);
        } catch (error) {
          console.log(error);
        }
      };
      getPlatformsNumber();
      getBusesNames();
      setIsFirstRender(false);

      let isMounted = true;
      const controller = new AbortController();

      fetchData(controller, isMounted, filter, sort, page);

      return () => {
        if (!isLoading) {
          isMounted = false;
          controller.abort();
        }
      }
    },[])
      
  useEffect(() => {
    if (!isFirstRender) {
      const getBusesNames = async () => {
        try {
          const response = await getBusNames();
          setObjOfBusNames(response);
        } catch (error) {
          console.log(error);
        }
      };
      const getPlatformsNumber = async () => {
        try {
          const response = await getNumbersOfPlatforms();
          setObjOfPlatforms(response);
        } catch (error) {
          console.log(error);
        }
      };
      getPlatformsNumber();
      getBusesNames();
      let isMounted = true;
      const controller = new AbortController();

      fetchData(controller, isMounted,
        (
          (filter.numberOfPlatform !== '' && seacrh != '')
            ? `numberOfPlatform==${filter.numberOfPlatform},roadRoute@=*${seacrh}` :
            (filter.busName !== '' && seacrh != '')
              ? `busName==${filter.busName},roadRoute@=*${seacrh}` :
              (filter.numberOfPlatform !== '') && (filter.busName !== '')
                ? `numberOfPlatform==${filter.numberOfPlatform},busName==${filter.busName}` : (filter.numberOfPlatform != '')
                  ? `numberOfPlatform==${filter.numberOfPlatform}` : (filter.busName != '')
                    ? `busName==${filter.busName}` : (seacrh != '')
                      ? `roadRoute@=*${seacrh}` : ''
        ),
        `${sort.order}${sort.sortBy}`,
        page
      );
      return () => {
        if (!isLoading) {
          isMounted = false;
          controller.abort();
        }
      }
    }
    },[filter,sort,page,seacrh])


      return (
        <>
          <SearchBar setSearchTerm={setSearch} ></SearchBar>
          <Sort sortsAvailable={availableaSorts}  sort={sort} setSort={(sort)=>setSort(sort)}></Sort>
    
          <FilterWrapper>
              <Filters title='Filter by number of platform' filterArray={objOfPlatforms?objOfPlatforms:[]}  setFilterGenre={setFilterByNumberOfPlatform}></Filters> 
              <Filters title='Filter by name of bus' filterArray={objOfBusNames?objOfBusNames:[]}  setFilterGenre={setFilterByBusName}></Filters>
          </FilterWrapper>
        
        {
          isLoading ?
            <p>Loading...</p>
            :
            <CustomTable section='busLines' data={busLines.busLines} 
            count={busLines.countAllBusLines} columns={headersOfColumns} setPageNum={setPageNumber} />
        }
          
        
        </>
      )
    }

export default ConductorSchedule