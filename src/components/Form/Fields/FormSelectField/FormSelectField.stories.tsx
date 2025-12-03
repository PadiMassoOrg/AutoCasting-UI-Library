// FormSelectField.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import FormSelectField from './FormSelectField';
import type { SelectOption } from '../../primitive/Select/Select';

const OPTIONS: SelectOption[] = [
  { label: 'Argentina', value: 'AR' },
  { label: 'France', value: 'FR' },
  { label: 'Switzerland', value: 'CH' },
];

const meta: Meta<typeof FormSelectField> = {
  title: 'Form/FormSelectField',
  component: FormSelectField,
  tags: ['autodocs'],
  args: {
    options: OPTIONS,
  },
};

export default meta;
type Story = StoryObj<typeof FormSelectField>;

export const Default: Story = {
  args: {
    id: 'country',
    label: 'Country',
    placeholder: 'Select a country',
  },
};

export const WithError: Story = {
  args: {
    id: 'email-provider',
    label: 'Email provider',
    placeholder: 'Select an option',
    error: 'This field is required',
  },
};

export const NoLabel: Story = {
  args: {
    id: 'plan',
    placeholder: 'Choose a plan',
  },
};
