import { ActionIcon } from '@mantine/core';
import { SetFieldValue } from '@mantine/form/lib/types';
import { IconArrowBack } from '@tabler/icons-react';
import { AddressesInfoFormValues, PersonalInfoFormValues } from '../../types';
import { areNotValuesEquals, isInstanceOfDate } from '../../utils';

type RightSectionProps = {
  typeOfValue: string;
  customerValue: string | undefined;
  formValue: string | Date | undefined;
  setFieldValue: SetFieldValue<
  PersonalInfoFormValues | AddressesInfoFormValues
  >;
};

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
