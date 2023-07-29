import React from 'react'
import { TableBodyWrapper,TableRow,TableCellContent, TableHeaderCellContent, TableRowHeader } from './Table.styles'
import { useNavigate } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';

const TableBody = ({section,data,columnsHeader,deleteRow,editRow}) => {
  
  const navigate = useNavigate();

 
  const onRowClick =(id,page)=>{
    scroll.scrollToTop();
    navigate(`bus-line/${id}`);
  }

  return (
    <TableBodyWrapper>
      <thead>
        <TableRowHeader>          
        { 
          //!isAdmin &&
          columnsHeader.map((column, index) => (
            <TableHeaderCellContent
              key={index}
              className={index >= columnsHeader.length-2  && columnsHeader.length>5 ? 'hide-on-mobile' : ''}>
              {column.title}
            </TableHeaderCellContent>
          ))
        }
        
        </TableRowHeader>
      </thead>

      {data && data.length > 0 ? (
        <tbody>
          {data.map((element, index) => {
            if (section === 'busLines') {
              const date = new Date(element.departureTime);
              const formattedDate = new Intl.DateTimeFormat('en-US',{
                year:'numeric',
                month:'long',
                day:'numeric',
                hour:'numeric',
                minute:'numeric',
                second:'numeric'
              }).format(date);
              return (
                <TableRow key={index} onClick={()=>onRowClick(element.id)}>
                
                  <TableCellContent>{element.roadRoute}</TableCellContent>
                  <TableCellContent>{element.numberOfPlatform}</TableCellContent>
                  <TableCellContent>{formattedDate}</TableCellContent>
                  <TableCellContent>{element.cardPrice}</TableCellContent>
                  <TableCellContent>{element.bus.name}</TableCellContent>
                  <TableCellContent className='hide-on-mobile'>
                    {element.bus.hasAirConditioning === true ? 'has air conditioning' : 'no air conditioning'}
                  </TableCellContent>
                  <TableCellContent className='hide-on-mobile'>
                    {element.bus.hasTV === true ? 'Has tv' : 'No tv'}
                  </TableCellContent>

                </TableRow>
              );
            } else if (section === 'users') {
              return (
                <TableRow key={index}>
                  <TableCellContent>{element.firstName}</TableCellContent>
                  <TableCellContent>{element.lastName}</TableCellContent>
                  <TableCellContent>{element.username}</TableCellContent>
                  <TableCellContent>{element.country}</TableCellContent>
                  <TableCellContent>{element.city}</TableCellContent>
                  <TableCellContent className='hide-on-mobile'>{element.address}</TableCellContent>
                  <TableCellContent className='hide-on-mobile'>{element.roles.join(' / ')}</TableCellContent>
                </TableRow>
              );
            } else if (section === 'requests') {
              const date = new Date(element.timestamp);
              const formattedDate = new Intl.DateTimeFormat('en-US',{
                year:'numeric',
                month:'long',
                day:'numeric',
                hour:'numeric',
                minute:'numeric',
                second:'numeric'
              }).format(date);
              return (
                <TableRow key={index}>
                  <TableCellContent>{formattedDate}</TableCellContent>
                  <TableCellContent>{element.requestMethod}</TableCellContent>
                  <TableCellContent longer>{element.requestPath}</TableCellContent>
                  <TableCellContent>{element.statusCode}</TableCellContent>
                </TableRow>
              );
            }
          })}
        </tbody>
      ) : (
        <tbody>
          <TableRow>
            <TableCellContent colSpan={columnsHeader.length}>No data to display</TableCellContent>
          </TableRow>
        </tbody>
      )}
    </TableBodyWrapper>
  );
}

export default TableBody
