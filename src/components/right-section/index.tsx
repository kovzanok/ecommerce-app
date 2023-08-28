import { ActionIcon } from '@mantine/core';
import { IconArrowBack } from '@tabler/icons-react';
import { areNotValuesEquals, isInstanceOfDate } from '../../utils';

interface RightSectionProps {
  typeOfValue: string;
  customerValue: string | undefined;
  formValue: string | Date | undefined;
  setFieldValue: (path: string, value: unknown) => void;
}

export default function RightSection({
  typeOfValue,
  customerValue,
  formValue,
  setFieldValue,
}: RightSectionProps) {
  return (
    <div>
      {areNotValuesEquals(formValue, customerValue) && (
        <ActionIcon
          variant="outline"
          onClick={() => {
            setFieldValue(
              typeOfValue,
              isInstanceOfDate(formValue)
                ? new Date(customerValue || '')
                : customerValue || '',
            );
          }}
        >
          <IconArrowBack size="1rem" />
        </ActionIcon>
      )}
    </div>
  );
}
