import React, { useEffect, useState } from "react";
import Sort from "../Sort";
import { FilterWrapper } from "../BusLineSection/BusLineSection.styles";
import Filters from "../Filters";
import CustomTable from "../Table/CustomTable";
import useAuth from "../../hooks/useAuth";
import SearchBar from "../SearchBar";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AdminPanelRequests = () => {

  const headersOfColumns = [
    {
      title:'Time',
      nameOfProp:'timestamp',
    },
    {
      title:'Request method',
      nameOfProp:'requestMethod',
    },
    {
      title:'Request path',
      nameOfProp:'requestPath'
    },
    {
      title:'Status code',
      nameOfProp:'statusCode'
    }
  ]

  const availableaSorts = [
    {
      value:'timestamp',
      label:'Time'
    },
    {
      value:'requestMethod',
      label:'Request Method'
    },
    {
      value:'statusCode',
      label:'Status Code'
    }
  ]

  const {setAuth} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  const[events,setEvents] = useState({countAllEvents:0,currentNumOfEvents:0,events:[]});
  const[objOfMethods,setObjOfMethods] = useState(['PATCH','DELETE']);

  const[sort,setSort] = useState({order:'-',sortBy:'timestamp'}); 
  const[filter,setFilter] = useState({requestMethod : ''});
  const[page,setPage] = useState({page:1,pageSize:5});
  const[seacrh,setSearch] = useState('');
  const[isFirstRender, setIsFirstRender] = useState(true);
  const[isLoading,setIsLoading] = useState(true);
  
  //methods for changing object in filter state
  const setFilterByReqMethod =(value)=>{
    setFilter((prevFilter) => ({
      ...prevFilter,
      requestMethod: value,
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
      const response = await axiosPrivate.get('User/get-events',{
        signal: abortController.signal,
        params:{
          filters: filter,
          sorts: sort,
          page: page.page,
          pageSize:page.pageSize
        } 
      });
      setIsLoading(false);
      isMountedVal && setEvents(response.data);
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

  // useEffects
  //for initial rendering
  useEffect(() => {
    setIsFirstRender(false);

    let isMounted = true;
    const controller = new AbortController();

    fetchData(controller,isMounted,filter,sort,page);

    return () =>{
      if(!isLoading){
      isMounted =false;
      controller.abort();
      }
    }

  }, []);

  useEffect(()=>{
    if(!isFirstRender){
    let isMounted = true;
    const controller = new AbortController();

    fetchData(controller,isMounted,
      (
        (filter.requestMethod !== '' && seacrh!= '')
        ? `requestMethod==${filter.requestMethod},requestPath@=*${seacrh}` :
        (filter.requestMethod !== '' )
        ? `requestMethod==${filter.requestMethod}`:''
      ),
      `${sort.order}${sort.sortBy}`,
      page
     );

    return () =>{
      if(!isLoading){
      isMounted =false;
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
          <Filters title='Filter by type of request method' filterArray={objOfMethods?objOfMethods:[]}  setFilterGenre={setFilterByReqMethod}></Filters> 
      </FilterWrapper>

      {
      isLoading ?
        <p>Loading...</p>
        :
          <CustomTable
            section='requests'
            data={events.events}
            count={events.countAllEvents}
            columns={headersOfColumns}
            setPageNum={setPageNumber}
          />
      }
    </>
  );
};

export default AdminPanelRequests;
