import type { Meta, StoryObj } from '@storybook/react';
import FormInputField from './FormInputField';

const meta: Meta<typeof FormInputField> = {
  title: 'Form/FormInputField',
  component: FormInputField,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormInputField>;

export const Default: Story = {
  args: {
    id: 'name',
    label: 'Name',
    placeholder: 'Enter your name',
  },
};

export const Editable: Story = {
  args: {
    id: 'email',
    label: 'Email',
    editable: true,
    placeholder: 'Enter your email',
  },
};

export const WithError: Story = {
  args: {
    id: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    error: 'This field is required',
  },
};

export const NoLabel: Story = {
  args: {
    id: 'password',
    type: 'password',
    placeholder: 'Enter your password',
  },
};
