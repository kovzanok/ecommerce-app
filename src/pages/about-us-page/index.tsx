import {
  Flex, Image, Text, Title,
} from '@mantine/core';
import { NavLink } from 'react-router-dom';
import PersonCard from '../../components/person-card';
import { PersonData } from '../../types';

export default function AboutUsPage() {
  const TEXT_INTRO_TEAM = `Despite the lack of time and personal issues each member of our team has 
  made tremendous contribution in our project. All the tasks which were spitted between team members 
  always were made on time. Of course, we’ve faced many bugs during team project, but with the help 
  of careful code review most of them were caught and fixed before deadline. All of us shared 
  knowledge to each other and this made our team solid. First team development experience also 
  highlighted our strengths and weaknesses, so we could overcome them together.`;

  const persons: PersonData[] = [
    {
      name: 'Alexander',
      role: 'Team Lead, Developer',
      photoLink: 'https://avatars.githubusercontent.com/u/119339747?v=4',
      description: `Hello, my name is Alex. I am 23 years old.
      I am from Belarus. In august 2022 I graduated from Belarusian National Technical University.
      I am power engineer by education. After graduation I’ve decided to learn something new due to
      my excess time. So, I started studying JavaScript by my own and when RSS Stage #0 course became
      available, I’ve registered on it. Today I can say that I have no regrets about choosing this course.
      My current goal is to successfully graduate from Stage #2 and Stage #3 and find a new job as a Front-End Developer.`,
      gitLink: 'https://github.com/kovzanok',
      contributions: `training team members, monitoring project development through code reviews, 
      distributing tickets, developing complex technological tasks (setting up React, 
      application routing, shopping cart, etc.).`,
    },
    {
      name: 'Alexei',
      role: 'Developer',
      photoLink: 'https://i.ibb.co/bNsVG67/photo-2023-09-12-23-22-47.jpg',
      description: `I'm 20. Live in Minsk. In 2023 was graduated from 
      the Minsk College of Business with a degree in Information Technology Software.
      I have never worked by specialty and this course will give me knowledge and 
      motivation to become basic engineer`,
      gitLink: 'https://github.com/alexeiisprogrammer',
      contributions: `control of project development through code review, 
      testing of software components, project development (setting up some project configurations, 
      registering users, etc.).`,
    },
    {
      name: 'Nikolai',
      role: 'Developer',
      photoLink: 'http://surl.li/kzokt',
      description: `I am 32 years old.
      In 2013, I graduated from the Belarusian State Pedagogical University
      with a degree in Mathematics, Informatics. I worked as a teacher at the Pinsk College
      of Engineering and Technology, and have also been deputy director since 2020.
      Now I work in the trade sector. The basis of my motivation to engage in programming is
      the desire to connect my professional activities with this area.`,
      gitLink: 'https://github.com/theNickola',
      contributions:
        'project development (project description, user login, etc.).',
    },
  ];
  return (
    <div>
      <NavLink target="_blank" to="https://rs.school/">
        <Image
          src="https://rs.school/images/rs_school_js.svg"
          alt="RSSchol"
          style={{
            maxWidth: '100px',
            minWidth: '100px',
          }}
        />
      </NavLink>
      <Flex direction="column">
        <Title ta="center" mb={20} size={28}>
          About us
        </Title>
        <Text size={16} align="justify">
          {TEXT_INTRO_TEAM}
        </Text>
        <Title mt={20} size={20}>
          Our team:
        </Title>
        {persons.map((person) => (
          <PersonCard {...person} />
        ))}
      </Flex>
    </div>
  );
}
