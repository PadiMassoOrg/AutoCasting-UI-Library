import type { Meta, StoryObj } from '@storybook/react-vite';
import InlineList from './InlineList';

const meta: Meta<typeof InlineList> = {
  title: 'Data Display/InlineList',
  component: InlineList,
  tags: ['autodocs'],
  args: {
    items: [
      { id: 1, label: 'Fashion' },
      { id: 2, label: 'Sports' },
      { id: 3, label: 'Beauty' },
    ],
    quantity: 2,
  },
};

export default meta;
type Story = StoryObj<typeof InlineList>;

export const Default: Story = {};

export const ThreeItems: Story = {
  args: {
    quantity: 3,
  },
};

export const CustomSeparator: Story = {
  args: {
    separator: '/',
    quantity: 3,
  },
};
