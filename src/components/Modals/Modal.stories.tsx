import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';
import { useState } from 'react';
import { FormInputField } from '../Form';
import { Button } from '../Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

type WrapperProps = Omit<React.ComponentProps<typeof Modal>, 'isOpen' | 'onClose'> & {
  children: React.ReactNode;
};

const Wrapper = ({ title, children, size }: WrapperProps) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <button onClick={() => setOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded">
        Abrir Modal
      </button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title={title} size={size}>
        {children}
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => (
    <Wrapper title="Título de prueba">
      <div className="flex flex-col gap-4">
        <p className="text-sm text-gray-600">
          Este es el contenido del modal con un título. Puedes probar estilos aquí.
        </p>
        <FormInputField id={'asd'} placeholder="Input..."></FormInputField>
      </div>
      <Button className="mt-4" variant="primary">
        Button
      </Button>
    </Wrapper>
  ),
};

export const SizeXL_3: Story = {
  render: () => (
    <Wrapper title="Título de prueba" size="xl_3">
      <div className="flex flex-col gap-4">
        <p className="text-sm text-gray-600">
          Este es el contenido del modal con un título. Puedes probar estilos aquí.
        </p>
        <FormInputField id={'asd'} placeholder="Input..."></FormInputField>
      </div>
      <Button className="mt-4" variant="primary">
        Button
      </Button>
    </Wrapper>
  ),
};
