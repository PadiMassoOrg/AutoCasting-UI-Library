import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Brand/Identity/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: {
    name: 'location',
    variant: 'default',
    size: 18,
    alt: 'location icon',
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {};

export const Primary: Story = {
  args: {
    name: 'location',
    variant: 'primary',
  },
};

export const Danger: Story = {
  args: {
    name: 'delete',
    variant: 'danger',
  },
};

export const Disabled: Story = {
  args: {
    name: 'search',
    variant: 'disabled',
  },
};
