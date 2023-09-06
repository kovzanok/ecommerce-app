import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Center, Flex, Loader, Paper, Text, Title,
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
        <Flex direction="column" align="center">
          <img src={emptyCart} alt="No items" style={{ height: '100%' }} />
          <Text size="2rem">Cart is empty</Text>
          <NavLink to="/catalog" style={{ textDecoration: 'underline' }}>
            Let&apos;s do some shopping ?
          </NavLink>
        </Flex>
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

      {cart && cart?.lineItems.length !== 0 && (
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
