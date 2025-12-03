import type { Meta, StoryObj } from '@storybook/react-vite';
import Select, { SelectOption } from './Select';

const OPTIONS: SelectOption[] = [
  { label: 'Argentina', value: 'AR' },
  { label: 'France', value: 'FR' },
  { label: 'Switzerland', value: 'CH' },
];

const meta: Meta<typeof Select> = {
  title: 'Form/Primitive/Select',
  component: Select,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    options: OPTIONS,
  },
};
