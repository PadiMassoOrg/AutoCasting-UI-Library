import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchInput from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Forms/Search/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  args: {
    placeholder: 'Search talent, category, campaign...',
    onCommit: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Uncontrolled: Story = {};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <SearchInput {...args} value={value} onChange={setValue} onCommit={() => {}} />;
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Locked search',
  },
};
