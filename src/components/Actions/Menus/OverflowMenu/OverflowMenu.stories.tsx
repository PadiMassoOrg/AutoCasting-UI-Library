import type { Meta, StoryObj } from '@storybook/react-vite';
import OverflowMenu from './OverflowMenu';
import type { OverflowMenuItem } from './overflowmenu.types';

const items: OverflowMenuItem[] = [
  {
    key: 'edit',
    label: 'Edit',
    iconName: 'edit',
  },
  {
    key: 'share',
    label: 'Share link',
    iconName: 'copyLink',
  },
  {
    type: 'separator',
    key: 'separator',
  },
  {
    key: 'delete',
    label: 'Delete',
    iconName: 'delete',
    destructive: true,
  },
];

const meta: Meta<typeof OverflowMenu> = {
  title: 'Actions/Menus/Overflow Menu',
  component: OverflowMenu,
  tags: ['autodocs'],
  args: {
    items,
    triggerClassName: 'rounded-full border border-(--color-secondary-outline) bg-(--color-primary-white) p-2',
  },
  render: (args) => (
    <div className="flex min-h-[180px] items-start justify-center p-10">
      <OverflowMenu {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TopAlignedStart: Story = {
  args: {
    align: 'start',
    side: 'top',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
