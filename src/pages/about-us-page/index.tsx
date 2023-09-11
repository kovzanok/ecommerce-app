import { Flex, Text, Title } from '@mantine/core';
import PersonCard from '../../components/person-card';
import { PersonData } from '../../types';

export default function AboutUsPage() {
  const descrNikolai = `I am 32 years old.
  In 2013, I graduated from the Belarusian State Pedagogical University
  with a degree in Mathematics, Informatics. I worked as a teacher at the Pinsk College
  of Engineering and Technology, and have also been deputy director since 2020.
  Now I work in the trade sector. The basis of my motivation to engage in programming is
  the desire to connect my professional activities with this area.`;

  const persons: PersonData[] = [
    {
      name: 'Alexander',
      role: 'Team Lead',
      photoLink: 'https://avatars.githubusercontent.com/u/119339747?v=4',
      description: '...',
      gitLink: 'https://github.com/kovzanok',
    },
    {
      name: 'Alexei',
      role: 'Programmer',
      photoLink: '...',
      description: '...',
      gitLink: 'https://github.com/alexeiisprogrammer',
    },
    {
      name: 'Nikolai',
      role: 'Programmer',
      photoLink: 'http://surl.li/kzokt',
      description: descrNikolai,
      gitLink: 'https://github.com/theNickola',
    },
  ];
  return (
    <Flex direction="column">
      <Title ta="center" mb={20} size={24}>
        About us
      </Title>
      <Text size={16}>
        Each members significant contributions to the project are highlighted in
        the introduction. The description demonstrates how the teams effective
        collaboration led to the projects successful completion.
      </Text>
      {persons.map((person) => (
        <PersonCard {...person} />
      ))}
    </Flex>
  );
}
