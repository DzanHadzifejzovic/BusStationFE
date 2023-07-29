import React from "react";
import { Wrapper } from "./Sort.styles";

const Sort = ({ sortsAvailable ,sort, setSort }) => {

	const onSelectChange = ({ currentTarget: input }) => {
		setSort({order: sort.order ,sortBy: input.value });
	};

	const onArrowChange = () => {
		if (sort.order === '') {
			setSort({ order: '-',sortBy: sort.sortBy });
		} else {
			setSort({ order: '',sortBy: sort.sortBy, });
		}
	};

	return (
        <Wrapper>
        <div className='container'>
			<p className='sort_by'>Sort By :</p>
			<select
				onChange={onSelectChange}
				className='select'
				defaultValue={sort.sortBy}
			>
				{
					sortsAvailable.map((element,index)=>{
						return <option key={index} value={element.value} defaultValue={element.value}>{element.label}</option>
					})
				}

			</select>
			<button className='arrow_btn' onClick={onArrowChange}>
				<p className='up_arrow'>&uarr;</p>
				<p className='down_arrow'>&darr;</p>
			</button>
		</div>
        </Wrapper>
	);
};

export default Sort;