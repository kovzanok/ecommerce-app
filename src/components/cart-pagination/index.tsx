import { Pagination } from '@mantine/core';
import React from 'react';
import { PaginationType } from '../../types';

type CartPaginationProps = {
  pagination: PaginationType;
  setPagination: React.Dispatch<React.SetStateAction<PaginationType>>;
};

function CartPagination({ pagination, setPagination }: CartPaginationProps) {
  console.log(pagination.total);

  return (
    <Pagination
      total={pagination.total}
      value={pagination.current}
      onChange={(current: number) => setPagination({ ...pagination, current })}
      position="center"
      styles={(theme) => ({
        control: {
          '&[data-active]': {
            backgroundImage: theme.fn.gradient({ from: 'red', to: 'yellow' }),
            border: 0,
          },
        },
      })}
    />
  );
}

export default CartPagination;
