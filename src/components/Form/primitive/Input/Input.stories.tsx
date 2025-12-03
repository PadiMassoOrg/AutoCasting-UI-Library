import type { Meta, StoryObj } from '@storybook/react-vite';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'Form/Primitive/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Type here...',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Password',
  },
};

export const Disabled: Story = {
  args: {
    type: 'password',
    placeholder: 'Password',
    disabled: true,
  },
};
