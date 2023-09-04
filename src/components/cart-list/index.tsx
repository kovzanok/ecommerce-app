import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Center, Flex, Loader, Paper, Title,
} from '@mantine/core';
import { cartSelector } from '../../store/selectors';
import CartItem from '../cart-item';
import logo from '../../assets/logo.png';
import CartPagination from '../cart-pagination';
import { PaginationType } from '../../types';

function CartList() {
  const { loading, error } = useSelector(cartSelector);

  const mockCartItems = {
    id: '5678',
    version: 0,
    lineItems: [
      {
        id: '1',
        productId: 'f574d85a-0376-46fd-9e1c-40f134918955',
        productType: {
          id: '112334',
          typeId: 'product-type',
        },
        price: {
          id: '123456',
          value: {
            type: 'centPrecision',
            fractionDigits: 7,
            centAmount: 12.1,
            currencyCode: 'USD',
          },
        },
        quantity: 4,
        name: { 'en-US': 'WATEER' },
        variant: {
          id: 112233,
          images: [
            {
              url: logo,
              dimensions: {
                w: 100,
                h: 50,
              },
            },
          ],
        },
        totalPrice: {
          centAmount: 120,
          currencyCode: 'USD',
          type: 'centPrecision',
          fractionDigits: 3,
        },
        discountedPricePerQuantity: [
          {
            quantity: 2,
            discountedPrice: {
              value: {
                type: 'centPrecision',
                fractionDigits: 7,
                centAmount: 12.1,
                currencyCode: 'USD',
              },
              includedDiscounts: [
                {
                  discount: { id: '11', typeId: 'cart-discount' },
                  discountedAmount: {
                    type: 'centPrecision',
                    fractionDigits: 7,
                    centAmount: 12.1,
                    currencyCode: 'USD',
                  },
                },
              ],
            },
          },
        ],
      },
      {
        id: '2',
        productId: 'f574d85a-0376-46fd-9e1c-40f134918955',
        productType: {
          id: '112334',
          typeId: 'product-type',
        },
        price: {
          id: '123456',
          value: {
            type: 'centPrecision',
            fractionDigits: 7,
            centAmount: 12.1,
            currencyCode: 'USD',
          },
        },
        quantity: 4,
        name: { 'en-US': 'WATEER' },
        variant: {
          id: 112233,
          images: [
            {
              url: logo,
              dimensions: {
                w: 100,
                h: 50,
              },
            },
          ],
        },
        totalPrice: {
          centAmount: 120,
          currencyCode: 'USD',
          type: 'centPrecision',
          fractionDigits: 3,
        },
        discountedPricePerQuantity: [
          {
            quantity: 2,
            discountedPrice: {
              value: {
                type: 'centPrecision',
                fractionDigits: 7,
                centAmount: 12.1,
                currencyCode: 'USD',
              },
              includedDiscounts: [
                {
                  discount: { id: '11', typeId: 'cart-discount' },
                  discountedAmount: {
                    type: 'centPrecision',
                    fractionDigits: 7,
                    centAmount: 12.1,
                    currencyCode: 'USD',
                  },
                },
              ],
            },
          },
        ],
      },
      {
        id: '3',
        productId: 'f574d85a-0376-46fd-9e1c-40f134918955',
        productType: {
          id: '112334',
          typeId: 'product-type',
        },
        price: {
          id: '123456',
          value: {
            type: 'centPrecision',
            fractionDigits: 7,
            centAmount: 12.1,
            currencyCode: 'USD',
          },
        },
        quantity: 4,
        name: { 'en-US': 'WATEER' },
        variant: {
          id: 112233,
          images: [
            {
              url: logo,
              dimensions: {
                w: 100,
                h: 50,
              },
            },
          ],
        },
        totalPrice: {
          centAmount: 120,
          currencyCode: 'USD',
          type: 'centPrecision',
          fractionDigits: 3,
        },
        discountedPricePerQuantity: [
          {
            quantity: 2,
            discountedPrice: {
              value: {
                type: 'centPrecision',
                fractionDigits: 7,
                centAmount: 12.1,
                currencyCode: 'USD',
              },
              includedDiscounts: [
                {
                  discount: { id: '11', typeId: 'cart-discount' },
                  discountedAmount: {
                    type: 'centPrecision',
                    fractionDigits: 7,
                    centAmount: 12.1,
                    currencyCode: 'USD',
                  },
                },
              ],
            },
          },
        ],
      },
    ],
    customLineItems: [],
    totalPrice: {
      type: 'centPrecision',
      centAmount: 0,
      currencyCode: '',
      fractionDigits: 0,
    },
    taxMode: '',
    taxRoundingMode: '',
    taxCalculationMode: '',
    inventoryMode: '',
    cartState: '',
    shippingMode: '',
    shipping: [],
    itemShippingAddresses: [],
    discountCodes: [],
    directDiscounts: [],
    refusedGifts: [],
    origin: '',
    createdAt: '',
    lastModifiedAt: '',
  };

  const [pagination, setPagination] = useState<PaginationType>({
    limit: 5,
    total: Math.ceil(mockCartItems.lineItems.length / 5),
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
    default:
      content = (
        <Flex direction="column">
          {mockCartItems.lineItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))}
        </Flex>
      );
  }

  return (
    <Paper>
      {content}
      <Flex direction="row" justify="center">
        <CartPagination pagination={pagination} setPagination={setPagination} />
      </Flex>
    </Paper>
  );
}

export default CartList;
