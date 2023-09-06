import { Pagination } from '@mantine/core';
import React from 'react';
import { PaginationType } from '../../types';

type CartPaginationProps = {
  pagination: PaginationType;
  setPagination: React.Dispatch<React.SetStateAction<PaginationType>>;
  totalPages: number;
};

function CartPagination({
  pagination,
  setPagination,
  totalPages,
}: CartPaginationProps) {
  const calculateTotal = () => Math.ceil(totalPages / pagination.limit);

  return (
    <Pagination
      total={calculateTotal()}
      value={pagination.current}
      onChange={(current: number) => setPagination({ ...pagination, current })}
      position="center"
      styles={(theme) => ({
        control: {
          '&[data-active]': {
            backgroundImage: theme.fn.gradient({
              from: 'orange',
              to: 'orange',
            }),
            border: 0,
          },
        },
      })}
    />
  );
}

export default CartPagination;
