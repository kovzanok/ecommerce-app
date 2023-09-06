import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box, Center, Flex, Loader, Paper, Text, Title,
} from '@mantine/core';
import { cartSelector } from '../../store/selectors';
import CartItem from '../cart-item';
import CartPagination from '../cart-pagination';
import emptyCart from '../../assets/empty-cart.jpg';
import { PaginationType } from '../../types';
import { calculatePagination } from '../../utils';

function CartList() {
  const { loading, error, cart } = useSelector(cartSelector);

  const [pagination, setPagination] = useState<PaginationType>({
    limit: 4,
    current: 1,
  });
  let content: JSX.Element;

  switch (true) {
    case loading:
      content = (
        <Center h="100%">
          <Loader mt={100} size={100} color="orange" />
        </Center>
      );
      break;
    case error.length !== 0:
      content = (
        <Center h="100%">
          <Title ta="center">{error}</Title>
        </Center>
      );
      break;
    case cart === null || cart?.lineItems.length === 0:
      content = (
        <Box>
          <img
            style={{
              minWidth: '300px',
            }}
            width="55%"
            height="100%"
            src={emptyCart}
            alt="No items"
          />

          <Text>Basket is empty</Text>
        </Box>
      );
      break;
    default:
      content = (
        <Flex direction="column">
          {cart?.lineItems
            .slice(...calculatePagination(pagination))
            .map((cartItem) => <CartItem key={cartItem.id} item={cartItem} />)}
        </Flex>
      );
  }

  return (
    <Paper style={{ flex: '1' }}>
      {content}

      {cart?.lineItems.length && (
        <Flex direction="row" justify="center" style={{ marginTop: '10px' }}>
          <CartPagination
            pagination={pagination}
            setPagination={setPagination}
            totalPages={cart.lineItems.length}
          />
        </Flex>
      )}
    </Paper>
  );
}

export default CartList;
