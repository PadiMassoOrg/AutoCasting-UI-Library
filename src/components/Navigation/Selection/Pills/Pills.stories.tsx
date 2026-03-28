import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import Pills, { type PillItem } from './Pills';

const items: PillItem[] = [
  { key: 'all', label: 'All' },
  { key: 'open', label: 'Open' },
  { key: 'shortlisted', label: 'Shortlisted' },
  { key: 'archived', label: 'Archived' },
];

const meta: Meta<typeof Pills> = {
  title: 'Navigation/Selection/Pills',
  component: Pills,
  tags: ['autodocs'],
  args: {
    items,
    value: 'all',
    className: 'w-full max-w-xl',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return (
      <div className="w-full max-w-xl p-4">
        <Pills {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
