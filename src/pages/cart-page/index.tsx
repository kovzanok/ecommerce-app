import { Box, Flex } from '@mantine/core';
import CartList from '../../components/cart-list';
import { useTitle } from '../../hooks';
import Promocode from '../../components/promocode';

function CartPage() {
  useTitle('Cart');

  return (
    <Box>
      <Flex direction="row" gap={20} align="flex-start">
        <CartList />
        <Promocode />
      </Flex>
    </Box>
  );
}

export default CartPage;
