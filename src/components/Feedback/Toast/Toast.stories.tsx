import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../Actions/Buttons/Button';
import Toast from './Toast';
import { ToastProvider, showToast } from './ToastProvider';

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
  args: {
    type: 'default',
    title: 'Action completed',
    description: 'This is the base toast component rendered with the library styles.',
  },
  render: (args) => (
    <div className="flex min-h-[220px] items-start justify-center bg-(--color-secondary-white) p-6">
      <div className="w-full max-w-sm">
        <Toast {...args} />
      </div>
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex min-h-[420px] items-start justify-center bg-(--color-secondary-white) p-6">
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Toast title="Default toast" description="Useful for a generic confirmation message." type="default" />
        <Toast title="Success toast" description="Useful after a completed action." type="success" />
        <Toast title="Warning toast" description="Warns before the user misses something important." type="warning" />
        <Toast title="Danger toast" description="Use it for API failures or invalid states." type="danger" />
      </div>
    </div>
  ),
};

function ProviderDemo() {
  return (
    <ToastProvider>
      <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 bg-(--color-secondary-white) p-6">
        <Button
          variant="primary"
          onClick={() =>
            showToast({
              type: 'default',
              position: 'bottom-right',
              title: 'Saved correctly',
              description: 'This simulates a toast from an imperative action.',
            })
          }
        >
          Show bottom-right toast
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            showToast({
              type: 'warning',
              position: 'bottom-right',
              title: 'Saved correctly',
              description: 'This simulates a toast from an imperative action.',
            })
          }
        >
          Show bottom-right toast
        </Button>
        <Button
          variant="primaryOutline"
          onClick={() =>
            showToast({
              type: 'success',
              position: 'bottom-right',
              title: 'Saved correctly',
              description: 'This simulates a toast from an imperative action.',
            })
          }
        >
          Show bottom-right toast
        </Button>
        <Button
          variant="danger"
          onClick={() =>
            showToast({
              type: 'danger',
              position: 'bottom-right',
              title: 'Request failed',
              description: 'This can be triggered from a TanStack Query onError callback.',
            })
          }
        >
          Show bottom-right toast
        </Button>
      </div>
    </ToastProvider>
  );
}

export const WithProvider: Story = {
  render: () => <ProviderDemo />,
};
