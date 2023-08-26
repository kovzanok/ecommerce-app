import {
  Flex, Title, Text, Image, Loader, Center,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Price } from '@commercetools/platform-sdk';
import { IconArrowBigUp, IconArrowBigDown } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { productSelector } from '../../store/selectors';
import { fetchProductById } from '../../store/slices/productSlice';
import { AuthorType, PublishedType } from '../../types';
import PriceContent from '../../components/price-content';
import { getProductAttribute } from '../../utils';

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { loading, product } = useAppSelector(productSelector);
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id]);
  if (!product || loading) {
    return (
      <Center h="100%">
        <Loader color="orange" />
      </Center>
    );
  }

  const {
    name,
    description,
    masterVariant: { attributes, prices, images },
  } = product;
  const author = getProductAttribute<AuthorType>(attributes, 'Author');
  const published = getProductAttribute<PublishedType>(attributes, 'Published');
  const price = prices?.[0] as Price;
  const isOnlyOneImage = images?.length !== 1;
  return (
    <Flex p="20px" columnGap={50}>
      <Carousel
        withIndicators={isOnlyOneImage}
        withControls={isOnlyOneImage}
        styles={{
          viewport: {
            border: '1px solid black',
          },
          indicator: {
            background: 'white',
            border: '1px solid black',
            '&[data-active]': {
              background: 'black',
            },
          },
        }}
        nextControlIcon={<IconArrowBigDown fill="black" size={16} />}
        previousControlIcon={<IconArrowBigUp fill="black" size={16} />}
        py={50}
        height={500}
        orientation="vertical"
      >
        {images?.map(({ url, label }) => (
          <Carousel.Slide key={url}>
            <Image width={300} alt={label} src={url as string} />
          </Carousel.Slide>
        ))}
      </Carousel>
      <Flex rowGap={10} direction="column">
        <div>
          <Title order={1}>{name['en-US']}</Title>
          <Text color="gray">
            {author.value.label}
            ,
            {published.value}
          </Text>
        </div>
        <div style={{ height: '2px', background: 'gray' }} />
        <div style={{ width: '300px', fontSize: '60px' }}>
          <PriceContent isProductPage price={price} />
        </div>
        <div style={{ height: '2px', background: 'gray' }} />
        <Text>{description?.['en-US']}</Text>
      </Flex>
    </Flex>
  );
}
