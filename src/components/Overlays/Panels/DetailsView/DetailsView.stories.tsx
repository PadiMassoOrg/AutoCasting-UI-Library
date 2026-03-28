import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../../../Actions/Buttons/Button';
import DetailsView from './DetailsView';
import { Icon } from '../../../Brand/Identity/Icon';

const meta: Meta<typeof DetailsView> = {
  title: 'Overlays/Panels/Details View',
  component: DetailsView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    open: true,
    headerLeft: <h2>Name</h2>,
    headerRight: <Icon name="open" variant="primary"></Icon>,
    children: (
      <div className="space-y-4">
        <section className="rounded-2xl bg-(--color-primary-white) p-4 shadow-sm">
          <h3 className="text-lg font-semibold">Profile details</h3>
          <p className="mt-2 text-sm text-(--color-secondary-grey-fonts)">
            This panel is ready for forms, summaries, or side-by-side editing flows.
          </p>
        </section>
        <section className="rounded-2xl bg-(--color-primary-white) p-4 shadow-sm">
          <h3 className="text-lg font-semibold">Additional content</h3>
          <p className="mt-2 text-sm text-(--color-secondary-grey-fonts)">
            Add any scrollable content here to preview the full details drawer behavior.
          </p>
        </section>
      </div>
    ),
  },
  render: (args) => {
    const [open, setOpen] = useState(args.open);

    return (
      <div className="min-h-screen bg-(--color-secondary-white) p-6">
        {!open && (
          <Button variant="primary" onClick={() => setOpen(true)}>
            Open details view
          </Button>
        )}
        <DetailsView {...args} open={open} onClose={() => setOpen(false)} />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
