import type { Meta, StoryObj } from '@storybook/react-vite';
import Chip from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Feedback/Status/Chip',
  component: Chip,
  tags: ['autodocs'],
  args: {
    label: 'Talent',
    onRemove: () => undefined,
  },
  render: (args) => (
    <div className="flex min-h-[120px] items-center justify-center">
      <Chip {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NewItem: Story = {
  args: {
    newItem: true,
  },
};
