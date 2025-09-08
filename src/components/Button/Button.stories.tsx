import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Button/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Click Me',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary', className: 'max-w-xl' },
};

export const Outline: Story = {
  args: { variant: 'outline', className: 'max-w-xl' },
};

export const Disabled: Story = {
  args: { variant: 'disabled', className: 'max-w-xl' },
};
