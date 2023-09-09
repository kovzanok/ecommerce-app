import { Pagination } from '@mantine/core';
import React from 'react';
import { PaginationType } from '../../types';
import { calculateTotal } from '../../utils';

export type CartPaginationProps = {
  pagination: PaginationType;
  setPagination: React.Dispatch<React.SetStateAction<PaginationType>>;
  totalPages: number;
};

function CartPagination({
  pagination,
  setPagination,
  totalPages,
}: CartPaginationProps) {
  return (
    <Pagination
      title="paginate"
      siblings={1}
      total={calculateTotal(totalPages, pagination.limit)}
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
