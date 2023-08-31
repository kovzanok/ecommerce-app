import {
  Flex, Title, Text, Badge,
} from '@mantine/core';
import { PageLink } from '../types';
import PageCard from '../components/page-card';
import { useTitle } from '../hooks';

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
    </Flex>
  );
}
