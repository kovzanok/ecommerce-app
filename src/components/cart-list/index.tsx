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
import { useDisclosure } from '@mantine/hooks';
import { cartSelector } from '../../store/selectors';
import CartItem from '../cart-item';
import CartPagination from '../cart-pagination';
import emptyCart from '../../assets/empty-cart.jpg';
import { PaginationType } from '../../types';
import { calculatePagination, calculateTotal } from '../../utils';
import { updateCart } from '../../store/slices/cartSlice';
import { useAppDispatch } from '../../hooks';
import ConfirmationModal from '../confirmation-modal';
import { TotalPriceBlock } from '../price-content';

function CartList() {
  const { loading, cart } = useSelector(cartSelector);

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
          <Title>Cart</Title>
          {cart?.lineItems
            .slice(...calculatePagination(pagination))
            .map((cartItem) => <CartItem key={cartItem.id} item={cartItem} />)}
        </Flex>
      );
  }
  const dispatch = useAppDispatch();

  const [opened, { open, close }] = useDisclosure(false);

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

  const OldValueConverter = (
    <Text style={{ textDecoration: 'line-through' }}>
      {cart?.lineItems
        .reduce(
          (acc, curr) => acc
            + (curr.price.value.centAmount
              / 10 ** curr.price.value.fractionDigits)
              * curr.quantity,
          0,
        )
        .toFixed(2)}
      {' '}
      {cart?.totalPrice.currencyCode}
    </Text>
  );

  return (
    <>
      <ConfirmationModal
        opened={opened}
        close={close}
        removeAllFromCart={removeAllFromCart}
      />
      <Paper style={{ flex: '1 1 50%' }}>
        {content}

        {cart && cart?.lineItems.length !== 0 && (
          <Flex
            direction="row"
            align="flex-start"
            gap={10}
            justify="space-between"
            style={{ marginTop: '10px' }}
          >
            <Button
              color="red"
              leftIcon={<IconClearAll size="1rem" />}
              onClick={open}
            >
              Clear cart items
            </Button>

            <CartPagination
              pagination={pagination}
              setPagination={setPagination}
              totalPages={cart.lineItems.length}
            />

            <Flex direction="row" align="center" gap={10}>
              <Text>Total cart price: </Text>

              <Flex direction="column" align="flex-start">
                {cart.discountCodes.length !== 0 && OldValueConverter}
                <TotalPriceBlock {...cart.totalPrice} />
              </Flex>
            </Flex>
          </Flex>
        )}
      </Paper>
    </>
  );
}

export default CartList;
