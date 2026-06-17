import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../../../Actions/Buttons/Button';
import PhotoZoomOverlay from './PhotoZoomOverlay';

const makeImage = (label: string, background: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
      <rect width="800" height="1000" fill="${background}" />
      <text
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        fill="white"
        font-family="Arial, sans-serif"
        font-size="72"
      >
        ${label}
      </text>
    </svg>
  `)}`;

const images = [makeImage('Photo 1', '#2563eb'), makeImage('Photo 2', '#db2777'), makeImage('Photo 3', '#059669')];

const meta: Meta<typeof PhotoZoomOverlay> = {
  title: 'Media/Images/Photo Zoom Overlay',
  component: PhotoZoomOverlay,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    open: false,
    images,
    initialIndex: 0,
  },
  render: (args) => {
    const [open, setOpen] = useState(args.open);

    return (
      <div className="min-h-screen bg-(--color-secondary-white) p-6">
        <Button variant="primary" onClick={() => setOpen(true)}>
          Open overlay
        </Button>
        <PhotoZoomOverlay {...args} open={open} onClose={() => setOpen(false)} />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleImage: Story = {
  args: {
    images: [images[0]],
  },
};
