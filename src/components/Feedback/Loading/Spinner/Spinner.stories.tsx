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
