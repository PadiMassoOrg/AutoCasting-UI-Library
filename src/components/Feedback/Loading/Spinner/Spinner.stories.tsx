import type { Meta, StoryObj } from '@storybook/react-vite';
import Spinner from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Feedback/Loading/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  render: (args) => (
    <div className="flex min-h-[120px] items-center justify-center">
      <Spinner {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Subtle: Story = {
  args: {
    className: 'h-8 w-8',
    speedMs: 2100,
    arc: 0.4,
    opacity: 0.45,
  },
};

export const Fast: Story = {
  args: {
    speedMs: 900,
    strokeWidth: 2.2,
    arc: 0.65,
    opacity: 0.8,
  },
};
