import {
  CentPrecisionMoney,
  DiscountedPrice,
  Price,
} from '@commercetools/platform-sdk';
import { Flex, Text, rem } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

type DiscountedPriceBlockProps = DiscountedPrice & { isProductPage?: boolean };
type PriceBlockProps = Price;
type TotalPriceBlockProps = CentPrecisionMoney;
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

export function TotalPriceBlock({
  centAmount,
  currencyCode,
}: TotalPriceBlockProps) {
  return (
    <Text size={rem(23)}>
      {(centAmount / 100).toFixed(2)}
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
      fz={discounted ? 18 : 20}
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
  const matches = useMediaQuery('(max-width:770px)');
  return (
    <Flex
      direction={isProductPage && matches ? 'column' : 'row'}
      mt={5}
      columnGap={10}
      justify="center"
      w="100%"
      align="center"
    >
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
