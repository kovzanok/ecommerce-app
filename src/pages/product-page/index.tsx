import {
  Flex, Title, Text, Image, Loader, Center,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { Navigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Price } from '@commercetools/platform-sdk';
import { IconArrowBigUp, IconArrowBigDown } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { productSelector } from '../../store/selectors';
import { fetchProductById } from '../../store/slices/productSlice';
import {
  AgeType,
  AuthorType,
  CoverType,
  PublishedType,
  PublisherType,
} from '../../types';
import PriceContent from '../../components/price-content';
import { getProductAttribute } from '../../utils';

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { loading, product, error } = useAppSelector(productSelector);
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
    return () => {
      dispatch(clearError());
    };
  }, [id]);

  if (error) return <Navigate replace to="/not-found" />;

  if (loading || !product) {
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
  const cover = getProductAttribute<CoverType>(attributes, 'Cover');
  const age = getProductAttribute<AgeType>(attributes, 'Age_restrictions');
  const publisher = getProductAttribute<PublisherType>(attributes, 'publisher');
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
        <div style={{ height: '2px', background: 'gray' }} />
        <div>
          <Title order={2}>Additional info</Title>
          <div>
            <span
              style={{
                minWidth: '100px',
                display: 'inline-block',
                color: 'gray',
              }}
            >
              Cover:
            </span>
            {' '}
            <span style={{ fontWeight: 600 }}>{cover.value.label}</span>
          </div>
          <div>
            <span
              style={{
                minWidth: '100px',
                display: 'inline-block',
                color: 'gray',
              }}
            >
              Age:
            </span>
            {' '}
            <span style={{ fontWeight: 600 }}>{age.value.label}</span>
          </div>
          <div>
            <span
              style={{
                minWidth: '100px',
                display: 'inline-block',
                color: 'gray',
              }}
            >
              Publisher:
            </span>
            {' '}
            <span style={{ fontWeight: 600 }}>{publisher.value.label}</span>
          </div>
        </div>
      </Flex>
    </Flex>
  );
}
