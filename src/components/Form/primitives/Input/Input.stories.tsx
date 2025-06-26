// src/components/ui/Input.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './';

const meta: Meta<typeof Input> = {
  title: 'Form/Primitives/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    type: 'text',
    placeholder: 'Escribe algo...',
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    value: 'Texto inicial',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Contraseña',
  },
};

export const CustomStyle: Story = {
  args: {
    className: 'border-2 border-red-500',
    placeholder: 'Input rojo',
  },
};
