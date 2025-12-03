import type { Meta, StoryObj } from '@storybook/react-vite';
import Label from './Label';

const meta: Meta<typeof Label> = {
  title: 'Form/Primitive/Label',
  component: Label,
  tags: ['autodocs'],
  args: {
    children: 'Example Label',
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {};
export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Error Label',
  },
};
export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning Label',
  },
};
