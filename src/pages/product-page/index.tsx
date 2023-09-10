import {
  Flex,
  Title,
  Text,
  Image,
  Loader,
  Center,
  Modal,
  MediaQuery,
  Button,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Price } from '@commercetools/platform-sdk';
import {
  IconArrowBigUp,
  IconArrowBigDown,
  IconArrowBigRight,
  IconArrowBigLeft,
} from '@tabler/icons-react';
import { EmblaCarouselType } from 'embla-carousel';
import { useMediaQuery } from '@mantine/hooks';
import { useAppDispatch, useAppSelector, useTitle } from '../../hooks';
import { cartSelector, productSelector } from '../../store/selectors';
import { clearError, fetchProductById } from '../../store/slices/productSlice';
import {
  AgeType,
  AuthorType,
  CoverType,
  PublishedType,
  PublisherType,
} from '../../types';
import PriceContent from '../../components/price-content';
import { getProductAttribute } from '../../utils';
import { updateCart } from '../../store/slices/cartSlice';

const TRANSIOTION_DURATION = 200;
export default function ProductPage() {
  const { cart, loading: cartLoading } = useAppSelector(cartSelector);
  const { id } = useParams();
  const matches = useMediaQuery('(max-width:770px)');
  const matchesMobile = useMediaQuery('(max-width:500px)');
  useTitle('Product');
  const dispatch = useAppDispatch();
  const { loading, product, error } = useAppSelector(productSelector);
  const [currentImg, setCurrentImg] = useState('');
  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
    return () => {
      dispatch(clearError());
    };
  }, [id, dispatch]);
  useEffect(() => {
    setTimeout(() => embla && embla.reInit(), TRANSIOTION_DURATION);
  }, [currentImg, embla]);
  if (error) return <Navigate replace to="/not-found" />;

  if (loading || !product) {
    return (
      <Center h="100vh">
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

  const lineItem = cart?.lineItems.find(({ productId }) => productId === id);

  const addToCart = (): void => {
    dispatch(updateCart([{ action: 'addLineItem', productId: id }]))
      .unwrap()
      .then(() => alert('Product was successfully added to cart!'))
      .catch(console.log);
  };

  const removeFromCart = (): void => {
    if (lineItem) {
      dispatch(
        updateCart([{ action: 'removeLineItem', lineItemId: lineItem.id }]),
      )
        .unwrap()
        .then(() => alert('Product was successfully removed from the cart!'))
        .catch(console.log);
    }
  };

  const handleClick = () => {
    if (lineItem) return removeFromCart();
    addToCart();
  };

  const buttonContent = () => {
    switch (true) {
      case cartLoading:
        return <Loader size="xs" color="orange" />;
      case !!lineItem:
        return 'Remove from cart';
      default:
        return 'Add to cart';
    }
  };

  return (
    <MediaQuery query="(max-width:950px)" styles={{ padding: 0 }}>
      <Flex p="20px" columnGap={50} direction={matches ? 'column' : 'row'}>
        <div>
          {' '}
          <Carousel
            maw={matchesMobile ? 300 : 400}
            withIndicators={isOnlyOneImage}
            withControls={isOnlyOneImage}
            styles={{
              viewport: {
                border: '1px solid black',

                display: 'flex',
                alignItems: 'center',
              },
              slide: {
                display: 'flex',
                alignItems: 'center',
              },
              indicator: {
                background: 'white',
                border: '1px solid black',
                '&[data-active]': {
                  background: 'black',
                },
              },
              indicators: {
                right: '5px',
              },
            }}
            nextControlIcon={
              matches ? (
                <IconArrowBigRight fill="black" size={16} />
              ) : (
                <IconArrowBigDown fill="black" size={16} />
              )
            }
            previousControlIcon={
              matches ? (
                <IconArrowBigLeft fill="black" size={16} />
              ) : (
                <IconArrowBigUp fill="black" size={16} />
              )
            }
            py={matches ? 0 : 50}
            px={matches ? 50 : 0}
            m="auto"
            height={matchesMobile ? 300 : 500}
            orientation={matches ? 'horizontal' : 'vertical'}
          >
            {images?.map(({ url, label }) => (
              <Carousel.Slide key={url}>
                <Image
                  onClick={() => setCurrentImg(url)}
                  width={matchesMobile ? 200 : 300}
                  alt={label}
                  src={url as string}
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>

        <Flex rowGap={10} direction="column">
          <div
            style={{
              textAlign: matches ? 'center' : 'start',
              marginTop: matches ? 30 : 0,
            }}
          >
            <Flex align="center" columnGap={20}>
              <Title order={1}>{name['en-US']}</Title>
              <Button
                disabled={cartLoading}
                onClick={handleClick}
                mt={10}
                size="md"
                color="orange"
              >
                {buttonContent()}
              </Button>
            </Flex>

            <Text color="gray">
              {author.value.label}
              ,
              {published.value}
            </Text>
          </div>
          <div style={{ height: '2px', background: 'gray' }} />
          <div style={{ width: matches ? '100%' : '300px', fontSize: '60px' }}>
            <PriceContent isProductPage price={price} />
          </div>
          <div style={{ height: '2px', background: 'gray' }} />
          <Text>{description?.['en-US']}</Text>
          <div style={{ height: '2px', background: 'gray' }} />
          <div style={{ textAlign: matches ? 'center' : 'start' }}>
            <Title mb={20} order={2}>
              Additional info
            </Title>
            <Flex justify="space-evenly" direction={matches ? 'row' : 'column'}>
              {' '}
              <div>
                <span
                  style={{
                    minWidth: matches ? '20px' : '100px',
                    display: matches ? 'block' : 'inline-block',
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
                    minWidth: matches ? '20px' : '100px',
                    display: matches ? 'block' : 'inline-block',
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
                    minWidth: matches ? '' : '100px',
                    display: matches ? 'block' : 'inline-block',
                    color: 'gray',
                  }}
                >
                  Publisher:
                </span>
                {' '}
                <span style={{ fontWeight: 600 }}>{publisher.value.label}</span>
              </div>
            </Flex>
          </div>
        </Flex>
        <Modal
          transitionProps={{ duration: TRANSIOTION_DURATION }}
          padding={10}
          onClose={() => setCurrentImg('')}
          opened={!!currentImg}
        >
          <Carousel
            getEmblaApi={setEmbla}
            maw={500}
            px={20}
            withIndicators={isOnlyOneImage}
            withControls={isOnlyOneImage}
            styles={{
              indicator: {
                background: 'white',
                border: '1px solid black',
                '&[data-active]': {
                  background: 'black',
                },
              },
            }}
            nextControlIcon={<IconArrowBigRight fill="black" size={16} />}
            previousControlIcon={<IconArrowBigLeft fill="black" size={16} />}
            initialSlide={images?.findIndex(({ url }) => url === currentImg)}
          >
            {images?.map(({ url, label }) => (
              <Carousel.Slide key={url}>
                <img alt={label} width="90%" src={url} />
              </Carousel.Slide>
            ))}
          </Carousel>
        </Modal>
      </Flex>
    </MediaQuery>
  );
}
