import type { Meta, StoryObj } from '@storybook/react';
import GoogleButton from './GoogleButton';

const meta: Meta<typeof GoogleButton> = {
  title: 'Components/GoogleButton',
  component: GoogleButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GoogleButton>;

export const Default: Story = {};
