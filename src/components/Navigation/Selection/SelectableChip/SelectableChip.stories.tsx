import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import SelectableChip from './SelectableChip';

const meta: Meta<typeof SelectableChip> = {
  title: 'Navigation/Selection/SelectableChip',
  component: SelectableChip,
  tags: ['autodocs'],
  args: {
    label: 'Actor/Actriz',
    selected: false,
  },
  render: (args) => {
    const [selected, setSelected] = useState(Boolean(args.selected));

    return (
      <div className="p-4">
        <SelectableChip {...args} selected={selected} onClick={() => setSelected((prev) => !prev)} />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    selected: true,
  },
};
