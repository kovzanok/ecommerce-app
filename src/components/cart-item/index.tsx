import { LineItem } from '@commercetools/platform-sdk';
import {
  ActionIcon, Box, Flex, Grid, Paper,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import PriceContent, { TotalPriceBlock } from '../price-content';
import { updateCart } from '../../store/slices/cartSlice';
import { useAppDispatch } from '../../hooks';

type CartItemProps = {
  item: LineItem;
};

function CartItem({ item }: CartItemProps) {
  const {
    id,
    name,
    price,
    quantity,
    totalPrice,
    variant: { images },
  } = item;

  const dispatch = useAppDispatch();

  return (
    <Paper
      mt="xs"
      shadow="xs"
      style={{ border: '1px solid orange', zIndex: 0 }}
      p="xs"
    >
      <Grid>
        <Grid.Col span={1}>
          <ActionIcon
            variant="filled"
            color="red"
            onClick={() => dispatch(
              updateCart([{ action: 'removeLineItem', lineItemId: id }]),
            )}
          >
            <IconTrash size="1rem" />
          </ActionIcon>
        </Grid.Col>
        <Grid.Col span={5}>
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
                  alt={name['en-US']}
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
