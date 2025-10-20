import type { Meta, StoryObj } from '@storybook/react-vite';
import Logo from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  tags: ['autodocs'],
  args: {
    text: 'Logo Text',
    imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg', // Ejemplo
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {},
};

export const Horizontal: Story = {
  args: {
    horizontal: true,
  },
};

export const WithoutImage: Story = {
  args: {
    imageSrc: undefined,
  },
};

export const CustomImageSize: Story = {
  args: {
    imageSize: 80,
  },
};
