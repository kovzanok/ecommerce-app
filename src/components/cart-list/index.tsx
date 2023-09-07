import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Button,
  Center,
  Flex,
  Loader,
  Paper,
  Text,
  Title,
} from '@mantine/core';
import { IconClearAll } from '@tabler/icons-react';
import { cartSelector } from '../../store/selectors';
import CartItem from '../cart-item';
import CartPagination from '../cart-pagination';
import emptyCart from '../../assets/empty-cart.jpg';
import { PaginationType } from '../../types';
import { calculatePagination, calculateTotal } from '../../utils';
import { updateCart } from '../../store/slices/cartSlice';
import { useAppDispatch } from '../../hooks';

function CartList() {
  const { loading, error, cart } = useSelector(cartSelector);

  const [pagination, setPagination] = useState<PaginationType>({
    limit: 4,
    current: 1,
  });

  useEffect(() => {
    if (cart && cart.lineItems.length % pagination.limit === 0) {
      setPagination({
        ...pagination,
        current: calculateTotal(cart.lineItems.length, pagination.limit),
      });
    }
  }, [cart]);

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
  const dispatch = useAppDispatch();

  const removeAllFromCart = () => {
    if (cart) {
      dispatch(
        updateCart(
          cart.lineItems.map((item) => ({
            action: 'removeLineItem',
            lineItemId: item.id,
          })),
        ),
      );
    }
  };

  return (
    <Paper style={{ flex: '1' }}>
      {content}

      {cart && cart?.lineItems.length !== 0 && (
        <Flex direction="row" justify="center" style={{ marginTop: '10px' }}>
          <Button
            color="red"
            leftIcon={<IconClearAll size="1rem" />}
            onClick={removeAllFromCart}
          >
            Clear cart items
          </Button>
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
