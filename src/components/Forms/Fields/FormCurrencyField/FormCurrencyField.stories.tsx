import type { Meta, StoryObj } from '@storybook/react-vite';
import FormCurrencyField from './FormCurrencyField';

const meta: Meta<typeof FormCurrencyField> = {
  title: 'Forms/Fields/Currency Field',
  component: FormCurrencyField,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormCurrencyField>;

export const Default: Story = {
  args: {
    id: 'fee',
    label: 'Fee',
    placeholder: 'Write amount',
  },
};

export const Prefilled: Story = {
  args: {
    id: 'budget',
    label: 'Budget',
    defaultValue: '200000',
  },
};

export const WithError: Story = {
  args: {
    id: 'budget-error',
    label: 'Budget',
    error: 'Invalid amount',
    defaultValue: '200000',
  },
};
