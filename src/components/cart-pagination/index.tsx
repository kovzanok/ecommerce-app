import { Pagination } from '@mantine/core';
import React from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { PaginationType } from '../../types';
import { calculateTotal } from '../../utils';

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
  const matches = useMediaQuery('(max-width: 62em)');

  return (
    <Pagination
      siblings={1}
      total={calculateTotal(totalPages, pagination.limit)}
      value={pagination.current}
      onChange={(current: number) => setPagination({ ...pagination, current })}
      position="center"
      style={{ width: matches ? '100%' : 'auto', order: matches ? '1' : '0' }}
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
