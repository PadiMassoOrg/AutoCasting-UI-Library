import type { Meta, StoryObj } from '@storybook/react-vite';
import StatusChip from './StatusChip';

const meta: Meta<typeof StatusChip> = {
  title: 'DataDisplay/Chips/StatusChip',
  component: StatusChip,
  tags: ['autodocs'],
  args: {
    label: 'Published',
    dotColor: '#22c55e',
  },
  render: (args) => (
    <div className="flex min-h-[120px] items-center justify-center">
      <StatusChip {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Inline: Story = {
  args: {
    variant: 'inline',
  },
};

export const Spaced: Story = {
  args: {
    align: 'spaced',
    className: 'w-[260px]',
  },
};
