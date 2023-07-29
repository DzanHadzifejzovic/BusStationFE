import React from 'react';
import TableFooter from './TableFooter';
import Pagination from './Pagination';
import TableBody from './TableBody';
import {CustomTableWrapper} from './Table.styles'; 

const CustomTable = ({section,data,count, columns,setPageNum,deleteRow,editRow}) => {
    return (
      <>
      
      <CustomTableWrapper>
            
        <TableBody section={section} data={data} columnsHeader={columns} editRow={editRow} deleteRow={deleteRow}/>

        <TableFooter totalRecords={count} />
        
        <Pagination items={data} count={count} itemsPerPage={5} setPageNum={setPageNum}></Pagination>

      </CustomTableWrapper>
      </>
    );
  };
  
  export default CustomTable;