import { Box, Flex } from '@mantine/core';
import CartList from '../../components/cart-list';
import { useTitle } from '../../hooks';

function CartPage() {
  useTitle('Cart');

  return (
    <Box>
      <Flex direction="row">
        <CartList />
      </Flex>
    </Box>
  );
}

export default CartPage;
