import React from 'react';
import { FooterWrapper } from './Table.styles';

const TableFooter = ({ totalRecords }) => {
  return (
    <FooterWrapper>
      Total Records: {totalRecords}
    </FooterWrapper>
  );
};

export default TableFooter;