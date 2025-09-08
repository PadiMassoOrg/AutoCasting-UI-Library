import type { Meta, StoryObj } from '@storybook/react';
import GoogleButton from './GoogleButton';

const meta: Meta<typeof GoogleButton> = {
  title: 'Button/GoogleButton',
  component: GoogleButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GoogleButton>;

export const Default: Story = {
  args: { className: 'max-w-xl', children: 'Sign in with Google' },
};
