import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronLeft, ChevronRight, ChevronUpDown } from './index';

const meta: Meta<typeof ChevronUpDown> = {
  title: 'Navigation/Indicators/Chevron',
  component: ChevronUpDown,
  tags: ['autodocs'],
  args: {
    open: false,
  },
  render: (args) => (
    <div className="flex min-h-[120px] items-center justify-center gap-6 text-(--color-primary-black)">
      <ChevronLeft />
      <ChevronUpDown {...args} />
      <ChevronRight />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
  args: {
    open: true,
  },
};

export const Double: Story = {
  render: () => (
    <div className="flex min-h-[120px] items-center justify-center gap-6 text-(--color-primary-black)">
      <ChevronLeft double />
      <ChevronRight double />
    </div>
  ),
};
