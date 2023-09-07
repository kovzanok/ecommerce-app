import React, { useState } from 'react';
import {
  Button, Flex, Paper, TextInput, Title,
} from '@mantine/core';

function Promocode() {
  const [promocode, setPromocode] = useState<string>('');

  return (
    <Paper h="auto" style={{ flex: '1' }} mt="xs" shadow="xs" p="xs">
      <Flex direction="column" gap={20}>
        <Title>Promocode</Title>
        <TextInput
          placeholder="Write promocode here..."
          value={promocode}
          onChange={(e) => setPromocode(e.target.value)}
        />
        <Button color="orange">Apply</Button>
      </Flex>
    </Paper>
  );
}

export default Promocode;
