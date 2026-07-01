import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import TextareaField from './TextareaField';

const meta: Meta<typeof TextareaField> = {
  title: 'Forms/Fields/TextareaField',
  component: TextareaField,
  tags: ['autodocs'],
  args: {
    id: 'notes',
    label: 'Notes',
    placeholder: 'Add a description...',
    value: '',
    onChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof TextareaField>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <TextareaField
        {...args}
        value={value}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setValue(event.target.value)}
      />
    );
  },
};

export const WithError: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <TextareaField
        {...args}
        value={value}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setValue(event.target.value)}
      />
    );
  },
  args: {
    error: 'Please add at least 20 characters.',
  },
};
