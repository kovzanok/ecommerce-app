import {
  DiscountedPrice,
  Price,
  ProductProjection,
} from '@commercetools/platform-sdk';
import {
  Flex, Text, Card, Title,
} from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { AuthorType, PublishedType } from '../../types';
import { getProductAttribute } from '../../utils';

type ProductCardProps = ProductProjection;
type DiscountedPriceBlockProps = DiscountedPrice;
type PriceBlockProps = Price;

function DiscountedPriceBlock({
  value: { centAmount, currencyCode },
}: DiscountedPriceBlockProps) {
  return (
    <Text fz={15} fw={700} color="orange">
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
      fz={15}
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

export default function ProductCard({
  id,
  name,
  description,
  masterVariant: { prices, images, attributes },
}: ProductCardProps) {
  const price = prices && prices[0];
  const mainImage = images && images[0].url;
  const author = getProductAttribute<AuthorType>(attributes, 'Author');
  const published = getProductAttribute<PublishedType>(attributes, 'Published');
  const engDescription = description && description['en-US'];

  const priceContent = price ? (
    <Flex mt={5} justify="space-evenly" w="100%">
      {price?.discounted && <DiscountedPriceBlock {...price.discounted} />}
      <PriceBlock {...price} />
    </Flex>
  ) : null;

  return (
    <NavLink style={{ textDecoration: 'none' }} to={`/product/${id}`}>
      <Card ta="center" withBorder w={200}>
        <Flex
          align="center"
          h="100%"
          direction="column"
          justify="space-between"
        >
          <img width="80%" height="200px" alt={name['en-US']} src={mainImage} />
          {priceContent}
          <Flex mt={5} ta="center" direction="column">
            <Title h={50} order={5}>
              {name['en-US'].length >= 34
                ? `${name['en-US'].slice(0, 34)}...`
                : name['en-US']}
            </Title>
            <Text fz={12} color="gray">
              {author.value.label}
              ,
              {published.value}
            </Text>
            <Text fz={14}>
              {engDescription?.slice(0, engDescription.indexOf(' ', 55))}
              ...
            </Text>
          </Flex>
        </Flex>
      </Card>
    </NavLink>
  );
}
