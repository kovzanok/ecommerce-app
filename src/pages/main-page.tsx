import {
  Flex, Title, Text, Badge,
} from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { PageLink } from '../types';
import PageCard from '../components/page-card';
import { useTitle } from '../hooks';

type Link = { to: string; name: string };

export default function MainPage() {
  useTitle('Main');
  const links: PageLink[] = [
    {
      to: '/login',
      name: 'Login Page',
      description:
        "Login page provides user ability to sign in account to get access to user's cart and wishlist.",
    },
    {
      to: '/register',
      name: 'Register Page',
      description:
        'Register page provides user ability to create account in this e-commerce app.',
    },
    {
      to: '/catalog',
      name: 'Catalog Page',
      description:
        'Catalog page shows all available products and provide robust filtering, sorting and searching for better user experience.',
    },
    {
      to: '/product/b7feab93-bd95-415b-9d9f-fdafdfa44fdd',
      name: 'Product Page',
      description:
        'Product page contains all the detailed product information.',
    },
    {
      to: '/user/personal-info',
      name: 'User Profile Page',
      description:
        'User Profile page is available only for authorized users and contains all ther user information, which can be modified and saved.',
    },
    {
      to: '/cart',
      name: 'Cart Page',
      description:
        'Cart page contains all the goods added to user personal cart.',
    },
  ];

  const sortingOptions: string[] = [
    'by name in alphabetical order',
    'by name in reverse alphabetical order',
    'by price in ascending order',
    'by price in descending order',
  ];

  const filters: string[] = [
    'by author',
    'by cover type',
    'by age',
    'by publisher',
    'by price',
  ];

  const discountedProducts: Link[] = [
    { to: 'b7feab93-bd95-415b-9d9f-fdafdfa44fdd', name: 'Witcher' },
    { to: 'a8436c59-b2dc-4c64-be81-772f299f68e5', name: ' Berserk. Volume 1' },
    { to: '88af4c34-ec22-4c8b-9705-aecbd3b81d60', name: 'Berserk. Volume 2' },
    { to: '62e02832-fbe8-4ac7-a021-98bdb2714456', name: 'Berserk. Volume 3' },
    { to: '5babb5b6-46c9-440c-86c0-3275f60578a0', name: 'Berserk. Volume 4' },
    { to: '8cd3fe39-b5fa-45e5-89e3-ac220b9ad8d0', name: 'Berserk. Volume 5' },
  ];

  const oneImageProducts: Link[] = [
    {
      to: '5c5ceda2-639d-4149-9280-908d5959142e',
      name: 'A little prince. Planet of people',
    },
    {
      to: 'eec57bd8-7307-4db1-9b34-f569a9b65cc6',
      name: 'Write, shorten. How to create strong text',
    },
  ];

  const cartPromocodes: string[] = [
    'GIGACHAD1',
    'azino777',
    'BIG_SALE_90',
    'qwerty',
    'BLACKFRIDAY',
  ];

  return (
    <Flex direction="column" rowGap={20}>
      <div>
        {' '}
        <Title ta="center" mb={20} size={24}>
          Available pages
        </Title>
        <Flex rowGap={20} wrap="wrap" justify="space-evenly">
          {links.map((pageLink) => (
            <PageCard key={pageLink.to} {...pageLink} />
          ))}
        </Flex>
      </div>
      <Flex justify="space-evenly" wrap="wrap" rowGap={30}>
        <div>
          <Title ta="center" mb={5} size={24}>
            Available filters
          </Title>
          <Text ta="center">
            User can filter products on catalog page with provided filters:
            <Flex
              justify="space-evenly"
              rowGap={10}
              mt={10}
              wrap="wrap"
              columnGap={20}
            >
              {filters.map((option) => (
                <Badge color="orange">{option}</Badge>
              ))}
            </Flex>
          </Text>
        </div>
        <div>
          <Title ta="center" mb={5} size={24}>
            Available sorting options
          </Title>
          <Text ta="center">
            User can sort products on catalog page with provided sorting
            options:
            <Flex
              justify="space-evenly"
              rowGap={10}
              mt={10}
              wrap="wrap"
              columnGap={20}
            >
              {sortingOptions.map((option) => (
                <Badge color="orange">{option}</Badge>
              ))}
            </Flex>
          </Text>
        </div>
      </Flex>
      <div>
        <Title mb={20} ta="center" size={24}>
          Products on discount
        </Title>
        <Flex rowGap={10} wrap="wrap" columnGap={10} justify="center">
          {discountedProducts.map(({ name, to }) => (
            <Badge color="orange">
              <NavLink to={`/product/${to}`}>{name}</NavLink>
            </Badge>
          ))}
        </Flex>
      </div>
      <div>
        <Title mb={20} ta="center" size={24}>
          Products with one image
        </Title>

        <Flex rowGap={10} wrap="wrap" columnGap={10} justify="center">
          {oneImageProducts.map(({ name, to }) => (
            <Badge color="orange">
              <NavLink to={`/product/${to}`}>{name}</NavLink>
            </Badge>
          ))}
        </Flex>
      </div>
      <div>
        <Title mb={20} ta="center" size={24}>
          Cart promocodes
        </Title>

        <Flex rowGap={10} wrap="wrap" columnGap={10} justify="center">
          {cartPromocodes.map((promocode) => (
            <Badge color="orange">{promocode}</Badge>
          ))}
        </Flex>
      </div>
    </Flex>
  );
}
