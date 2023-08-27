import { DiscountedPrice, Price } from '@commercetools/platform-sdk';
import { Flex, Text } from '@mantine/core';

type DiscountedPriceBlockProps = DiscountedPrice & { isProductPage?: boolean };
type PriceBlockProps = Price;
type PriceContentProps = { price: Price; isProductPage?: boolean };

function DiscountedPriceBlock({
  value: { centAmount, currencyCode },
  isProductPage = false,
}: DiscountedPriceBlockProps) {
  return (
    <Text fz={isProductPage ? 30 : 20} fw={700} color="orange">
      {(Number(centAmount) / 100).toFixed(2)}
      {' '}
      {currencyCode}
    </Text>
  );
}

function PriceBlock({
  discounted,
  value: { centAmount, currencyCode },
}: PriceBlockProps) {
  return (
    <Text
      color={discounted && 'gray'}
      fz={discounted ? 15 : 20}
      style={{
        textDecoration: discounted && 'line-through',
      }}
    >
      {(centAmount / 100).toFixed(2)}
      {' '}
      {currencyCode}
    </Text>
  );
}

export default function PriceContent({
  price,
  isProductPage = false,
}: PriceContentProps) {
  return (
    <Flex mt={5} justify="space-evenly" w="100%" align="center">
      {price?.discounted && (
        <DiscountedPriceBlock
          isProductPage={isProductPage}
          {...price.discounted}
        />
      )}
      <PriceBlock {...price} />
    </Flex>
  );
}
