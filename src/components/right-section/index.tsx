import { ActionIcon } from '@mantine/core';
import { SetFieldValue } from '@mantine/form/lib/types';
import { IconArrowBack } from '@tabler/icons-react';
import { PersonalInfoFormValues } from '../../types';
import { dateConverter } from '../../utils';

type RightSectionProps = {
  typeOfValue: string;
  customerValue: string | undefined;
  formValue: string | Date | undefined;
  setFieldValue: SetFieldValue<PersonalInfoFormValues>;
};

export default function RightSection({
  typeOfValue,
  customerValue,
  formValue,
  setFieldValue,
}: RightSectionProps) {
  const isInstanceOfDate = formValue instanceof Date;

  return (
    <div>
      {(isInstanceOfDate
        ? dateConverter(new Date(customerValue || ''))
          !== dateConverter(new Date(formValue))
        : customerValue !== formValue) && (
        <ActionIcon
          variant="outline"
          onClick={() => {
            setFieldValue(
              typeOfValue,
              isInstanceOfDate ? new Date(customerValue || '') : customerValue,
            );
          }}
        >
          <IconArrowBack size="1rem" />
        </ActionIcon>
      )}
    </div>
  );
}
