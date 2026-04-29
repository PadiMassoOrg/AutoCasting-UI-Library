import type { Meta, StoryObj } from '@storybook/react-vite';
import Skeleton from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Feedback/Loading/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Card: Story = {
  render: () => <Skeleton className="h-40 w-full" />,
};

export const Circle: Story = {
  render: () => <Skeleton variant="circle" className="h-12 w-12" />,
};

export const TextLines: Story = {
  render: () => <Skeleton variant="text" lines={4} className="max-w-md" />,
};
