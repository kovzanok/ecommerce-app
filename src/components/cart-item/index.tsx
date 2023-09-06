import React from 'react';
import { LineItem } from '@commercetools/platform-sdk';
import {
  Box, Flex, Grid, Paper,
} from '@mantine/core';
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
      <Grid>
        <Grid.Col span={6}>
          <Flex direction="row" align="flex-start" gap={10}>
            <Box
              style={{
                textAlign: 'center',
                width: '76px',
                height: 'auto',
              }}
            >
              {images && (
                <img
                  style={{
                    objectFit: 'contain',
                    width: 'auto',
                    height: '75px',
                  }}
                  src={images[0].url}
                  alt={name}
                />
              )}
            </Box>
            <Box>
              {name['en-US']}
              <PriceContent price={price} />
            </Box>
          </Flex>
        </Grid.Col>

        <Grid.Col span={4}>
          <Flex align="center">{`Quantity: ${quantity}`}</Flex>
        </Grid.Col>
        <Grid.Col span={2}>
          <Box ta="center">
            Total
            <TotalPriceBlock {...totalPrice} />
          </Box>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}

export default CartItem;
