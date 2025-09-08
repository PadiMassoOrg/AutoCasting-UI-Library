import type { Meta, StoryObj } from '@storybook/react';
import Separator from './Separator';

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  tags: ['autodocs'],
  args: {
    className: 'opacity-20 my-10',
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Clases CSS/Tailwind para estilizar el <hr>',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const OpacityAndMargin: Story = {
  render: (args) => (
    <div className="max-w-xl">
      <Separator {...args} />
    </div>
  ),
};
