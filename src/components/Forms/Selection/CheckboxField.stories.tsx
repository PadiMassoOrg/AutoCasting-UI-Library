import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import CheckboxField from './CheckboxField';

const meta: Meta<typeof CheckboxField> = {
  title: 'Forms/Selection/CheckboxField',
  component: CheckboxField,
  tags: ['autodocs'],
  args: {
    id: 'terms',
    label: 'Accept terms and conditions',
    checked: false,
    onCheckedChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxField>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);
    return <CheckboxField {...args} checked={checked} onCheckedChange={setChecked} />;
  },
};

export const Required: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);
    return <CheckboxField {...args} checked={checked} onCheckedChange={setChecked} />;
  },
  args: {
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};
