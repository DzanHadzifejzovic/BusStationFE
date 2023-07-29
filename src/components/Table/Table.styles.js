import styled from "styled-components";
//main Wrapper
export const CustomTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #f2f2f2;
  font-weight: bold;

  
  & .delete-btn {
    color: #e10d05;
  }
  
  @media screen and (max-width: 1275px){ //1024px 1275
    .hide-on-mobile {
         display: none; 
     }
  }

  @media screen and (max-width: 750px) { //576px
    //get back columns
    .hide-on-mobile {
         display: block;
     }

  table, thead, tbody, th, td, tr { 
		display: block; 
    //hide header(name of columns)
    thead tr { 
		display: none;
	  }
	
	  tr { border: 5px solid #ccc; }
	
	  td { 
		/* Behave  like a "row" */
		border: none;
		border-bottom: 1px solid #eee; 
    position: relative;
    width: 70vw;
	  }
	
	  td:before { 
		/* Now like a table header */
		position: absolute;
		/* Top/left values mimic padding */
		top: 6px;
		left: 6px;
		width: 45%; 
		padding-right: 10px; 
		white-space: nowrap;
	  }
	}
  }
`;

//TableBodyComponent styles
export const TableBodyWrapper = styled.table`
  display: flex;
  justify-content: start;
  flex-direction: column;
  
  tr:nth-child(even) {
  background-color: #f2f2f2;
  }
`;

export const TableRowHeader = styled.tr`
  display: flex;
  background-color: lightgray;
  color: white;
  align-items: center;
  padding: 10px;
`;

export const TableRow = styled.tr`
  display: flex;
  align-items: center;
  padding: 10px;
  //background-color: ${(props) => (props.even ? '#f2f2f2' : '#fff')};

  :nth-child(odd) {
    background-color: #fff;
    :hover{
      background-color: #0099da !important;
      color: white;
    }
  }

  :nth-child(even) {
    background-color: #f2f2f2;
    :hover{
      background-color: #0099da !important;
    }
  }

`;

export const TableCellContent = styled.td`
  flex: 1;
  border-right: 1px solid #ccc;
  padding: 10px;
  width: ${(props) =>(props.longer ? '200px' : '150px' )};

  &:last-child {
    border-right: none;
  }
`;

export const TableHeaderCellContent = styled.th`
  flex: 1;
  border-right: 1px solid #ccc;
  padding: 10px;

  &:last-child {
    border-right: none;
  }
`;

export const PaginationWrapper = styled.div`

  ul.react-paginate {
    margin-bottom: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    list-style-type: none;
    padding: 0 5rem;
  }
  
  ul.react-paginate li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    border: gray 1px solid;
    cursor: pointer;
  }
  ul.react-paginate li.previous a,
  ul.react-paginate li.next a,
  ul.react-paginate li.break a {
    border-color: transparent;
  }
  ul.react-paginate li.selected a {
    background-color: #0366d6;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  ul.react-paginate li.disabled a {
    color: grey;
  }
  ul.react-paginate li.disable,s
  ul.react-paginate li.disabled a {
    cursor: default;
  }

  @media screen and (max-width: 700px){
      ul.react-paginate {
      display: block;
      width: fit-content;
      text-align: center;
    }
    ul.react-paginate li.previous {
      padding: 15px;
    }
    ul.react-paginate li.next {
      margin-top:15px;
    }
   
  }
`
//TableFooter component styles
export const FooterWrapper  = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  background-color: #f2f2f2;
`;

