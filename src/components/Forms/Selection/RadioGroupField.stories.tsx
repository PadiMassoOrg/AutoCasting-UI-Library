import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import RadioGroupField from './RadioGroupField';

const OPTIONS = [
  { value: 'basic', label: 'Basic Plan' },
  { value: 'pro', label: 'Pro Plan' },
  { value: 'enterprise', label: 'Enterprise Plan' },
];

const meta: Meta<typeof RadioGroupField> = {
  title: 'Forms/Selection/RadioGroupField',
  component: RadioGroupField,
  tags: ['autodocs'],
  args: {
    label: 'Plan',
    value: 'basic',
    options: OPTIONS,
    onValueChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroupField>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <RadioGroupField {...args} value={value} onValueChange={setValue} />;
  },
};

export const DisabledOption: Story = {
  args: {
    options: [
      { value: 'basic', label: 'Basic Plan' },
      { value: 'pro', label: 'Pro Plan', disabled: true },
      { value: 'enterprise', label: 'Enterprise Plan' },
    ],
  },
};
