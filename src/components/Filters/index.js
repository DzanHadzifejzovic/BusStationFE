import React, {useState} from 'react'
import { Wrapper } from './Filters.styles';
import { CustomButton  } from '../Button/Button.styles'; 
import styled from 'styled-components';

const StyledButton = styled(CustomButton)`
    background-color: transparent;
	color: red;
    display: flex;
    justify-content: center;

	& button{
	background: transparent;
    color: red;
	}
	
`;

const Filters = ({title, filterArray, setFilterGenre}) => {
	const [selectedFilter, setSelectedFilter] = useState(null);

	const onChange = (event) => {
		const { value } = event.target;
		setFilterGenre(value);
		setSelectedFilter(value);

	};
	const clearFilter = () => {
		setFilterGenre('');
		setSelectedFilter(null);
	  };

  return (
    <Wrapper className='filter-container'>
    	<div className='container'>
			<h1 className='heading'>{title}</h1>
			<div className='filter_container'>
				{filterArray.map((element,index) => (
					<div className='filter' key={index}>
						<input
							type="radio"
							name={typeof element==='string' ? 'buses':'platforms'}
							value={element}
							className='filter_input'
							onChange={onChange}
							checked={selectedFilter == element}
						/>
						<p className='filter_label'>{element}</p>
					</div>
				))}
			</div>
    			<StyledButton onClick={clearFilter} buttonSize='btn--medium' buttonStyle='btn--test' children='Remove filters'/>

		</div>
    </Wrapper>
	);
}

export default Filters;