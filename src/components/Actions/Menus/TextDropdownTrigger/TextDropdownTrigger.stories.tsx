import type { Meta, StoryObj } from '@storybook/react-vite';
import TextDropdownTrigger from './TextDropdownTrigger';

const meta: Meta<typeof TextDropdownTrigger> = {
  title: 'Actions/Menus/Text Dropdown Trigger',
  component: TextDropdownTrigger,
  tags: ['autodocs'],
  args: {
    label: 'Sort by',
    open: false,
  },
  render: (args) => (
    <div className="flex min-h-[120px] items-center justify-center">
      <TextDropdownTrigger {...args} />
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
