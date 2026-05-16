import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import BooleanRadioGroup from './BooleanRadioGroup';

const meta: Meta<typeof BooleanRadioGroup> = {
  title: 'Forms/Selection/BooleanRadioGroup',
  component: BooleanRadioGroup,
  tags: ['autodocs'],
  args: {
    label: 'Allow notifications?',
    value: undefined,
    onChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof BooleanRadioGroup>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<boolean | null | undefined>(args.value);
    return <BooleanRadioGroup {...args} value={value} onChange={setValue} />;
  },
};

export const WithAnyOption: Story = {
  render: (args) => {
    const [value, setValue] = useState<boolean | null | undefined>(args.value);
    return <BooleanRadioGroup {...args} value={value} onChange={setValue} />;
  },
  args: {
    includeAnyOption: true,
    anyOptionLabel: 'Any preference',
  },
};

export const Vertical: Story = {
  render: (args) => {
    const [value, setValue] = useState<boolean | null | undefined>(args.value);
    return <BooleanRadioGroup {...args} value={value} onChange={setValue} />;
  },
  args: {
    orientation: 'vertical',
  },
};
