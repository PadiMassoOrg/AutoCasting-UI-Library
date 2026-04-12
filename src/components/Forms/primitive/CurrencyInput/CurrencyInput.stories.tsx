import type { Meta, StoryObj } from '@storybook/react-vite';
import CurrencyInput from './CurrencyInput';

const meta: Meta<typeof CurrencyInput> = {
  title: 'Forms/Primitive/CurrencyInput',
  component: CurrencyInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CurrencyInput>;

export const Default: Story = {
  args: {
    placeholder: 'Write amount',
  },
};

export const WithInitialValue: Story = {
  args: {
    defaultValue: '200000',
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: '200000',
    disabled: true,
  },
};
