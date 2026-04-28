import type { Meta, StoryObj } from '@storybook/react-vite';
import TagChip from './TagChip';

const meta: Meta<typeof TagChip> = {
  title: 'DataDisplay/Chips/TagChip',
  component: TagChip,
  tags: ['autodocs'],
  args: {
    label: 'Actor',
    newItem: false,
  },
  render: (args) => (
    <div className="p-4">
      <TagChip {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
