import type { Meta, StoryObj } from '@storybook/react-vite';
import IconViewSwitcher from './IconViewSwitcher';

const meta: Meta<typeof IconViewSwitcher> = {
  title: 'Actions/Buttons/IconViewSwitcher',
  component: IconViewSwitcher,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof IconViewSwitcher>;

export const Basic: Story = {
  args: {
    items: ['table', 'gallery'],
  },
};
