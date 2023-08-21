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
