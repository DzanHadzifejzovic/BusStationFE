import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import Sort from "../Sort";
import { FilterWrapper } from "../BusLineSection/BusLineSection.styles";
import Filters from "../Filters";
import CustomTable from "../Table/CustomTable";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AdminPanelUsers = () => {

  const headersOfColumns = [
    {
      title:'First Name',
      nameOfProp:'firstName'
    },
    {
      title:'Last Name',
      nameOfProp:'lastName'
    },
    {
      title:'Username',
      nameOfProp:'username'
    },
    {
      title:'Country',
      nameOfProp:'country'
    },
    {
      title:'City',
      nameOfProp:'city'
    },
    {
      title:'Address',
      nameOfProp:'address'
    },
    {
      title:'Role/s',
      nameOfProp:'roles'
    }
  ]

  const availableaSorts = [
    {
      value:'firstName',
      label:'First Name'
    },
    {
      value:'lastName',
      label:'Last Name'
    },
    {
      value:'username',
      label:'Username'
    }
  ]

  const {setAuth} = useAuth();
  
  const[users,setUsers] = useState({countAllUsers:0,currentNumOfUsers:0,users:[]});
  const[objOfRoles,setObjOfRoles] = useState(['Srbija','Slovenija','BiH','Nemacka']);

  const[sort,setSort] = useState({order:'-',sortBy:'firstName'}); 
  const[filter,setFilter] = useState({country : ''});
  const[page,setPage] = useState({page:1,pageSize:5});
  const[seacrh,setSearch] = useState('');
  const[isFirstRender, setIsFirstRender] = useState(true);
  const[isLoading,setIsLoading] = useState(true);
  const[errMsg, setErrMsg] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  //methods for changing object in filter state
  const setFilterByRole =(value)=>{
    setFilter((prevFilter) => ({
      ...prevFilter,
      country: value,
    }));
  }
 
  const setPageNumber =(value)=>{
    setPage((prevFilter) => ({
      ...prevFilter,
      page: parseInt(value),
    }));
  }

const fetchData = async (abortController,isMountedVal,filter,sort,page) => {
  try {
    const response = await axiosPrivate.get('User/users',{
      signal: abortController.signal,
      params:{
        filters: filter,
        sorts: sort,
        page: page.page,
        pageSize:page.pageSize
      } 
    });
    setIsLoading(false);
    isMountedVal && setUsers(response.data);
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
  },[])

  useEffect(()=>{
    if(!isFirstRender){
    let isMounted = true;
    const controller = new AbortController();

    fetchData(controller,isMounted,
      ( 
       (filter.country !=='' && seacrh!='')
       ? `country==${filter.country},firstName@=*${seacrh}`:
           (filter.country !== '')
           ? `country==${filter.country}`: (seacrh != '') 
           ? `firstName@=*${seacrh}`:''
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
          <Filters title='Filter by number of platform' filterArray={objOfRoles?objOfRoles:[]}  setFilterGenre={setFilterByRole}></Filters> 
      </FilterWrapper>

    {
      isLoading ?
        <p>Loading...</p>
        :
      <CustomTable section='users' data={users.users} 
        count={users.countAllUsers} columns={headersOfColumns} setPageNum={setPageNumber} />   
    }
    </>
  );
};

export default AdminPanelUsers;
