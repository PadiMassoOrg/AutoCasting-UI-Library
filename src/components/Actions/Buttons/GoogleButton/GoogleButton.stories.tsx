import type { Meta, StoryObj } from '@storybook/react-vite';
import GoogleButton from './GoogleButton';

const meta: Meta<typeof GoogleButton> = {
  title: 'Actions/Buttons/Google Button',
  component: GoogleButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GoogleButton>;

export const Default: Story = {
  args: { className: 'max-w-xl', children: 'Sign in with Google' },
};
