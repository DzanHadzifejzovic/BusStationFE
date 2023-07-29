import React,{useState,useEffect,useRef} from "react";
import PropTypes from 'prop-types';

//image
import { faSearch } from "@fortawesome/free-solid-svg-icons";
//Styles
import { Wrapper,Content } from "./SearchBar.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar =({setSearchTerm})=>{

    const [state,setState] = useState('');
    const initial = useRef(true);

    useEffect(()=>{
        if(initial.current){
            initial.current=false;
            return;
        }   
        const timer = setTimeout(() => {
            setSearchTerm(state);
        }, 500);

        return () => clearTimeout(timer);

    },[setSearchTerm,state])

    return(
        <Wrapper>
            <Content>
                <FontAwesomeIcon className="image" icon={faSearch} />
                <input 
                type='text' 
                placeholder="Search" 
                onChange={event=>setState(event.currentTarget.value)}
                value={state}
                />
            </Content>
        </Wrapper>
    );
};

/*SearchBar.propTypes = {
    callback: PropTypes.func
}*/


export default SearchBar;