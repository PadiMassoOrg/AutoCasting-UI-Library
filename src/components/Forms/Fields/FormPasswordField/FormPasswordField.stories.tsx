import type { Meta, StoryObj } from '@storybook/react-vite';
import FormPasswordField from './FormPasswordField';

const meta: Meta<typeof FormPasswordField> = {
  title: 'Forms/Fields/Password Field',
  component: FormPasswordField,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormPasswordField>;

export const Default: Story = {
  args: {
    id: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
  },
};

export const WithError: Story = {
  args: {
    id: 'password-error',
    label: 'Password',
    placeholder: 'Enter your password',
    error: 'Password is required',
  },
};

export const Disabled: Story = {
  args: {
    id: 'password-disabled',
    label: 'Password',
    placeholder: 'Enter your password',
    disabled: true,
  },
};
