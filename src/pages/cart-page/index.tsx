import { Box, Flex } from '@mantine/core';
import { useSelector } from 'react-redux';
import CartList from '../../components/cart-list';
import { useTitle } from '../../hooks';
import Promocode from '../../components/promocode';
import { cartSelector } from '../../store/selectors';

function CartPage() {
  useTitle('Cart');

  const { cart } = useSelector(cartSelector);

  return (
    <Box>
      <Flex direction="row" gap={20} align="flex-start">
        <CartList />

        {cart && cart.lineItems.length !== 0 && <Promocode />}
      </Flex>
    </Box>
  );
}

export default CartPage;
