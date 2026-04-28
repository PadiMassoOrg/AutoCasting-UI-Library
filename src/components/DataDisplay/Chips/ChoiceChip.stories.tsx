import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import ChoiceChip from './ChoiceChip';

const meta: Meta<typeof ChoiceChip> = {
  title: 'DataDisplay/Chips/ChoiceChip',
  component: ChoiceChip,
  tags: ['autodocs'],
  args: {
    label: 'Actor/Actriz',
    selected: false,
  },
  render: (args) => {
    const [selected, setSelected] = useState(Boolean(args.selected));

    return (
      <div className="p-4">
        <ChoiceChip {...args} selected={selected} onClick={() => setSelected((prev) => !prev)} />
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
