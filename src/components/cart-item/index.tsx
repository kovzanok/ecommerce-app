import React from 'react';
import { LineItem } from '@commercetools/platform-sdk';
import { Box, Flex, Paper } from '@mantine/core';
import PriceContent, { TotalPriceBlock } from '../price-content';

type CartItemProps = {
  item: LineItem;
};

function CartItem({ item }: CartItemProps) {
  const {
    name,
    price,
    quantity,
    totalPrice,
    variant: { images },
  } = item;

  return (
    <Paper
      mt="xs"
      shadow="xs"
      style={{ border: '1px solid orange', zIndex: 0 }}
      p="xs"
    >
      <Flex direction="row" gap={20}>
        <div style={{ width: '100px', height: 'auto' }}>
          {images && (
            <img
              style={{ objectFit: 'contain', width: '100%' }}
              src={`${images[0].url}`}
              alt={name}
            />
          )}
        </div>
        <Box>
          {name['en-US']}
          <PriceContent price={price} />
        </Box>
        <Box>{`Quantity: ${quantity}`}</Box>

        <Box>
          Total
          <TotalPriceBlock {...totalPrice} />
        </Box>
      </Flex>
    </Paper>
  );
}

export default CartItem;
