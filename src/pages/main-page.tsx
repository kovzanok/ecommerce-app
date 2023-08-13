import { Flex, Title } from '@mantine/core';
import { PageLink } from '../types';
import PageCard from '../components/page-card';

export default function MainPage() {
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
      <Flex justify="space-evenly">
        {links.map((pageLink) => (
          <PageCard key={pageLink.to} {...pageLink} />
        ))}
      </Flex>
    </>
  );
}