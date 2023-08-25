import {
  Flex,
  Title,
  Text,
  Image,
  Modal,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useDisclosure } from '@mantine/hooks';

export default function ProductPage() {
  const images = [
    'https://klike.net/uploads/posts/2019-07/1564314059_1.jpg',
    'https://klike.net/uploads/posts/2019-07/1564314090_3.jpg',
    'https://klike.net/uploads/posts/2019-07/1564314134_11.jpg',
  ];
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Flex p="20px" gap="lg">
      <Carousel withIndicators>
        <Carousel.Slide>
          <Modal opened={opened} onClose={close} title="Title">
            <Image radius="md" src={images[0]} />
          </Modal>
          <Image onClick={open} maw={240} mx="auto" radius="md" src={images[0]} />
        </Carousel.Slide>
        <Carousel.Slide>
          <Image maw={240} mx="auto" radius="md" src={images[1]} />
        </Carousel.Slide>
        <Carousel.Slide>
          <Image maw={240} mx="auto" radius="md" src={images[2]} />
        </Carousel.Slide>
      </Carousel>
      <div>
        <Title>Product name</Title>
        <Text>Product categories</Text>
        <Text>Author, published</Text>
        <Text>Price</Text>
        <Text>Product description</Text>
      </div>
    </Flex>
  );
}
