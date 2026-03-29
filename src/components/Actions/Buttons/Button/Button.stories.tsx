import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Actions/Buttons/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Click Me',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary', className: 'max-w-xl' },
};

export const Danger: Story = {
  args: { variant: 'danger', className: 'max-w-xl' },
};

export const PrimaryOutline: Story = {
  args: { variant: 'primaryOutline', className: 'max-w-xl' },
};

export const Outline: Story = {
  args: { variant: 'outline', className: 'max-w-xl' },
};

export const Disabled: Story = {
  args: { variant: 'disabled', className: 'max-w-xl' },
};

export const CustomClassesMerged: Story = {
  args: {
    children: 'Custom Classes',
    variant: 'primary',
    className:
      'max-w-xl bg-(--color-primary-black) text-(--color-primary-white) font-normal border border-(--color-primary-black)',
  },
};
