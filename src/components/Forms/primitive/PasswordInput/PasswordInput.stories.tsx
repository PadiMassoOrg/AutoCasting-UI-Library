import type { Meta, StoryObj } from '@storybook/react-vite';
import PasswordInput from './PasswordInput';

const meta: Meta<typeof PasswordInput> = {
  title: 'Forms/Primitive/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your password',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Enter your password',
    disabled: true,
  },
};
