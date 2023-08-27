import { Flex, Title } from '@mantine/core';
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
  return (
    <>
      <Title ta="center" mb={20} size={24}>
        Available pages
      </Title>
      <Flex rowGap={20} wrap="wrap" justify="space-evenly">
        {links.map((pageLink) => (
          <PageCard key={pageLink.to} {...pageLink} />
        ))}
      </Flex>
    </>
  );
}
